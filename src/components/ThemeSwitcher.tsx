import React, { useState, useEffect } from 'react'
import { Sun, Moon, Palette } from 'lucide-react'

const themes = [
  { name: 'light', icon: Sun, class: 'theme-light' },
  { name: 'dark', icon: Moon, class: 'theme-dark' },
  { name: 'blue', icon: Palette, class: 'theme-blue' },
  { name: 'green', icon: Palette, class: 'theme-green' },
  { name: 'purple', icon: Palette, class: 'theme-purple' },
  { name: 'pink', icon: Palette, class: 'theme-pink' },
]

const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.documentElement.className = themes.find(t => t.name === currentTheme)?.class || ''
  }, [currentTheme])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-primary hover:bg-primary-hover text-primary-content"
        aria-label="Toggle theme"
      >
        {React.createElement(themes.find(t => t.name === currentTheme)?.icon || Sun, { size: 24 })}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-background rounded-md shadow-xl z-20">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                setCurrentTheme(theme.name)
                setIsOpen(false)
              }}
              className="flex items-center px-4 py-2 text-sm text-primary hover:bg-primary hover:bg-opacity-10 w-full text-left"
            >
              {React.createElement(theme.icon, { size: 18, className: "mr-2" })}
              {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher