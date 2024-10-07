import React from 'react'
import { Play } from 'lucide-react'

interface TextDisplayProps {
  text: {
    chinese: string;
    pinyin: string[];
    vietnamese: string;
  }
  onSpeakWord: (word: string) => void
  onSpeakSentence: (sentence: string) => void
  isLoading: boolean
  isPlaying: boolean
  currentWordIndex: number
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text, onSpeakWord, onSpeakSentence, isLoading, isPlaying, currentWordIndex }) => {
  if (!text.chinese) {
    return (
      <div className="bg-background-alt p-4 rounded-lg mb-4">
        <p className="text-lg text-text">Generate text to start learning!</p>
      </div>
    )
  }

  const sentences = text.chinese.split(/(?<=[。！？])/);

  return (
    <div className="bg-background-alt p-4 rounded-lg mb-4">
      <div className="mb-4">
        {sentences.map((sentence, sentenceIndex) => (
          <div key={sentenceIndex} className="mb-2 relative group">
            <div className="flex flex-wrap items-end">
              {sentence.split('').map((char, charIndex) => {
                const globalIndex = sentences.slice(0, sentenceIndex).join('').length + charIndex;
                return (
                  <div
                    key={charIndex}
                    className={`inline-flex flex-col items-center justify-end mr-1 mb-2 cursor-pointer ${
                      globalIndex === currentWordIndex ? 'bg-primary bg-opacity-20 rounded' : ''
                    }`}
                    style={{ width: '2em', height: '3.5em' }}
                    onClick={() => !isLoading && onSpeakWord(char)}
                  >
                    <div className="text-xs text-text-alt mb-1 h-4 overflow-hidden">{text.pinyin[globalIndex]}</div>
                    <div className={`text-2xl font-bold transition-colors hover:text-primary ${isLoading ? 'opacity-50' : ''}`}>{char}</div>
                  </div>
                )
              })}
            </div>
            <button
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full bg-secondary text-secondary-content hover:bg-secondary-hover ${isLoading || isPlaying ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={() => !isLoading && !isPlaying && onSpeakSentence(sentence)}
              title="Play sentence"
              disabled={isLoading || isPlaying}
              style={{ width: '32px', height: '32px' }}
            >
              <Play size={16} />
            </button>
          </div>
        ))}
      </div>
      {text.vietnamese && (
        <p className="text-md text-text-alt mt-4">{text.vietnamese}</p>
      )}
    </div>
  )
}

export default TextDisplay