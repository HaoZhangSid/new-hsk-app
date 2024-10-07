import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const AZURE_KEY = import.meta.env.VITE_AZURE_SPEECH_KEY;
const AZURE_REGION = import.meta.env.VITE_AZURE_REGION;

interface SynthesisResult {
  audioBlob: Blob;
  wordBoundaries: sdk.SpeechSynthesisWordBoundaryEventArgs[];
}

const checkAzureCredentials = () => {
  if (!AZURE_KEY || !AZURE_REGION) {
    throw new Error('Azure credentials are not properly set. Please check your environment variables.');
  }
};

export const synthesizeSpeech = async (
  text: string,
  voiceName: string
): Promise<SynthesisResult> => {
  console.log('Synthesizing speech for:', text, 'with voice:', voiceName);

  checkAzureCredentials();

  const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
  speechConfig.speechSynthesisVoiceName = voiceName;

  const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
  const wordBoundaries: sdk.SpeechSynthesisWordBoundaryEventArgs[] = [];

  synthesizer.wordBoundary = (s, e) => {
    console.log(`Word boundary event: text=${e.text}, audio offset=${e.audioOffset}, duration=${e.duration}`);
    wordBoundaries.push(e);
  };

  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      result => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          const audioArrayBuffer = result.audioData;
          const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/wav' });
          resolve({ audioBlob, wordBoundaries });
        } else {
          reject(new Error('Speech synthesis canceled or failed'));
        }
        synthesizer.close();
      },
      error => {
        console.error('Error synthesizing speech:', error);
        synthesizer.close();
        reject(error);
      }
    );
  });
};