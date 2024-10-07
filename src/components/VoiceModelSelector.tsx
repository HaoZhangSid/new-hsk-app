import React from 'react'

interface VoiceModelSelectorProps {
  selectedVoice: string
  onVoiceChange: (voice: string) => void
}

const VoiceModelSelector: React.FC<VoiceModelSelectorProps> = ({ selectedVoice, onVoiceChange }) => {
  const voices = [
    { value: 'zh-CN-XiaoxiaoNeural', label: 'Xiaoxiao (女)' },
    { value: 'zh-CN-YunxiNeural', label: 'Yunxi (男)' },
    { value: 'zh-CN-XiaoyiNeural', label: 'Xiaoyi (女)' },
    { value: 'zh-CN-YunjianNeural', label: 'Yunjian (男)' },
    { value: 'zh-CN-XiaochenNeural', label: 'Xiaochen (女)' },
  ]

  return (
    <div className="mb-4">
      <label className="block text-text-alt text-sm font-bold mb-2">选择语音模型：</label>
      <select
        value={selectedVoice}
        onChange={(e) => onVoiceChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-md bg-background text-text"
      >
        {voices.map((voice) => (
          <option key={voice.value} value={voice.value}>
            {voice.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default VoiceModelSelector