You are Lead Frontend Architect in Cursor (Context7 MCP), building the Sociality Web App using:

- React 19 (client only, Vite)
- Tailwind CSS 4.1
- shadcn/ui
- React Router v7
- React Query (all server state)
- React Context API (auth + UI/global)
- Zod + React Hook Form
- File-by-file generation (Cursor MCP best practices)

Your job:
Generate a production-ready social media web app called **Sociality**, built using:

1. **Sociality MVP Guide** (flows, UX, required endpoints, acceptance criteria)  ← REQUIRED  
   Source: :contentReference[oaicite:3]{index=3}

2. **Sociality API Specification (OpenAPI 3.0)** (exact endpoint request/response rules)  
   Source: :contentReference[oaicite:4]{index=4}

3. **Sociality Figma PDF UI** (visual layout, component hierarchy, spacing, card design, modals, typography)  
   Source: :contentReference[oaicite:5]{index=5}

4. **Uploaded Color Design System** (primary, neutral, accent, base colors)  
   Use tokens EXACTLY as defined below.

=====================================================================
🎨 DESIGN SYSTEM — COLORS (use this exact palette everywhere)
=====================================================================

Neutral scale:
25:  #FDFDFD
50:  #FAFAFA
100: #F5F5F5
200: #E9EAEB
300: #D0D7DA
400: #A4A7AE
500: #797E89
600: #555B62
700: #414661
800: #252B37
900: #191D27
950: #0A0D12

Primary:
100: #F0F6FE
200: #7F51F9
300: #9639F2

Accent:
red:    #D9204E
green:  #07A655
yellow: #F7D022

Base:
white: #FFFFFF
black: #000000

Tailwind must contain these as tokens. Buttons, icons, inputs, cards, modals MUST use these colors.

=====================================================================
🎨 DESIGN SYSTEM — COMPONENT RULES (from Figma PDF)
=====================================================================

Extracted visually from the provided Sociality Figma PDF:

• Glass-card surfaces: bg-neutral-900/60, border-neutral-800, rounded-card, shadow-card  
• Inputs: bg-neutral-900, border-neutral-700, rounded-input, focus:ring-primary-200  
• Error text: text-accent-red  
• Primary buttons: bg-primary-200 → hover:bg-primary-300, text-white, rounded-pill  
• PostCard layout: avatar → name → timestamp → image → reaction row → caption → “Show more”  
• Bottom nav (mobile): Home, Add Post (floating purple), Profile  
• Modals (likes drawer, comments, post detail): backdrop bg-black/70 + backdrop-blur-md  
• Profile page elements: stats grid, gallery tab, saved tab, liked tab  
• Empty states: centered illustrations + soft text  
• Upload dropzone: border-dashed border-neutral-600, text-neutral-400  
• Edit profile form: avatar upload circle, labeled fields, save button

Spacing:
• 24px vertical rhythm on auth screens  
• 16px spacing between inputs and labels  
• 32px spacing before CTAs  
• Post card vertical padding: 24px  
• Comments modal: 16px spacing between items

Radii:
• Card: 12px  
• Input: 10px  
• Pill: 999px (for buttons)

Shadows:
• Card shadow: 0 4px 24px rgba(0,0,0,0.25)  
• CTA glow: 0 0 20px rgba(150,57,242,0.45)

=====================================================================
📁 PROJECT REQUIREMENTS — FILE STRUCTURE
=====================================================================

Use this folder structure:

src/
  api/
  components/
  context/
  hooks/
  pages/
  router/
  types/
  utils/
  styles/
  lib/

Cursor must generate files in this structure.

=====================================================================
📦 TAILWIND SETUP
=====================================================================

Generate tailwind.config.js using:

- Dark mode enabled
- Extended color palette from the color design system above
- Custom radii (card, input, pill)
- Custom shadows (card, glow)
- Typography scale from the Sociality PDF

=====================================================================
🔐 AUTH & UI CONTEXT
=====================================================================

Create:
- AuthContext (token, login(), logout(), isAuthenticated)
- UIContext (drawers, modals, toasts, theme)

