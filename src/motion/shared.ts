export const softTransition = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 26,
  mass: 0.9,
}

export const fadeTransition = {
  duration: 0.3,
  ease: 'easeOut' as const,
}

export const modalTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 28,
}
