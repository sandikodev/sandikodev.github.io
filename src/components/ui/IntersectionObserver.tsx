import React, { useState, useEffect, useRef } from 'react';

interface IntersectionObserverProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function IntersectionObserver(props: IntersectionObserverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new globalThis.IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: props.threshold || 0.1,
        rootMargin: props.rootMargin || '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [props.threshold, props.rootMargin]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${props.className || ''}`}
    >
      {props.children}
    </div>
  );
}
