# Todo Frontend - Phase II

This is the frontend implementation for the Todo application, built with Next.js 14 and Better Auth for Phase II.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Authentication**: [Better Auth](https://www.better-auth.com/) - Authentication solution
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **UI Components**: Custom-built with Tailwind CSS

## Features

- **Authentication**: Complete login and registration system with Better Auth
- **Task Management**: Full CRUD operations for tasks
- **Responsive UI**: Mobile-first design that works on all devices
- **Protected Routes**: Authentication-enforced navigation
- **Real-time Updates**: Instant UI feedback for task operations
- **Filtering**: Filter tasks by completion status
- **Form Validation**: Client-side validation with user feedback

## Setup

1. Clone the repository
2. Navigate to the frontend directory: `cd hackathon-todo/frontend`
3. Install dependencies: `npm install`
4. Set up environment variables (see below)
5. Start the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3001
```

## Pages

- `/` - Main dashboard with task management
- `/login` - User login page
- `/register` - User registration page

## Components

### Authentication Components
- `AuthProvider` - Wraps the app with Better Auth context
- `ProtectedRoute` - Ensures authentication before rendering content
- Login and registration forms with validation

### Task Management Components
- `TaskDashboard` - Main dashboard with filtering and task list
- `TaskForm` - Form for creating new tasks with validation
- `TaskList` - Container for displaying multiple tasks
- `TaskItem` - Individual task component with edit/delete functionality

### UI Components
- `Button` - Custom styled buttons
- `Card` - Container for grouping related content
- `Input` - Form input fields
- `Label` - Form labels

## API Integration

The frontend includes a custom API client in `lib/api.ts` that:
- Automatically attaches JWT tokens to requests
- Handles all required endpoints for task management
- Implements proper error handling
- Provides loading states during API operations

## Authentication Flow

1. User accesses the application
2. Session is checked using Better Auth hooks
3. Unauthenticated users are redirected to login
4. JWT tokens are automatically included in API requests
5. Session validation occurs on each protected route

## Development

To run the application in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To build the application for production:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## Folder Structure

```
frontend/
├── app/                    # Next.js App Router pages
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   ├── tasks/             # Task management components
│   └── ui/                # Basic UI components
├── lib/                   # Utilities and configuration
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── styles/                # Additional styles
```

## Deployment

For deployment:
1. Build the application with `npm run build`
2. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)
3. Set up environment variables in your deployment environment
4. Ensure backend API is accessible from the deployed frontend# todo_web
