# CODE HUB Backend Setup Guide

Complete backend setup for CODE HUB EdTech Platform using Firebase Functions.

## 📋 Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created
- Basic knowledge of TypeScript

## 🚀 Quick Setup

### 1. Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Navigate to Backend Folder

```bash
cd backend
```

### 4. Initialize Firebase

```bash
firebase init functions
```

When prompted:
- Select your existing Firebase project
- Choose TypeScript as language
- Use default settings for other options

### 5. Install Dependencies

```bash
cd functions
npm install
```

### 6. Create Service Account

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file as `functions/service-account.json`
4. **IMPORTANT**: Never commit this file to git!

### 7. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Firebase project details:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=your-private-key
```

## 🏗️ Project Structure

```
backend/
├── functions/
│   ├── src/
│   │   ├── auth/              # Authentication functions
│   │   ├── courses/           # Course management
│   │   ├── enrollments/       # Enrollment system
│   │   ├── contact/           # Contact forms
│   │   ├── blog/              # Blog system
│   │   ├── projects/          # Project showcase
│   │   ├── ai-lab/            # AI tools management
│   │   ├── middleware/        # Auth middleware
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Helper functions
│   │   └── index.ts           # Main entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── firebase.json
└── README.md
```

## 🔧 Development

### Run Firebase Emulators (Local Development)

```bash
cd functions
npm run serve
```

This will start:
- Functions emulator on port 5001
- Firestore emulator on port 8080
- Auth emulator on port 9099

### Build TypeScript

```bash
npm run build
```

### Watch Mode (Auto-rebuild on changes)

```bash
npm run build:watch
```

### Test Functions Locally

```bash
npm run shell
```

## 🚢 Deployment

### Deploy All Functions

```bash
cd functions
npm run deploy
```

### Deploy Specific Function

```bash
firebase deploy --only functions:enrollInCourse
```

### View Function Logs

```bash
npm run logs
```

## 📡 Available Functions

### Authentication
- `registerUser` - Register new user profile
- `getUserProfile` - Get user profile
- `updateUserProfile` - Update user profile
- `onUserCreated` - Trigger on user creation
- `onUserDeleted` - Trigger on user deletion

### Courses
- `getAllCourses` - Get all courses (with filters)
- `getCourseById` - Get single course
- `createCourse` - Create new course
- `updateCourse` - Update course
- `deleteCourse` - Delete course

### Enrollments
- `enrollInCourse` - Enroll in a course
- `getUserEnrollments` - Get user's enrollments
- `updateEnrollmentProgress` - Update enrollment progress
- `unenrollFromCourse` - Unenroll from course

### Contact Forms
- `submitContactForm` - Submit contact form
- `getContactForms` - Get all contact forms
- `updateContactFormStatus` - Update form status

### Blog
- `getAllBlogPosts` - Get all published posts
- `getBlogPostBySlug` - Get post by slug
- `createBlogPost` - Create new post
- `updateBlogPost` - Update post
- `deleteBlogPost` - Delete post
- `publishBlogPost` - Publish post

### Projects
- `getAllProjects` - Get all projects
- `getFeaturedProjects` - Get featured projects
- `getProjectById` - Get single project
- `createProject` - Create new project
- `updateProject` - Update project
- `deleteProject` - Delete project

### AI Lab
- `getAllAITools` - Get all AI tools
- `getAIToolById` - Get single AI tool
- `createAITool` - Create new AI tool
- `updateAITool` - Update AI tool
- `deleteAITool` - Delete AI tool

## 🔐 Security

### Authentication Required
Most functions require user authentication. The user must be logged in via Firebase Auth.

### Role-Based Access
- **Student**: Can enroll in courses, view content
- **Instructor**: Can create/update courses
- **Admin**: Full access to all features

### Input Validation
All functions validate input data before processing.

## 📊 Database Structure

### Collections

**users**
```typescript
{
  id: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  photoURL?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

**courses**
```typescript
{
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  instructorId: string;
  thumbnail?: string;
  price: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  requirements: string[];
  learningObjectives: string[];
}
```

**enrollments**
```typescript
{
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
  completedAt?: Date;
  status: 'active' | 'completed' | 'dropped';
  lastAccessedAt: Date;
}
```

## 🔗 Frontend Integration

### Install Firebase SDK

```bash
npm install firebase
```

### Initialize Firebase in Frontend

```typescript
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Call a function
const enrollInCourse = httpsCallable(functions, 'enrollInCourse');
const result = await enrollInCourse({ courseId: 'course-123' });
```

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Firebase Emulator Issues
```bash
# Stop all emulators
firebase emulators:stop

# Clear emulator data
firebase emulators:start --only functions --clear
```

### Deployment Errors
```bash
# Check Firebase CLI version
firebase --version

# Update Firebase CLI
npm install -g firebase-tools@latest
```

## 📝 Environment Variables

Create `.env` file in `functions/` folder:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
NODE_ENV=development
```

## 🎯 Next Steps

1. ✅ Complete Firebase setup
2. ✅ Install dependencies
3. ✅ Configure environment
4. ✅ Test with emulators
5. ✅ Deploy to Firebase
6. ✅ Integrate with frontend

## 📚 Additional Resources

- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

## 💡 Tips

- Use emulators for local development
- Test functions before deploying
- Monitor function logs regularly
- Keep dependencies updated
- Use TypeScript for type safety

## 🆘 Support

If you encounter issues:
1. Check Firebase Console logs
2. Review function logs: `npm run logs`
3. Check Firebase status: [status.firebase.google.com](https://status.firebase.google.com)

---

**Happy Coding! 🚀**