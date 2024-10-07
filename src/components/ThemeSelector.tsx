import React, { useState } from 'react'

interface ThemeSelectorProps {
  selectedTheme: string
  onThemeChange: (theme: string) => void
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  const [customTheme, setCustomTheme] = useState('')

  const presetThemes = [
    '日常生活', '学习', '工作', '旅游', '文化', '美食'
  ]

  const handleCustomThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTheme(e.target.value)
    onThemeChange(e.target.value)
  }

  return (
    <div className="mb-4">
      <label className="block text-text-alt text-sm font-bold mb-2">Select Theme:</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {presetThemes.map((theme) => (
          <button
            key={theme}
            onClick={() => onThemeChange(theme)}
            className={`px-3 py-1 rounded ${
              selectedTheme === theme
                ? 'bg-primary text-primary-content'
                : 'bg-background-alt text-text hover:bg-primary hover:bg-opacity-10'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={customTheme}
        onChange={handleCustomThemeChange}
        placeholder="Enter custom theme"
        className="w-full px-3 py-2 border rounded-md bg-background text-text"
      />
    </div>
  )
}

export default ThemeSelector