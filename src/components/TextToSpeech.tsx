import React from 'react'
import { Volume2 } from 'lucide-react'

interface TextToSpeechProps {
  text: string
  onSpeak: () => void
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, onSpeak }) => {
  return (
    <button
      onClick={onSpeak}
      disabled={!text}
      className={`flex items-center justify-center px-4 py-2 rounded w-32 ${
        text
          ? 'bg-secondary text-secondary-content hover:bg-secondary-hover'
          : 'bg-background-alt text-text-alt cursor-not-allowed'
      } transition-colors`}
    >
      <Volume2 className="mr-2" size={20} />
      Speak
    </button>
  )
}

export default TextToSpeech