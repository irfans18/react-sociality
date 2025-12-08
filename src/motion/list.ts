import { softTransition } from './shared'

export const postCardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: softTransition },
}

export const feedStagger = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const commentItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: softTransition },
}
