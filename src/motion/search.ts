import { fadeTransition } from './shared'

export const dropdownVariants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: fadeTransition },
  exit: { opacity: 0, y: -8, transition: fadeTransition },
}

export const resultItemVariants = {
  initial: { opacity: 0, x: -6 },
  animate: { opacity: 1, x: 0, transition: fadeTransition },
}
