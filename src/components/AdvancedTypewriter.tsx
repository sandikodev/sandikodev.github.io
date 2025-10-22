import React, { useState, useEffect, useRef } from 'react';

interface AdvancedTypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursor?: boolean;
  cursorBlink?: boolean;
  randomSpeed?: boolean;
  soundEffect?: boolean;
}

export default function AdvancedTypewriter(props: AdvancedTypewriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const baseSpeed = props.speed || 100;
  const deleteSpeed = props.deleteSpeed || 50;
  const pauseTime = props.pauseTime || 2000;
  const cursor = props.cursor !== false;
  const cursorBlink = props.cursorBlink !== false;
  const randomSpeed = props.randomSpeed || false;
  const soundEffect = props.soundEffect || false;

  const timeoutRef = useRef<NodeJS.Timeout>();
  const cursorIntervalRef = useRef<NodeJS.Timeout>();

  // Generate random speed variation
  const getRandomSpeed = (base: number) => {
    if (!randomSpeed) return base;
    return base + Math.random() * 50 - 25; // ±25ms variation
  };

  // Play typing sound (optional)
  const playTypingSound = () => {
    if (soundEffect && typeof window !== 'undefined') {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  useEffect(() => {
    // Cursor blinking effect
    if (cursor && cursorBlink) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
    }

    const type = () => {
      const current = props.texts[currentIndex];
      
      if (isPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseTime);
        return;
      }

      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % props.texts.length);
        } else {
          timeoutRef.current = setTimeout(type, getRandomSpeed(deleteSpeed));
        }
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setIsPaused(true);
        } else {
          playTypingSound();
          timeoutRef.current = setTimeout(type, getRandomSpeed(baseSpeed));
        }
      }
    };

    type();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, [currentText, currentIndex, isDeleting, isPaused, props.texts, baseSpeed, deleteSpeed, pauseTime, cursor, cursorBlink, randomSpeed, soundEffect]);

  return (
    <span className={props.className}>
      {currentText}
      {cursor && (
        <span 
          className={`inline-block w-0.5 h-6 bg-current ml-1 ${
            cursorBlink ? (showCursor ? 'opacity-100' : 'opacity-0') : 'opacity-100'
          } transition-opacity duration-100`}
        />
      )}
    </span>
  );
}
