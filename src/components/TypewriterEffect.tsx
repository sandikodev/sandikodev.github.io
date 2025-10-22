import React, { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursor?: boolean;
  cursorBlink?: boolean;
}

export default function TypewriterEffect(props: TypewriterEffectProps) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const speed = props.speed || 100;
  const deleteSpeed = props.deleteSpeed || 50;
  const pauseTime = props.pauseTime || 2000;
  const cursor = props.cursor !== false;
  const cursorBlink = props.cursorBlink !== false;

  const timeoutRef = useRef<NodeJS.Timeout>();
  const cursorIntervalRef = useRef<NodeJS.Timeout>();

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
          timeoutRef.current = setTimeout(type, deleteSpeed);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setIsPaused(true);
        } else {
          timeoutRef.current = setTimeout(type, speed);
        }
      }
    };

    type();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, [currentText, currentIndex, isDeleting, isPaused, props.texts, speed, deleteSpeed, pauseTime, cursor, cursorBlink]);

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
