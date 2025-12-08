import { fadeTransition, modalTransition } from './shared'

export const drawerVariants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: modalTransition },
  exit: { y: '100%', transition: fadeTransition },
}

export const drawerOverlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: fadeTransition },
  exit: { opacity: 0, transition: fadeTransition },
}
