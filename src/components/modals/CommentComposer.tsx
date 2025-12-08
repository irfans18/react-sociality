import { useState } from 'react'
import { Send } from 'lucide-react'
import { motion } from 'framer-motion'

interface CommentComposerProps {
  onSubmit: (text: string) => void
  isLoading?: boolean
}

export function CommentComposer({ onSubmit, isLoading }: CommentComposerProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onSubmit(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-neutral-800">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="input-base flex-1 px-4 py-2 text-neutral-50 placeholder:text-neutral-500"
          disabled={isLoading}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!text.trim() || isLoading}
          className="bg-primary-200 hover:bg-primary-300 text-white rounded-input px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </motion.button>
      </div>
    </form>
  )
}
