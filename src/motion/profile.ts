import { softTransition } from './shared'

export const tabUnderlineVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: softTransition },
}

export const gridImageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: softTransition },
}

export const gridStagger = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
}
