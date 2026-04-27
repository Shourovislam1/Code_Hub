# Express API Routes

This document describes the Express API structure for CODE HUB backend.

## Base URL

```
https://your-project-id.cloudfunctions.net/api
```

## Available Endpoints

### Health & Info

#### `GET /`
Health check endpoint

**Response:**
```json
{
  "status": "success",
  "message": "Backend is working 🚀",
  "timestamp": "2024-04-28T02:32:21.000Z",
  "version": "1.0.0"
}
```

#### `GET /health`
Detailed health check

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-04-28T02:32:21.000Z",
  "uptime": 123.456
}
```

#### `GET /api`
API information and available endpoints

**Response:**
```json
{
  "name": "CODE HUB API",
  "version": "1.0.0",
  "description": "Backend API for CODE HUB EdTech Platform",
  "endpoints": {
    "auth": "/api/auth/*",
    "courses": "/api/courses/*",
    "enrollments": "/api/enrollments/*",
    "contact": "/api/contact/*",
    "blog": "/api/blog/*",
    "projects": "/api/projects/*",
    "aiLab": "/api/ai-lab/*"
  }
}
```

## Planned API Routes

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Courses (`/api/courses`)
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create new course (instructor)
- `PUT /api/courses/:id` - Update course (instructor)
- `DELETE /api/courses/:id` - Delete course (instructor)

### Enrollments (`/api/enrollments`)
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - Get user enrollments
- `PUT /api/enrollments/:id` - Update progress
- `DELETE /api/enrollments/:id` - Unenroll from course

### Contact (`/api/contact`)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all forms (admin)
- `PUT /api/contact/:id` - Update form status (admin)

### Blog (`/api/blog`)
- `GET /api/blog` - Get all posts
- `GET /api/blog/:slug` - Get post by slug
- `POST /api/blog` - Create new post
- `PUT /api/blog/:id` - Update post
- `DELETE /api/blog/:id` - Delete post
- `POST /api/blog/:id/publish` - Publish post

### Projects (`/api/projects`)
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### AI Lab (`/api/ai-lab`)
- `GET /api/ai-lab` - Get all AI tools
- `GET /api/ai-lab/:id` - Get single AI tool
- `POST /api/ai-lab` - Create new AI tool
- `PUT /api/ai-lab/:id` - Update AI tool
- `DELETE /api/ai-lab/:id` - Delete AI tool

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details (development only)"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## CORS

All endpoints support CORS with `origin: true` for development.

## Authentication

Most endpoints require Firebase Authentication. Include the Firebase ID token in the `Authorization` header:

```
Authorization: Bearer <firebase-id-token>
```

## Rate Limiting

Rate limiting will be implemented for production use.

## Testing

### Local Testing

```bash
# Start Firebase emulators
npm run serve

# Test endpoints
curl http://localhost:5001/your-project-id/us-central1/api
```

### Production Testing

```bash
# Test deployed function
curl https://your-project-id.cloudfunctions.net/api
```

## Next Steps

1. Implement route handlers for each endpoint
2. Add authentication middleware
3. Add input validation
4. Add rate limiting
5. Add logging
6. Add monitoring