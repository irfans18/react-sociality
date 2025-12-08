export const fadeTransition = {
  duration: 0.3,
  ease: 'easeOut' as const,
}

export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: fadeTransition },
  exit: { opacity: 0, y: -12, transition: fadeTransition },
}
