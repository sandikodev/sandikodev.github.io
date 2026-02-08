import React, { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Calculate offset for fixed header
            const headerHeight = 80;
            const elementPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    // Handle URL hash on page load
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = 80;
          const elementPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Wait for DOM to be ready
    const checkAndScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = 80;
          const elementPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        } else {
          // If element not found, try again after a short delay
          setTimeout(checkAndScroll, 100);
        }
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashScroll);
    document.addEventListener('click', handleClick);
    
    // Initial check
    setTimeout(checkAndScroll, 100);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}

