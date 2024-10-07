import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square } from 'lucide-react';

interface AudioProgressBarProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
}

const AudioProgressBar: React.FC<AudioProgressBarProps> = ({ isPlaying, onPlayPause, onStop }) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const animate = () => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      setProgress(audioElement.currentTime / audioElement.duration);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationRef.current!);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = x / rect.width;
    setProgress(newProgress);

    const audioElement = document.querySelector('audio');
    if (audioElement) {
      audioElement.currentTime = newProgress * audioElement.duration;
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex items-center mb-2">
        <button
          onClick={onPlayPause}
          className="mr-2 p-2 rounded-full bg-primary text-primary-content hover:bg-primary-hover w-10 h-10 flex items-center justify-center"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={onStop}
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 w-10 h-10 flex items-center justify-center"
        >
          <Square size={20} />
        </button>
      </div>
      <div
        ref={progressRef}
        className="w-full h-2 bg-background-alt rounded-full cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AudioProgressBar;