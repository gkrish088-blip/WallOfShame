import { useState } from "react"
import { getIdentity } from "../utils/identity.js"
import { addSnippet } from "../api/index.js"

const AddSnippetForm = ({ onClose, onSuccess }) => {
  const [snippetCode, setSnippetCode] = useState("")
  const [snippetLanguage, setSnippetLanguage] = useState("javascript")
  const [discription, setDiscription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    // basic validation
    if (!snippetCode.trim()) {
      setError("Code cannot be empty")
      return
    }

    try {
      setLoading(true)
      const user = getIdentity()

      await addSnippet({
        snippetCode,
        snippetLanguage,
        discription,
        aliasName: user.user_alias,
        ownerToken: user.user_uuid,   
      })

      onSuccess()  // refresh the wall
      onClose()    // close the form

    } catch (err) {
      setError("Failed to post snippet. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    // dark overlay behind the form
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}  // clicking outside closes it
    >
      {/* Form card — stop click propagating to overlay */}
      <div
        className="relative p-8 rounded-lg w-full max-w-lg"
        style={{ 
          backgroundColor: '#f5e6c8',
          fontFamily: 'JetBrains Mono, monospace'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl"
          style={{ color: '#2C1A0E' }}
        >
          ✕
        </button>

        <h2 
          className="text-xl mb-6 font-medium"
          style={{ 
            color: '#2C1A0E',
            fontFamily: 'Playfair Display, serif'
          }}
        >
          Pin your shame
        </h2>

        {/* Language selector */}
        <div className="mb-4">
          <label className="text-xs mb-1 block" style={{ color: '#5a3e1b' }}>
            Language
          </label>
          <select
            value={snippetLanguage}
            onChange={(e) => setSnippetLanguage(e.target.value)}
            className="w-full p-2 rounded text-sm"
            style={{ 
              backgroundColor: '#ede0c4',
              color: '#2C1A0E',
              border: '1px solid #8B6914'
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="bash">Bash</option>
            <option value="sql">SQL</option>
            <option value="typescript">TypeScript</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Code input */}
        <div className="mb-4">
          <label className="text-xs mb-1 block" style={{ color: '#5a3e1b' }}>
            The cursed code
          </label>
          <textarea
            value={snippetCode}
            onChange={(e) => setSnippetCode(e.target.value)}
            rows={6}
            placeholder="paste your shameful code here..."
            className="w-full p-3 rounded text-sm resize-none"
            style={{ 
              backgroundColor: '#ede0c4',
              color: '#2C1A0E',
              border: '1px solid #8B6914',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="text-xs mb-1 block" style={{ color: '#5a3e1b' }}>
            What went wrong (optional)
          </label>
          <input
            type="text"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            placeholder="I thought this was a good idea..."
            className="w-full p-2 rounded text-sm"
            style={{ 
              backgroundColor: '#ede0c4',
              color: '#2C1A0E',
              border: '1px solid #8B6914',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs mb-4" style={{ color: '#c0392b' }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded text-sm font-medium"
          style={{ 
            backgroundColor: '#2C1A0E',
            color: '#c8a97e',
          }}
        >
          {loading ? "Pinning..." : "Pin it to the wall"}
        </button>
      </div>
    </div>
  )
}

export default AddSnippetForm