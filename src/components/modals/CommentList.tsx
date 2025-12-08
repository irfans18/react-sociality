import { useComments, useCreateComment } from '@/hooks/useComments'
import { CommentItem } from './CommentItem'
import { CommentComposer } from './CommentComposer'
import { useUI } from '@/context/UIContext'
import { SlideUpDrawer } from './SlideUpDrawer'

export function CommentList() {
  const { commentsDrawerOpen, setCommentsDrawerOpen, selectedPostId } = useUI()
  const postId = selectedPostId || 0
  const { data: commentsData, isLoading } = useComments(postId)
  const createComment = useCreateComment(postId)

  const comments = commentsData?.data || []

  return (
    <SlideUpDrawer
      isOpen={commentsDrawerOpen}
      onClose={() => setCommentsDrawerOpen(false)}
      title="Comments"
    >
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-neutral-400 py-8">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-neutral-400 py-8">No comments yet</div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
      <CommentComposer
        onSubmit={(text) => createComment.mutate(text)}
        isLoading={createComment.isPending}
      />
    </SlideUpDrawer>
  )
}
