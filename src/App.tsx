import React, { useState, useRef, useEffect } from 'react'
import { RefreshCw, Languages, Volume2 } from 'lucide-react'
import HSKLevelSelector from './components/HSKLevelSelector'
import TextDisplay from './components/TextDisplay'
import ThemeSelector from './components/ThemeSelector'
import TextLengthSelector from './components/TextLengthSelector'
import ThemeSwitcher from './components/ThemeSwitcher'
import VoiceModelSelector from './components/VoiceModelSelector'
import { generateChineseText, generateVietnameseTranslation } from './services/gptService'
import { synthesizeSpeech } from './services/azureService'
import './theme.css'

function App() {
  const [hskLevel, setHskLevel] = useState(1)
  const [theme, setTheme] = useState('')
  const [textLength, setTextLength] = useState('short')
  const [text, setText] = useState({ chinese: '', pinyin: [], vietnamese: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [voiceModel, setVoiceModel] = useState('zh-CN-XiaoxiaoNeural')
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)

  const handleGenerateText = async () => {
    setIsLoading(true)
    try {
      const { chinese, pinyin } = await generateChineseText(hskLevel, theme, textLength)
      const vietnamese = await generateVietnameseTranslation(chinese)
      setText({ chinese, pinyin, vietnamese })
    } catch (error) {
      console.error('Error generating text:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSpeak = async (textToSpeak: string) => {
    if (!textToSpeak || isPlaying) return
    setIsPlaying(true)
    try {
      const { audioBlob, wordBoundaries } = await synthesizeSpeech(textToSpeak, voiceModel)
      const url = URL.createObjectURL(audioBlob)
      if (audioRef.current) {
        audioRef.current.src = url
        audioRef.current.play()

        let currentIndex = 0
        const updateWordHighlight = () => {
          if (currentIndex < wordBoundaries.length) {
            const currentBoundary = wordBoundaries[currentIndex]
            setCurrentWordIndex(currentIndex)
            setTimeout(updateWordHighlight, currentBoundary.duration / 10000)
            currentIndex++
          } else {
            setCurrentWordIndex(-1)
          }
        }
        updateWordHighlight()
      }
    } catch (error) {
      console.error('Error speaking text:', error)
    } finally {
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false)
        setCurrentWordIndex(-1)
      }
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-text">Chinese Learning App</h1>
      <div className="flex justify-between items-center mb-4">
        <HSKLevelSelector selectedLevel={hskLevel} onLevelChange={setHskLevel} />
        <ThemeSwitcher />
      </div>
      <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />
      <TextLengthSelector selectedLength={textLength} onLengthChange={setTextLength} />
      <VoiceModelSelector selectedVoice={voiceModel} onVoiceChange={setVoiceModel} />
      <button
        onClick={handleGenerateText}
        disabled={isLoading}
        className={`flex items-center justify-center px-4 py-2 rounded w-full mb-4 ${
          isLoading
            ? 'bg-background-alt text-text-alt cursor-not-allowed'
            : 'bg-primary text-primary-content hover:bg-primary-hover'
        } transition-colors`}
      >
        {isLoading ? (
          <RefreshCw className="animate-spin mr-2" size={20} />
        ) : (
          <Languages className="mr-2" size={20} />
        )}
        Generate Text
      </button>
      <TextDisplay
        text={text}
        onSpeakWord={(word) => handleSpeak(word)}
        onSpeakSentence={(sentence) => handleSpeak(sentence)}
        isLoading={isLoading}
        isPlaying={isPlaying}
        currentWordIndex={currentWordIndex}
      />
      <button
        onClick={() => handleSpeak(text.chinese)}
        disabled={!text.chinese || isPlaying}
        className={`flex items-center justify-center px-4 py-2 rounded w-full mt-4 ${
          !text.chinese || isPlaying
            ? 'bg-background-alt text-text-alt cursor-not-allowed'
            : 'bg-secondary text-secondary-content hover:bg-secondary-hover'
        } transition-colors`}
      >
        <Volume2 className="mr-2" size={20} />
        Speak Full Text
      </button>
      <audio ref={audioRef} />
    </div>
  )
}

export default App