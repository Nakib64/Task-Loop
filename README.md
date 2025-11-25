# TaskLoop - Personal Productivity & Learning Platform

TaskLoop is a comprehensive productivity and learning management platform built with Next.js, Prisma, and PostgreSQL. It combines task management, habit tracking, goal setting, and a full-featured course learning system with video lessons.

## 🚀 Features

### 📚 Course Learning System
- **Video-based Lessons**: Watch video content for each lesson
- **Progressive Unlocking**: Complete lessons sequentially to unlock new content
- **Progress Tracking**: Track your completion status across all courses
- **Course Enrollment**: Browse and enroll in courses
- **Comments System**: Engage with course content through comments

### ✅ Task Management
- Create, update, and track tasks
- Set priorities and due dates
- Mark tasks as complete

### 🎯 Goal Setting
- Set and track personal goals
- Create milestones for goals
- Monitor progress towards achievements

### 📅 Calendar Events
- Schedule and manage events
- View events in calendar format
- Set event start and end times

### 🔄 Habit Tracking
- Build and maintain habits
- Log daily habit completions
- Track streaks and consistency

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI + Custom Components
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Validation**: React Hook Form + Zod
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- PostgreSQL database
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd taskloop
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/taskloop"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

**Generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Database Setup

#### Generate Prisma Client
```bash
npx prisma generate
```

#### Run Database Migrations
```bash
npx prisma db push
```

#### Seed the Database with Sample Courses
```bash
npx prisma db seed
```

This will create:
- 8 preset courses with video lessons
- Sections and lessons for each course
- A demo instructor account (if no users exist)

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
taskloop/
├── prisma/
│   ├── schema/              # Prisma schema files (modular)
│   │   ├── base.prisma      # User and auth models
│   │   ├── courses.prisma   # Course system models
│   │   ├── learning.prisma  # Learning-related models
│   │   ├── productivity.prisma # Tasks, goals, habits
│   │   ├── social.prisma    # Social features
│   │   └── notifications.prisma
│   └── seed.ts              # Database seeding script
├── src/
│   ├── app/
│   │   ├── api/             # API routes
│   │   │   ├── courses/     # Course-related APIs
│   │   │   ├── tasks/       # Task management APIs
│   │   │   ├── goals/       # Goal tracking APIs
│   │   │   └── habits/      # Habit tracking APIs
│   │   ├── dashboard/       # Dashboard pages
│   │   │   ├── courses/     # Course pages
│   │   │   ├── tasks/       # Task pages
│   │   │   ├── goals/       # Goal pages
│   │   │   └── habits/      # Habit pages
│   │   ├── login/           # Authentication pages
│   │   └── register/
│   ├── components/
│   │   ├── dashboard/       # Dashboard components
│   │   │   ├── courses/     # Course components
│   │   │   │   ├── VideoPlayer.tsx
│   │   │   │   └── ModuleList.tsx
│   │   │   └── calendar/
│   │   └── ui/              # Reusable UI components
│   └── lib/
│       ├── auth.config.ts   # NextAuth configuration
│       └── prisma.ts        # Prisma client instance
└── public/                  # Static assets
```

## 🎓 Using the Course System

### For Students:

1. **Browse Courses**: Navigate to `/dashboard/courses/browse`
2. **Enroll in a Course**: Click "Enroll for Free" on any course
3. **Watch Lessons**: Access video lessons in sequential order
4. **Track Progress**: Complete lessons to unlock the next one
5. **View Progress**: See your completion percentage

### Course Features:

- **Sequential Learning**: First lesson is unlocked by default
- **Progressive Unlocking**: Complete a lesson to unlock the next
- **Video Player**: Built-in video player with controls
- **Lesson Content**: Rich text content alongside videos
- **Module Sidebar**: Navigate between unlocked lessons
- **Progress Tracking**: Visual indicators for completed lessons

## 🔐 Authentication

The app uses NextAuth.js with credentials provider:

- **Register**: Create a new account at `/register`
- **Login**: Sign in at `/login`
- **Session Management**: Automatic session handling

## 📊 Database Schema

The database is organized into modular schemas:

- **Users & Auth**: User accounts and authentication
- **Courses**: Course, Section, Lesson models
- **Enrollments**: User course enrollments and progress
- **Tasks**: Task management
- **Goals**: Goal tracking with milestones
- **Habits**: Habit tracking and logs
- **Calendar**: Events and scheduling

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Check database credentials

### Prisma Client Errors
```bash
npx prisma generate
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db seed` - Seed database with sample data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database with [Prisma](https://www.prisma.io/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Note**: This is a learning and productivity platform. The sample courses include demo video content from open-source resources.
