import { fadeTransition, modalTransition } from './shared'

export const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: fadeTransition },
  exit: { opacity: 0, transition: fadeTransition },
}

export const modalVariants = {
  initial: { opacity: 0, scale: 0.96, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: modalTransition },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: fadeTransition },
}
