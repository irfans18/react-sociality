# Sociality

A modern, full-featured social media web application built with React 19, TypeScript, and Tailwind CSS. Sociality provides a beautiful, responsive interface for sharing posts, following users, and engaging with content through likes, comments, and saves.

## 🚀 Features

### Core Features
- **User Authentication** - Secure registration and login with JWT tokens
- **Feed Timeline** - Personalized feed showing posts from you and users you follow
- **Post Management** - Create, view, and delete posts with images and captions
- **Social Interactions**
  - Like/unlike posts
  - Comment on posts
  - Save posts for later
  - Follow/unfollow users
- **Profile System**
  - View your own profile and other users' profiles
  - Edit your profile (name, username, bio, avatar)
  - View posts, saved posts, and liked posts
  - See followers and following lists
- **Search** - Search for users by name or username
- **Responsive Design** - Beautiful UI optimized for desktop and mobile devices

### UI/UX Features
- **Smooth Animations** - Powered by Framer Motion for elegant transitions
- **Dark Theme** - Modern dark mode interface
- **Modal System** - Post details, comments, and likes in elegant modals
- **Optimistic UI** - Instant feedback for all interactions
- **Infinite Scroll** - Seamless pagination for feeds and lists

## 🛠️ Tech Stack

### Core
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Framer Motion** - Animation library

### State Management & Data Fetching
- **React Query (TanStack Query)** - Server state management
- **React Context API** - Client state (auth, UI)

### Routing
- **React Router v7** - Declarative routing

### Forms & Validation
- **React Hook Form** - Performant form library
- **Zod** - Schema validation

### HTTP Client
- **Axios** - Promise-based HTTP client

### Icons
- **Lucide React** - Beautiful icon library

## 📋 Prerequisites

- **Node.js** 18+ and npm
- Backend API server running (see API Integration section)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-sociality
```

2. Install dependencies:
```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory (if not already present):

```env
VITE_API_BASE_URL=http://localhost:3000
```

The API base URL should point to your backend server. If the backend is on the same domain, you can use a relative path like `/` or leave it empty.

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

### Build

Build for production:

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
react-sociality/
├── src/
│   ├── api/              # API client and endpoints
│   │   ├── client.ts     # Axios instance with interceptors
│   │   └── endpoints.ts  # API endpoint functions
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── modals/       # Modal and drawer components
│   │   ├── navigation/  # Navigation components
│   │   ├── post/         # Post-related components
│   │   ├── profile/      # Profile components
│   │   └── upload/       # Upload components
│   ├── context/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── UIContext.tsx
│   ├── hooks/            # Custom React hooks (React Query)
│   │   ├── useAuth.ts
│   │   ├── useFeed.ts
│   │   ├── usePost.ts
│   │   ├── useLike.ts
│   │   ├── useSave.ts
│   │   ├── useComments.ts
│   │   ├── useFollow.ts
│   │   ├── useProfile.ts
│   │   └── useSearchUsers.ts
│   ├── lib/              # Utility libraries
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── motion/           # Framer Motion variants
│   │   ├── buttons.ts
│   │   ├── comments.ts
│   │   ├── drawer.ts
│   │   ├── list.ts
│   │   ├── modal.ts
│   │   ├── page.ts
│   │   ├── profile.ts
│   │   ├── search.ts
│   │   └── shared.ts
│   ├── pages/            # Page components
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── FeedPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── MyProfilePage.tsx
│   │   ├── EditProfilePage.tsx
│   │   ├── SearchPage.tsx
│   │   └── PostDetailPage.tsx
│   ├── router/           # Route configuration
│   │   └── index.tsx
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Base styles
├── public/               # Static assets
├── docs/                 # Documentation and design assets
├── .cursor/              # Cursor IDE configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔌 API Integration

This application requires a backend API server that implements the Sociality API specification. The API should follow the OpenAPI specification defined in `docs/sociality-coding.json`.

### API Base URL

Configure the API base URL via environment variable:
- Development: Set `VITE_API_BASE_URL` in `.env`
- Production: Set the environment variable in your deployment platform

### Authentication

The application uses JWT Bearer token authentication:
- Tokens are stored in `localStorage` as `auth_token`
- All protected endpoints automatically include `Authorization: Bearer <token>` header
- Unauthorized requests (401) automatically redirect to login

### API Endpoints

The application integrates with the following API endpoints:

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

#### Profile
- `GET /api/me` - Get current user profile
- `PATCH /api/me` - Update current user profile
- `GET /api/me/posts` - Get current user's posts
- `GET /api/me/likes` - Get current user's liked posts
- `GET /api/me/saved` - Get current user's saved posts
- `GET /api/me/followers` - Get current user's followers
- `GET /api/me/following` - Get current user's following
- `GET /api/users/{username}` - Get user profile by username
- `GET /api/users/{username}/posts` - Get user's posts
- `GET /api/users/{username}/followers` - Get user's followers
- `GET /api/users/{username}/following` - Get user's following
- `GET /api/users/{username}/likes` - Get user's liked posts

#### Feed & Posts
- `GET /api/feed` - Get timeline feed
- `GET /api/posts/{id}` - Get post details
- `POST /api/posts` - Create a new post
- `DELETE /api/posts/{id}` - Delete a post

