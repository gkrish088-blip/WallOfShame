import { useEffect, useState } from "react"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import useComments from "../hooks/useComments"
import { getIdentity } from "../utils/identity"

const SnippetThread = ({ snippet, onClose }) => {
  const { comments, loading, fetchComments, postComment, removeComment } = useComments(snippet._id)
  const [commentText, setCommentText] = useState("")
  const user = getIdentity()

  // fetch comments when thread opens
  useEffect(() => {
    fetchComments()
  }, [snippet._id])

  const handlePostComment = async () => {
    if (!commentText.trim()) return

    await postComment({
      snippetId: snippet._id,
      commentText,
      aliasName: user.user_alias,
      ownerToken: user.user_uuid,
      gifUrl: null
    })

    setCommentText("")  // clear input after posting
  }

  return (
    // overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      {/* thread card */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg p-8"
        style={{ backgroundColor: '#f5e6c8' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl"
          style={{ color: '#2C1A0E' }}
        >
          ✕
        </button>

        {/* snippet author */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${snippet.aliasName}`}
            className="w-7 h-7 rounded-full"
          />
          <span className="text-sm" style={{ color: '#5a3e1b', fontFamily: 'JetBrains Mono, monospace' }}>
            {snippet.aliasName}
          </span>
          <span className="text-xs ml-auto px-2 py-1 rounded"
            style={{ backgroundColor: '#2C1A0E', color: '#c8a97e' }}
          >
            {snippet.snippetLanguage}
          </span>
        </div>

        {/* full code with syntax highlighting */}
        <div className="rounded-lg overflow-hidden mb-4">
          <SyntaxHighlighter
            language={snippet.snippetLanguage}
            style={atomOneDark}
            customStyle={{ fontSize: '13px', borderRadius: '8px', padding: '16px' }}
          >
            {snippet.snippetCode}
          </SyntaxHighlighter>
        </div>

        {/* description */}
        {snippet.discription && (
          <p className="text-sm mb-6 italic" style={{ color: '#5a3e1b' }}>
            "{snippet.discription}"
          </p>
        )}

        {/* divider */}
        <div className="border-t mb-6" style={{ borderColor: '#8B6914' }} />

        {/* comments */}
        <h3 className="text-sm font-medium mb-4" style={{ color: '#2C1A0E', fontFamily: 'Playfair Display, serif' }}>
          Remarks
        </h3>

        {loading && (
          <p className="text-xs" style={{ color: '#5a3e1b' }}>Loading comments...</p>
        )}

        <div className="flex flex-col gap-4 mb-6">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 items-start">
              {/* avatar */}
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${comment.aliasName}`}
                className="w-7 h-7 rounded-full flex-shrink-0"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium" style={{ color: '#2C1A0E', fontFamily: 'JetBrains Mono, monospace' }}>
                    {comment.aliasName}
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#5a3e1b' }}>
                  {comment.commentText}
                </p>
              </div>

              {/* delete — only for own comments */}
              {comment.aliasName === user.user_alias && (
                <button
                  onClick={() => removeComment(comment._id)}
                  className="text-xs"
                  style={{ color: '#c0392b' }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {comments.length === 0 && !loading && (
            <p className="text-xs italic" style={{ color: '#8B6914' }}>
              No remarks yet. Be the first to roast.
            </p>
          )}
        </div>

        {/* comment input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
            placeholder="Leave a remark..."
            className="flex-1 p-2 rounded text-sm"
            style={{
              backgroundColor: '#ede0c4',
              color: '#2C1A0E',
              border: '1px solid #8B6914',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          />
          <button
            onClick={handlePostComment}
            className="px-4 py-2 rounded text-sm"
            style={{ backgroundColor: '#2C1A0E', color: '#c8a97e' }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default SnippetThread