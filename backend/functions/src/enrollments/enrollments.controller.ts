import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Enrollment } from '../types';
import { successResponse, errorResponse } from '../utils/helpers';

const db = admin.firestore();

export const enrollInCourse = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { courseId } = data;

    if (!courseId) {
      throw new functions.https.HttpsError('invalid-argument', 'Course ID is required');
    }

    const userId = context.auth.uid;

    const courseDoc = await db.collection('courses').doc(courseId).get();

    if (!courseDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Course not found');
    }

    const course = courseDoc.data();
    if (!course) {
      throw new functions.https.HttpsError('not-found', 'Course not found');
    }

    if (!course.isPublished) {
      throw new functions.https.HttpsError('failed-precondition', 'Course is not published');
    }

    const existingEnrollment = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .get();

    if (!existingEnrollment.empty) {
      throw new functions.https.HttpsError('already-exists', 'Already enrolled in this course');
    }

    const enrollmentRef = db.collection('enrollments').doc();
    const enrollmentId = enrollmentRef.id;

    const enrollmentData: Partial<Enrollment> = {
      id: enrollmentId,
      userId,
      courseId,
      enrolledAt: new Date(),
      progress: 0,
      status: 'active',
      lastAccessedAt: new Date(),
    };

    await enrollmentRef.set(enrollmentData);

    return successResponse(
      { id: enrollmentId, ...enrollmentData },
      'Enrolled successfully'
    );
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const getUserEnrollments = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const userId = context.auth.uid;

    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .get();

    const enrollments = [];

    for (const doc of enrollmentsSnapshot.docs) {
      const enrollment = doc.data();
      const courseDoc = await db.collection('courses').doc(enrollment.courseId).get();

      if (courseDoc.exists) {
        enrollments.push({
          id: doc.id,
          ...enrollment,
          course: {
            id: courseDoc.id,
            ...courseDoc.data(),
          },
        });
      }
    }

    return successResponse(enrollments, 'Enrollments retrieved successfully');
  } catch (error) {
    console.error('Error getting enrollments:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const updateEnrollmentProgress = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { enrollmentId, progress } = data;

    if (!enrollmentId || progress === undefined) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
    }

    const userId = context.auth.uid;

    const enrollmentRef = db.collection('enrollments').doc(enrollmentId);
    const enrollmentDoc = await enrollmentRef.get();

    if (!enrollmentDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Enrollment not found');
    }

    const enrollment = enrollmentDoc.data();

    if (!enrollment || enrollment.userId !== userId) {
      throw new functions.https.HttpsError('permission-denied', 'You can only update your own enrollments');
    }

    const updateData: Partial<Enrollment> = {
      progress,
      lastAccessedAt: new Date(),
    };

    if (progress >= 100) {
      updateData.status = 'completed';
      updateData.completedAt = new Date();
    }

    await enrollmentRef.update(updateData);

    const updatedDoc = await enrollmentRef.get();
    return successResponse(updatedDoc.data(), 'Progress updated successfully');
  } catch (error) {
    console.error('Error updating enrollment progress:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const unenrollFromCourse = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { enrollmentId } = data;

    if (!enrollmentId) {
      throw new functions.https.HttpsError('invalid-argument', 'Enrollment ID is required');
    }

    const userId = context.auth.uid;

    const enrollmentRef = db.collection('enrollments').doc(enrollmentId);
    const enrollmentDoc = await enrollmentRef.get();

    if (!enrollmentDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Enrollment not found');
    }

    const enrollment = enrollmentDoc.data();

    if (!enrollment || enrollment.userId !== userId) {
      throw new functions.https.HttpsError('permission-denied', 'You can only unenroll from your own courses');
    }

    await enrollmentRef.delete();

    return successResponse(null, 'Unenrolled successfully');
  } catch (error) {
    console.error('Error unenrolling from course:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});