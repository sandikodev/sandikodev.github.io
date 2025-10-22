import React, { useState, useEffect, useRef } from 'react';

interface GlitchTypewriterProps {
  texts: string[];
  speed?: number;
  glitchSpeed?: number;
  className?: string;
}

export default function GlitchTypewriter(props: GlitchTypewriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState('');

  const speed = props.speed || 100;
  const glitchSpeed = props.glitchSpeed || 50;
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  const timeoutRef = useRef<NodeJS.Timeout>();
  const glitchIntervalRef = useRef<NodeJS.Timeout>();

  const getRandomGlitchChar = () => {
    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
  };

  const generateGlitchText = (originalText: string) => {
    let glitched = '';
    for (let i = 0; i < originalText.length; i++) {
      if (Math.random() < 0.3) {
        glitched += getRandomGlitchChar();
      } else {
        glitched += originalText[i];
      }
    }
    return glitched;
  };

  useEffect(() => {
    const type = () => {
      const targetText = props.texts[currentIndex];
      
      if (currentText.length < targetText.length) {
        setCurrentText(targetText.substring(0, currentText.length + 1));
        timeoutRef.current = setTimeout(type, speed);
      } else {
        // Start glitching
        setIsGlitching(true);
        glitchIntervalRef.current = setInterval(() => {
          setGlitchText(generateGlitchText(targetText));
        }, glitchSpeed);
        
        // Stop glitching after 2 seconds
        setTimeout(() => {
          setIsGlitching(false);
          if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
          setGlitchText('');
          
          // Move to next text
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % props.texts.length);
            setCurrentText('');
          }, 1000);
        }, 2000);
      }
    };

    type();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, [currentText, currentIndex, props.texts, speed, glitchSpeed]);

  return (
    <span className={`relative ${props.className}`}>
      <span className={isGlitching ? 'opacity-0' : 'opacity-100'}>
        {currentText}
      </span>
      {isGlitching && (
        <span className="absolute inset-0 text-red-500 opacity-100">
          {glitchText}
        </span>
      )}
      <span className="animate-pulse text-blue-400">|</span>
    </span>
  );
}
