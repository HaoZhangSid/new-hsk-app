import React from 'react'

interface TextLengthSelectorProps {
  selectedLength: string
  onLengthChange: (length: string) => void
}

const TextLengthSelector: React.FC<TextLengthSelectorProps> = ({ selectedLength, onLengthChange }) => {
  const lengths = [
    { value: 'short', label: '短 (1-2句)' },
    { value: 'medium', label: '中 (3-4句)' },
    { value: 'long', label: '长 (5-6句)' }
  ]

  return (
    <div className="mb-4">
      <label className="block text-text-alt text-sm font-bold mb-2">选择文本长度：</label>
      <select
        value={selectedLength}
        onChange={(e) => onLengthChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-md bg-background text-text"
      >
        {lengths.map((length) => (
          <option key={length.value} value={length.value}>
            {length.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TextLengthSelector