import React, { useState, useEffect, useRef } from 'react';

interface MatrixTypewriterProps {
  texts: string[];
  speed?: number;
  className?: string;
  matrixChars?: string;
}

export default function MatrixTypewriter(props: MatrixTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const speed = props.speed || 50;
  const matrixChars = props.matrixChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  const timeoutRef = useRef<NodeJS.Timeout>();

  const getRandomChar = () => {
    return matrixChars[Math.floor(Math.random() * matrixChars.length)];
  };

  useEffect(() => {
    const animate = () => {
      const targetText = props.texts[currentIndex];
      const currentDisplay = displayText;
      
      if (currentDisplay.length < targetText.length) {
        // Still building the text
        const newChar = getRandomChar();
        setDisplayText(currentDisplay + newChar);
        timeoutRef.current = setTimeout(animate, speed);
      } else if (currentDisplay === targetText) {
        // Text is complete, move to next
        setIsComplete(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % props.texts.length);
          setDisplayText('');
          setIsComplete(false);
        }, 2000);
      } else {
        // Replace random characters until we get the target
        let newDisplay = '';
        for (let i = 0; i < targetText.length; i++) {
          if (i < currentDisplay.length && currentDisplay[i] === targetText[i]) {
            newDisplay += targetText[i];
          } else {
            newDisplay += getRandomChar();
          }
        }
        setDisplayText(newDisplay);
        timeoutRef.current = setTimeout(animate, speed);
      }
    };

    animate();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, currentIndex, props.texts, speed]);

  return (
    <span className={`font-mono ${props.className}`}>
      {displayText}
      <span className="animate-pulse text-green-400">█</span>
    </span>
  );
}
