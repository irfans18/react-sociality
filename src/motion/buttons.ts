export const likeAnimation = {
  whileTap: { scale: 0.85 },
}

export const getLikeAnimate = (isLiked: boolean) => ({
  scale: isLiked ? 1.1 : 1,
  color: isLiked ? '#D9204E' : '#A4A7AE',
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 17,
  },
})

export const saveAnimation = {
  whileTap: { scale: 0.85 },
}

export const getSaveAnimate = (isSaved: boolean) => ({
  scale: isSaved ? 1.1 : 1,
  color: isSaved ? '#7F51F9' : '#A4A7AE',
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 17,
  },
})

export const followButtonVariants = {
  initial: { scale: 0.98 },
  animate: { scale: 1 },
  exit: { scale: 0.98 },
}