#### Interactions
- `POST /api/posts/{id}/like` - Like a post
- `DELETE /api/posts/{id}/like` - Unlike a post
- `GET /api/posts/{id}/likes` - Get post likes
- `POST /api/posts/{id}/save` - Save a post
- `DELETE /api/posts/{id}/save` - Unsave a post
- `GET /api/posts/{id}/comments` - Get post comments
- `POST /api/posts/{id}/comments` - Add a comment
- `DELETE /api/comments/{id}` - Delete a comment

#### Follow
- `POST /api/follow/{username}` - Follow a user
- `DELETE /api/follow/{username}` - Unfollow a user

#### Search
- `GET /api/users/search` - Search users

For complete API documentation, refer to `docs/sociality-coding.json`.

## 🎨 Design System

The application follows a comprehensive design system with:

### Color Palette
- **Neutral Scale** - From `neutral-25` to `neutral-950` for backgrounds and text
- **Primary Colors** - Purple shades (`primary-200`, `primary-300`) for CTAs
- **Accent Colors** - Red, green, and yellow for status indicators

### Components
- **Glass-card surfaces** - Semi-transparent cards with blur effects
- **Rounded corners** - Card (12px), Input (10px), Pill (999px)
- **Shadows** - Card shadows and CTA glow effects

### Animations
All animations use Framer Motion with consistent timing:
- **Page transitions** - Fade and slide animations
- **Modal animations** - Scale and fade effects
- **Button interactions** - Scale feedback on tap
- **List animations** - Staggered entrance effects

See `.cursor/rules/000-development-guides.mdc` for complete design system documentation.

## 🧩 Key Components

### Authentication
- `AuthCard` - Container for auth forms
- `TextInput` - Text input with validation
- `PasswordInput` - Password input with show/hide toggle
- `GradientButton` - Primary action button

### Posts
- `PostCard` - Main post display component
- `PostAuthorHeader` - Post author information
- `PostImage` - Post image display
- `PostActions` - Like, comment, save actions
- `PostCaption` - Expandable caption display

### Profile
- `ProfileHeader` - Profile banner with avatar and stats
- `ProfileStats` - Followers, following, posts counts
- `ProfileTabs` - Gallery, Saved, Liked tabs
- `ImageGrid` - Grid layout for post images

### Modals & Drawers
- `PostDetailModal` - Full post detail view
- `CommentList` - List of comments
- `CommentComposer` - Add new comment
- `LikesDrawer` - Users who liked a post
- `CreatePostModal` - Create new post

## 🔐 Authentication Flow

1. User registers or logs in
2. JWT token is received and stored in `localStorage`
3. Token is automatically included in all API requests
4. Protected routes check for token and redirect to login if missing
5. Token expiration is handled by API (401 response triggers logout)

## 📱 Routing

### Public Routes
- `/login` - Login page
- `/register` - Registration page
- `/profile/:username` - User profile (public)
- `/posts/:id` - Post detail (public)
- `/users/search` - User search

### Protected Routes
- `/feed` - Main feed timeline
- `/me` - Current user's profile overview
- `/me/posts` - Current user's posts gallery
- `/me/likes` - Current user's liked posts
- `/me/saved` - Current user's saved posts
- `/me/followers` - Current user's followers
- `/me/following` - Current user's following
- `/me/edit` - Edit profile page

## 🎯 Development Guidelines

### Code Style
- Use TypeScript for all files
- Follow React best practices (hooks, functional components)
- Use ESLint for code quality
- Follow the project's file-by-file structure

### State Management
- **Server State**: Use React Query hooks (`useFeed`, `usePost`, etc.)
- **Client State**: Use React Context (`AuthContext`, `UIContext`)
- **Form State**: Use React Hook Form with Zod validation

### Animations
- All animations use Framer Motion
- Animation variants are centralized in `src/motion/`
- Use `AnimatePresence` for mount/unmount animations

### API Integration
- All API calls go through `src/api/endpoints.ts`
- Use React Query hooks for data fetching
- Implement optimistic updates for better UX

### Styling
- Use Tailwind CSS utility classes
- Follow the design system color palette
- Use custom Tailwind config for design tokens

## 🧪 Testing

Testing setup is optional but recommended:
- **Vitest** - Unit and integration tests
- **React Testing Library** - Component tests
- **Playwright** - End-to-end tests

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Build for Production

1. Set environment variables:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Deploy the `dist` directory to your hosting service (Vercel, Netlify, etc.)

### Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (required)

## 🤝 Contributing

1. Follow the commit message conventions (Conventional Commits)
2. Ensure code passes ESLint checks
3. Follow the design system and component patterns
4. Write tests for new features (if applicable)

### Commit Message Format

```
<type>(<scope>): <short summary>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `ci`

Example:
```
feat(api): add endpoint for user search
fix(ui): correct post card alignment
```

## 📄 License

This project is private and proprietary.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Query Documentation](https://tanstack.com/query)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [React Router Documentation](https://reactrouter.com)

## 🐛 Troubleshooting

### Common Issues

**API requests failing:**
- Check that `VITE_API_BASE_URL` is set correctly
- Verify the backend server is running
- Check browser console for CORS errors

**Authentication not working:**
- Verify token is stored in `localStorage`
- Check that API returns valid JWT tokens
- Ensure API endpoints match the expected format

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run build`
- Verify all environment variables are set

## 📞 Support

For issues and questions, please refer to the project documentation or contact the development team.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
