import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { User } from '../types';
import { successResponse, errorResponse, validateEmail } from '../utils/helpers';

const db = admin.firestore();

export const registerUser = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { email, displayName, firstName, lastName, phone } = data;

    if (!email || !validateEmail(email)) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid email');
    }

    const userId = context.auth.uid;

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return successResponse(userDoc.data(), 'User already exists');
    }

    const userData: Partial<User> = {
      id: userId,
      email,
      displayName: displayName || `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      phone,
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    await userRef.set(userData);

    return successResponse(userData, 'User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

export const getUserProfile = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const userId = context.auth.uid;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }

    return successResponse(userDoc.data(), 'User profile retrieved');
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

export const updateUserProfile = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const userId = context.auth.uid;
    const { displayName, firstName, lastName, phone, photoURL } = data;

    const userRef = db.collection('users').doc(userId);
    const updateData: Partial<User> = {
      updatedAt: new Date(),
    };

    if (displayName) updateData.displayName = displayName;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (photoURL) updateData.photoURL = photoURL;

    await userRef.update(updateData);

    const updatedDoc = await userRef.get();
    return successResponse(updatedDoc.data(), 'Profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    const userRef = db.collection('users').doc(user.uid);

    const userData: Partial<User> = {
      id: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    await userRef.set(userData);

    console.log(`User created: ${user.uid}`);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
});

export const onUserDeleted = functions.auth.user().onDelete(async (user) => {
  try {
    const userRef = db.collection('users').doc(user.uid);
    await userRef.delete();

    console.log(`User deleted: ${user.uid}`);
  } catch (error) {
    console.error('Error deleting user document:', error);
  }
});