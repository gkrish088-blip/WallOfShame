import { useRef } from "react"

const AddSnippetCard = ({ onClick }) => {
  const rotation = useRef((Math.random() * 16) - 8)

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer p-5 rounded flex flex-col items-center justify-center gap-3"
      style={{
        backgroundColor: 'rgba(245, 230, 200, 0.15)',
        border: '2px dashed #c8a97e',
        transform: `rotate(${rotation.current}deg)`,
        transition: 'transform 0.2s ease',
        minHeight: '200px',
      }}
    >
      {/* Pin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
        style={{ backgroundColor: '#8B6914', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
      />

      {/* Plus icon */}
      <div 
        className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
        style={{ 
          border: '2px solid #c8a97e',
          color: '#c8a97e',
        }}
      >
        +
      </div>

      {/* Text */}
      <p 
        className="text-center text-sm"
        style={{ 
          color: '#c8a97e',
          fontFamily: 'Playfair Display, serif'
        }}
      >
        Add your own snippet
      </p>
    </div>
  )
}

export default AddSnippetCard