import axios from 'axios'
import { pinyin } from 'pinyin-pro'

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const API_URL = 'https://api.openai.com/v1/chat/completions'

const hskVocabularyCount = {
  1: 150,
  2: 300,
  3: 600,
  4: 1200,
  5: 2500,
  6: 5000
}

const textLengthMap = {
  short: '1-2',
  medium: '3-4',
  long: '5-6'
}

export const generateChineseText = async (hskLevel: number, theme: string, length: string): Promise<{ chinese: string; pinyin: string[] }> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a Chinese language tutor specializing in HSK level ${hskLevel} content. 
            Generate a paragraph of ${textLengthMap[length as keyof typeof textLengthMap]} sentences in Chinese that is strictly appropriate for HSK level ${hskLevel}. 
            Use only vocabulary and grammar structures that are included in the HSK ${hskLevel} syllabus. 
            The text should contain approximately ${hskVocabularyCount[hskLevel as keyof typeof hskVocabularyCount]} unique characters or fewer.
            The content should be educational and related to the theme: "${theme}". 
            If no theme is provided, choose a simple, everyday topic suitable for the HSK level.
            Respond with the Chinese text only.`
          },
          {
            role: 'user',
            content: `Generate a Chinese text for HSK level ${hskLevel} about "${theme || 'daily life'}" with ${textLengthMap[length as keyof typeof textLengthMap]} sentences.`
          }
        ],
        temperature: 0.7,
        max_tokens: 250
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const chinese = response.data.choices[0].message.content.trim()
    const pinyinArray = pinyin(chinese, { toneType: 'tone', type: 'array' })

    return { chinese, pinyin: pinyinArray }
  } catch (error) {
    console.error('Error generating Chinese text:', error)
    throw new Error('Failed to generate Chinese text. Please check your API key and try again.')
  }
}

export const generateVietnameseTranslation = async (chineseText: string): Promise<string> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional translator specializing in Chinese to Vietnamese translations. Translate the given Chinese text to Vietnamese accurately and naturally.'
          },
          {
            role: 'user',
            content: `Translate the following Chinese text to Vietnamese:\n\n${chineseText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 250
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error generating Vietnamese translation:', error)
    throw new Error('Failed to generate Vietnamese translation. Please try again.')
  }
}