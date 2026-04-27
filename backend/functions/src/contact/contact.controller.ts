import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ContactForm } from '../types';
import { successResponse, errorResponse, validateEmail } from '../utils/helpers';

const db = admin.firestore();

export const submitContactForm = functions.https.onCall(async (data, context) => {
  try {
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      throw new functions.https.HttpsError('invalid-argument', 'All fields are required');
    }

    if (!validateEmail(email)) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid email format');
    }

    if (message.length < 10) {
      throw new functions.https.HttpsError('invalid-argument', 'Message must be at least 10 characters');
    }

    const contactRef = db.collection('contactForms').doc();
    const contactId = contactRef.id;

    const contactData: Partial<ContactForm> = {
      id: contactId,
      name,
      email,
      subject,
      message,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await contactRef.set(contactData);

    return successResponse(
      { id: contactId, ...contactData },
      'Contact form submitted successfully'
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const getContactForms = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { status, limit = 50 } = data;

    let query = db.collection('contactForms');

    if (status) {
      query = query.where('status', '==', status) as any;
    }

    const snapshot = await db
      .collection('contactForms')
      .where('status', '==', status)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const forms = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return successResponse(forms, 'Contact forms retrieved successfully');
  } catch (error) {
    console.error('Error getting contact forms:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const updateContactFormStatus = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { formId, status } = data;

    if (!formId || !status) {
      throw new functions.https.HttpsError('invalid-argument', 'Form ID and status are required');
    }

    const validStatuses = ['pending', 'in_progress', 'resolved'];

    if (!validStatuses.includes(status)) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid status');
    }

    const contactRef = db.collection('contactForms').doc(formId);
    const contactDoc = await contactRef.get();

    if (!contactDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Contact form not found');
    }

    await contactRef.update({
      status,
      updatedAt: new Date(),
    });

    const updatedDoc = await contactRef.get();
    return successResponse(updatedDoc.data(), 'Status updated successfully');
  } catch (error) {
    console.error('Error updating contact form status:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});