Auth rules per MVP Guide:
- Token persisted in localStorage
- Redirect user to login if performing private actions while logged-out
- include "returnTo" URL
- Attach Bearer token to all protected endpoints

=====================================================================
🧠 API CLIENT (OpenAPI-compliant)
=====================================================================

Build a typed API client matching EXACTLY the OpenAPI spec:  
- /api/auth/register  
- /api/auth/login  
- /api/me  
- /api/me/posts  
- /api/me/likes  
- /api/me/saved  
- /api/feed  
- /api/posts (create, get, delete)  
- /api/posts/{id}/like  
- /api/posts/{id}/save  
- /api/posts/{id}/comments  
- /api/users/search  
- /api/users/{username}  
- /api/users/{username}/posts  
- /api/users/{username}/likes  
- /api/users/{username}/followers  
- /api/users/{username}/following  
- /api/follow/{username}

Implement:
- Axios instance
- Token injection interceptor
- File upload helper (multipart/form-data)

=====================================================================
🧩 HOOKS (React Query)
=====================================================================

Generate hooks:

useAuth()
useFeed()
usePost(id)
useCreatePost()
useDeletePost()
useLike(postId)
useSave(postId)
useComments(postId)
useCreateComment()
useDeleteComment()
useFollow(username)
useSearchUsers()

All hooks must handle:
- Loading
- Empty
- Error
- Pagination
- Infinite scrolling (for feed)

=====================================================================
🧱 COMPONENT LIBRARY (PIXEL-PERFECT TO FIGMA PDF)
=====================================================================

Generate production-quality components, matching the Figma layout:

AUTH:
- AuthCard
- TextInput
- PasswordInput
- GradientButton

POST SYSTEM:
- PostCard
- PostAuthorHeader
- PostImage
- PostActions (like/comment/save/share)
- PostCaption (expandable)
- ShowMoreButton

NAVIGATION:
- TopNavBar
- BottomNav (mobile)
- FloatingCreateButton

PROFILE:
- ProfileHeader
- ProfileStats
- ProfileTabs (Gallery / Saved / Liked)
- EmptyProfileState
- ImageGrid

MODALS & DRAWERS:
- SlideUpDrawer
- PostDetailModal
- CommentList
- CommentItem
- CommentComposer
- LikesDrawer

UPLOAD:
- UploadDropzone
- ImagePreview
- CaptionField

EDIT PROFILE:
- EditProfileForm
- AvatarUpload

SEARCH:
- SearchBar
- SearchResultItem
- EmptySearchState

=====================================================================
🖼 PAGES (React Router v7)
=====================================================================

Public pages:
- /login
- /register
- /profile/:username
- /users/search
- /posts/:id (public post detail)

Private pages:
- /feed
- /me          → Overview
- /me/posts    → Gallery
- /me/likes    → Liked posts
- /me/saved    → Saved posts
- /me/followers
- /me/following

Page output MUST include:
- pixel-perfect layout (Figma PDF)
- loading, empty, and error states
- pagination or infinite scroll
- follow/unfollow button behavior
- like/unlike/save/unsave (idempotent)
- post creation modal
- post deletion confirmation

=====================================================================
🧮 OPTIMISTIC UI RULES (REQUIRED)
=====================================================================

Like/unlike:
- Immediate toggle → rollback if API fails

Follow/unfollow:
- Update counts in both profile header and lists

Save/unsave:
- Update save icon + saved posts page

Comments:
- Optimistically insert new comment
- On failure, revert and show toast

=====================================================================
🧪 TESTING (optional but generate stubs)
=====================================================================

- Vitest for hooks & utils
- React Testing Library for components
- Playwright for major flows

=====================================================================
🚀 START NOW
=====================================================================

BEGIN by generating:

1. **Folder structure + initial project setup**  
2. **tailwind.config.js** (with color system above)  
3. **src/styles/globals.css**  
4. **AuthContext + UIContext**

Then proceed sequentially:
API → hooks → components → pages → router → integration.

All code must be split into real files using Cursor MCP format.

