import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AITool } from '../types';
import { successResponse, errorResponse } from '../utils/helpers';

const db = admin.firestore();

export const getAllAITools = functions.https.onCall(async (data, context) => {
  try {
    const { category, limit = 20 } = data;

    let query = db.collection('aiTools').where('isActive', '==', true);

    if (category) {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.orderBy('createdAt', 'desc').limit(limit).get();

    const tools = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return successResponse(tools, 'AI tools retrieved successfully');
  } catch (error) {
    console.error('Error getting AI tools:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const getAIToolById = functions.https.onCall(async (data, context) => {
  try {
    const { toolId } = data;

    if (!toolId) {
      throw new functions.https.HttpsError('invalid-argument', 'Tool ID is required');
    }

    const toolDoc = await db.collection('aiTools').doc(toolId).get();

    if (!toolDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'AI tool not found');
    }

    return successResponse(
      { id: toolDoc.id, ...toolDoc.data() },
      'AI tool retrieved successfully'
    );
  } catch (error) {
    console.error('Error getting AI tool:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const createAITool = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const {
      name,
      description,
      useCase,
      icon,
      gradient,
      details,
      features,
      pricing,
      category,
    } = data;

    if (!name || !description || !useCase) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
    }

    const toolRef = db.collection('aiTools').doc();
    const toolId = toolRef.id;

    const toolData: Partial<AITool> = {
      id: toolId,
      name,
      description,
      useCase,
      icon: icon || '🤖',
      gradient: gradient || 'linear-gradient(135deg, #7B2FFF, #FF3D71)',
      details: details || description,
      features: features || [],
      pricing: pricing || 'Free',
      category: category || 'General',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await toolRef.set(toolData);

    return successResponse(
      { id: toolId, ...toolData },
      'AI tool created successfully'
    );
  } catch (error) {
    console.error('Error creating AI tool:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const updateAITool = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { toolId, ...updateData } = data;

    if (!toolId) {
      throw new functions.https.HttpsError('invalid-argument', 'Tool ID is required');
    }

    const toolRef = db.collection('aiTools').doc(toolId);
    const toolDoc = await toolRef.get();

    if (!toolDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'AI tool not found');
    }

    updateData.updatedAt = new Date();

    await toolRef.update(updateData);

    const updatedDoc = await toolRef.get();
    return successResponse(updatedDoc.data(), 'AI tool updated successfully');
  } catch (error) {
    console.error('Error deleting AI tool:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const deleteAITool = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { toolId } = data;

    if (!toolId) {
      throw new functions.https.HttpsError('invalid-argument', 'Tool ID is required');
    }

    const toolRef = db.collection('aiTools').doc(toolId);
    const toolDoc = await toolRef.get();

    if (!toolDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'AI tool not found');
    }

    await toolRef.delete();

    return successResponse(null, 'AI tool deleted successfully');
  } catch (error) {
    console.error('Error deleting AI tool:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});