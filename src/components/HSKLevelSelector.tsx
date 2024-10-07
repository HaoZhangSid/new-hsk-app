import React from 'react'

interface HSKLevelSelectorProps {
  selectedLevel: number
  onLevelChange: (level: number) => void
}

const HSKLevelSelector: React.FC<HSKLevelSelectorProps> = ({ selectedLevel, onLevelChange }) => {
  const levels = [1, 2, 3, 4, 5, 6]

  return (
    <div className="mb-4">
      <label className="block text-text-alt text-sm font-bold mb-2">Select HSK Level:</label>
      <div className="flex space-x-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            className={`px-3 py-1 rounded ${
              selectedLevel === level
                ? 'bg-primary text-primary-content'
                : 'bg-background-alt text-text hover:bg-primary hover:bg-opacity-10'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HSKLevelSelector