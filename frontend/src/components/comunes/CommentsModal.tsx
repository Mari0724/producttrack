import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface Comment {
  id: number
  text: string
  user: string
  date: string
}

interface CommentsModalProps {
  productName: string
  onClose: () => void
}

const ProductCommentsModal: React.FC<CommentsModalProps> = ({ productName, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // Simula carga de comentarios
    const dummyComments: Comment[] = [
      { id: 1, text: 'Excelente producto', user: 'María', date: '2024-05-20' },
      { id: 2, text: 'Me gustó mucho', user: 'Carlos', date: '2024-05-21' },
    ]
    setComments(dummyComments)
  }, [])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newEntry: Comment = {
      id: comments.length + 1,
      text: newComment,
      user: 'Tú', // Aquí pondrías el nombre real si tienes auth
      date: new Date().toISOString().split('T')[0],
    }

    setComments([...comments, newEntry])
    setNewComment('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative space-y-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#81203D]">
          <AiOutlineClose size={22} />
        </button>

        <h2 className="text-xl font-bold text-[#81203D]">Comentarios de: {productName}</h2>

        <div className="space-y-2 max-h-52 overflow-y-auto pr-2">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">{comment.text}</p>
              <p className="text-xs text-right text-gray-500">— {comment.user}, {comment.date}</p>
            </div>
          ))}
        </div>

        <div>
          <textarea
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-2 bg-[#81203D] hover:bg-[#60162F] text-white px-4 py-2 rounded-lg text-sm"
          >
            Enviar comentario
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCommentsModal
