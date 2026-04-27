import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Project } from '../types';
import { successResponse, errorResponse } from '../utils/helpers';

const db = admin.firestore();

export const getAllProjects = functions.https.onCall(async (data, context) => {
  try {
    const { category, type, limit = 20 } = data;

    let query = db.collection('projects');

    if (category) {
      query = query.where('category', '==', category) as any;
    }

    if (type) {
      query = query.where('type', '==', type) as any;
    }

    const snapshot = await query.orderBy('createdAt', 'desc').limit(limit).get();

    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return successResponse(projects, 'Projects retrieved successfully');
  } catch (error) {
    console.error('Error getting projects:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const getFeaturedProjects = functions.https.onCall(async (data, context) => {
  try {
    const { limit = 3 } = data;

    const snapshot = await db
      .collection('projects')
      .where('isFeatured', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return successResponse(projects, 'Featured projects retrieved successfully');
  } catch (error) {
    console.error('Error getting featured projects:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const getProjectById = functions.https.onCall(async (data, context) => {
  try {
    const { projectId } = data;

    if (!projectId) {
      throw new functions.https.HttpsError('invalid-argument', 'Project ID is required');
    }

    const projectDoc = await db.collection('projects').doc(projectId).get();

    if (!projectDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Project not found');
    }

    return successResponse(
      { id: projectDoc.id, ...projectDoc.data() },
      'Project retrieved successfully'
    );
  } catch (error) {
    console.error('Error getting project:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const createProject = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const {
      title,
      description,
      category,
      difficulty,
      techStack,
      type,
      githubUrl,
      liveUrl,
    } = data;

    if (!title || !description || !category || !difficulty) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
    }

    const projectRef = db.collection('projects').doc();
    const projectId = projectRef.id;

    const projectData: Partial<Project> = {
      id: projectId,
      title,
      description,
      category,
      difficulty,
      techStack: techStack || [],
      type: type || 'Open Source',
      githubUrl,
      liveUrl,
      authorId: context.auth.uid,
      authorName: context.auth.token.name || 'Anonymous',
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await projectRef.set(projectData);

    return successResponse(
      { id: projectId, ...projectData },
      'Project created successfully'
    );
  } catch (error) {
    console.error('Error creating project:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const updateProject = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { projectId, ...updateData } = data;

    if (!projectId) {
      throw new functions.https.HttpsError('invalid-argument', 'Project ID is required');
    }

    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Project not found');
    }

    const project = projectDoc.data() as Project;

    if (project.authorId !== context.auth.uid) {
      throw new functions.https.HttpsError('permission-denied', 'You can only update your own projects');
    }

    updateData.updatedAt = new Date();

    await projectRef.update(updateData);

    const updatedDoc = await projectRef.get();
    return successResponse(updatedDoc.data(), 'Project updated successfully');
  } catch (error) {
    console.error('Error updating project:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});

export const deleteProject = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { projectId } = data;

    if (!projectId) {
      throw new functions.https.HttpsError('invalid-argument', 'Project ID is required');
    }

    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Project not found');
    }

    const project = projectDoc.data() as Project;

    if (project.authorId !== context.auth.uid) {
      throw new functions.https.HttpsError('permission-denied', 'You can only delete your own projects');
    }

    await projectRef.delete();

    return successResponse(null, 'Project deleted successfully');
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new functions.https.HttpsError('internal', (error as Error).message);
  }
});