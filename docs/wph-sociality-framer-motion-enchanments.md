=====================================================================
🎞 ANIMATION SYSTEM — FRAMER MOTION (MUST MATCH FIGMA PDF)
=====================================================================

Use Framer Motion for all interactive, transitional, and modal UI.
Animations must match the feel of the Sociality Figma PDF:

• Smooth
• Soft
• Slight easing
• Subtle but intentional

=====================================================================
📌 GLOBAL ANIMATION GUIDELINES
=====================================================================

Use these base transition settings:

const softTransition = {
  type: "spring",
  stiffness: 240,
  damping: 26,
  mass: 0.9
};

const fadeTransition = {
  duration: 0.3,
  ease: "easeOut"
};

const modalTransition = {
  type: "spring",
  stiffness: 260,
  damping: 28
};

=====================================================================
🎬 PAGE TRANSITIONS (React Router v7)
=====================================================================

Every page must use these motion variants:

pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: fadeTransition },
  exit: { opacity: 0, y: -12, transition: fadeTransition }
}

Apply to:
- Login
- Register
- Feed
- Profile pages
- Search
- Post detail (not modal)
- Edit profile
- Add post

=====================================================================
📸 POST CARD ENTRANCE ANIMATION (Feed)
=====================================================================

Each PostCard should:
- Fade upward
- Slight scale-in (1%–2%)
- Stagger by index

postCardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: softTransition }
};

Parent list:
feedStagger = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

=====================================================================
🧭 NAVIGATION ANIMATIONS (Bottom + Top Navigation)
=====================================================================

BottomNav:
- Slide-up on mount: y: 60 → 0
- Fade-in

FloatingCreateButton:
- Scale from 0.8 to 1 with spring
- Hover: scale 1.05
- Press: scale 0.92

motion.button initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1, transition: softTransition }}

=====================================================================
🪟 MODAL ANIMATIONS (Post Detail, Edit Profile, Delete Confirm)
=====================================================================

#### Center Modal Animation (Post Detail)

Overlay:
overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: fadeTransition },
  exit: { opacity: 0, transition: fadeTransition }
};

Content:
modalVariants = {
  initial: { opacity: 0, scale: 0.96, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: modalTransition },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: fadeTransition }
};

=====================================================================
📱 SLIDE-UP DRAWERS (Likes, Comments List)
=====================================================================

Drawers must animate EXACTLY like the Figma interactions:

- From bottom → up
- Slight overshoot (spring)
- Dimmed background fade-in

drawerVariants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: modalTransition },
  exit: { y: "100%", transition: fadeTransition }
};

Overlay fade is same as modal overlay.

=====================================================================
💬 COMMENT COMPOSER ANIMATION
=====================================================================

When user opens emoji panel:
emojiPanelVariants = {
  initial: { opacity: 0, scale: 0.9, y: 4 },
  animate: { opacity: 1, scale: 1, y: 0, transition: softTransition },
  exit: { opacity: 0, scale: 0.95, y: 4, transition: fadeTransition }
};

New comment insertion:
- Animate from opacity 0 → 1
- y: 10 → 0

=====================================================================
🎨 LIKE / SAVE / FOLLOW BUTTON ANIMATIONS
=====================================================================

Tap / Toggle:
- Scale 1 → 0.85 → 1.05 → 1
- Quick spring bounce

likeAnimation = {
  whileTap: { scale: 0.85 },
  animate: isLiked
    ? { scale: [1, 1.1, 1], color: "#D9204E" }
    : { scale: [1, 0.97, 1], color: "#A4A7AE" }
};

saveAnimation = same pattern but color → primary-200

followButton:
- Transition between "Follow" → "Following"
- Fade text  
- Scale container 0.98 → 1

=====================================================================
💡 SEARCH AUTOCOMPLETE ANIMATIONS
=====================================================================

Autocomplete dropdown:
dropdownVariants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: fadeTransition },
  exit: { opacity: 0, y: -8, transition: fadeTransition }
};

Each result item:
resultItemVariants = {
  initial: { opacity: 0, x: -6 },
  animate: { opacity: 1, x: 0, transition: fadeTransition }
};

=====================================================================
🖼 PROFILE PAGE ANIMATIONS
=====================================================================

Tabs:
- Underline slides left/right with spring
- Tab content crossfades with y-shift

Grid Images:
- Staggered fade-and-scale-in
- Hover: slight zoom 1.04

Empty state:
- Soft fade + slight upshift

=====================================================================
🧩 ADD POST / EDIT PROFILE ANIMATIONS
=====================================================================

UploadDropzone:
- On drag-enter: border-primary-200 + scale 1.02
- On drag-leave: revert smoothly

ImagePreview:
- Fade in  
- Slight scale 0.98 → 1  

Form Fields:
- Fade upward on mount

Save Changes / Share button:
- Pulse glow on success (shadow-glow 1s ease-out)

=====================================================================
📦 IMPLEMENTATION RULES FOR CURSOR
=====================================================================

- Every component using animations must import `motion` from Framer Motion.
- Organize variants in a `/src/motion/` folder:
  - page.ts
  - modal.ts
  - drawer.ts
  - buttons.ts
  - list.ts
  - profile.ts
  - search.ts
  - comments.ts

- Pages must wrap content in <AnimatePresence> for transitions.
- Modals/drawers MUST use AnimatePresence for mount/unmount.
- Keep all animations subtle and elegant like the Figma PDF.

