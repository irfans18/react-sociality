import { softTransition, fadeTransition } from './shared'

export const emojiPanelVariants = {
  initial: { opacity: 0, scale: 0.9, y: 4 },
  animate: { opacity: 1, scale: 1, y: 0, transition: softTransition },
  exit: { opacity: 0, scale: 0.95, y: 4, transition: fadeTransition },
}

export const newCommentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: softTransition },
}

export const commentItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: softTransition },
}
