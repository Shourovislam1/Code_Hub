import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Course } from '../types';
import { successResponse, errorResponse, slugify } from '../utils/helpers';

const db = admin.firestore();

export const getAllCourses = functions.https.onCall(async (data, context) => {
  try {
    const { category, difficulty, limit = 20 } = data;

    let query = db.collection('courses').where('isPublished', '==', true);

    if (category) {
      query = query.where('category', '==', category);
    }

    if (difficulty) {
      query = query.where('difficulty', '==', difficulty);
    }

    const snapshot = await query.limit(limit).get();

    const courses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return successResponse(courses, 'Courses retrieved successfully');
  } catch (error) {
    console.error('Error getting courses:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const getCourseById = functions.https.onCall(async (data, context) => {
  try {
    const { courseId } = data;

    if (!courseId) {
      throw new functions.https.HttpsError('invalid-argument', 'Course ID is required');
    }

    const courseDoc = await db.collection('courses').doc(courseId).get();

    if (!courseDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Course not found');
    }

    return successResponse(
      { id: courseDoc.id, ...courseDoc.data() },
      'Course retrieved successfully'
    );
  } catch (error) {
    console.error('Error updating course:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const createCourse = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const {
      title,
      description,
      category,
      difficulty,
      duration,
      instructor,
      price,
      tags,
      requirements,
      learningObjectives,
    } = data;

    if (!title || !description || !category || !difficulty) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
    }

    const courseRef = db.collection('courses').doc();
    const courseId = courseRef.id;

    const courseData: Partial<Course> = {
      id: courseId,
      title,
      description,
      category,
      difficulty,
      duration,
      instructor,
      instructorId: context.auth.uid,
      price: price || 0,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: tags || [],
      requirements: requirements || [],
      learningObjectives: learningObjectives || [],
    };

    await courseRef.set(courseData);

    return successResponse(
      { id: courseId, ...courseData },
      'Course created successfully'
    );
  } catch (error) {
    console.error('Error creating course:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const updateCourse = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { courseId, ...updateData } = data;

    if (!courseId) {
      throw new functions.https.HttpsError('invalid-argument', 'Course ID is required');
    }

    const courseRef = db.collection('courses').doc(courseId);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Course not found');
    }

    const course = courseDoc.data() as Course;

    if (course.instructorId !== context.auth.uid) {
      throw new functions.https.HttpsError('permission-denied', 'You can only update your own courses');
    }

    updateData.updatedAt = new Date();

    await courseRef.update(updateData);

    const updatedDoc = await courseRef.get();
    return successResponse(updatedDoc.data(), 'Course updated successfully');
  } catch (error) {
    console.error('Error updating course:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const deleteCourse = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { courseId } = data;

    if (!courseId) {
      throw new functions.https.HttpsError('invalid-argument', 'Course ID is required');
    }

    const courseRef = db.collection('courses').doc(courseId);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Course not found');
    }

    const course = courseDoc.data() as Course;

    if (course.instructorId !== context.auth.uid) {
      throw new functions.https.HttpsError('permission-denied', 'You can only delete your own courses');
    }

    await courseRef.delete();

    return successResponse(null, 'Course deleted successfully');
  } catch (error) {
    console.error('Error updating course:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});