import React, { useEffect, useRef, useState } from "react";

interface IntersectionObserverProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
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
        rootMargin: props.rootMargin || "0px 0px -50px 0px",
        threshold: props.threshold || 0.1,
      },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [props.threshold, props.rootMargin]);

  return (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${props.className || ""}`}
      ref={elementRef}
    >
      {props.children}
    </div>
  );
}
