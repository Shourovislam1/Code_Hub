import * as functions from 'firebase-functions';

export const authenticateUser = async (context: functions.https.CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  return context.auth;
};

export const validateAdmin = async (context: functions.https.CallableContext) => {
  const auth = await authenticateUser(context);

  const admin = require('firebase-admin');
  const db = admin.firestore();

  const userDoc = await db.collection('users').doc(auth.uid).get();

  if (!userDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'User not found');
  }

  const user = userDoc.data();

  if (user.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required');
  }

  return auth;
};

export const validateInstructor = async (context: functions.https.CallableContext) => {
  const auth = await authenticateUser(context);

  const admin = require('firebase-admin');
  const db = admin.firestore();

  const userDoc = await db.collection('users').doc(auth.uid).get();

  if (!userDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'User not found');
  }

  const user = userDoc.data();

  if (user.role !== 'admin' && user.role !== 'instructor') {
    throw new functions.https.HttpsError('permission-denied', 'Instructor access required');
  }

  return auth;
};