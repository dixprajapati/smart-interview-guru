
import { useEffect, useState } from 'react';

// Fade in animation hook
export function useFadeIn(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 500ms ease, transform 500ms ease',
    transitionDelay: `${delay}ms`,
  };
}

// Staggered animation for lists
export function useStaggeredAnimation(items: any[], baseDelay = 100) {
  return items.map((item, index) => ({
    ...item,
    style: useFadeIn(baseDelay * index)
  }));
}

// Page transition animation
export function usePageTransition() {
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: isAnimating ? 0 : 1, y: isAnimating ? 20 : 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };
}

// Pulse animation for attention-grabbing elements
export function usePulse(duration = 2000) {
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, duration);
    
    return () => clearInterval(interval);
  }, [duration]);
  
  return {
    opacity: isPulsing ? 0.7 : 1,
    transform: isPulsing ? 'scale(0.98)' : 'scale(1)',
    transition: 'opacity 1s ease, transform 1s ease',
  };
}

// Value counter animation
export function useCountAnimation(targetValue: number, duration = 2000) {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCurrentValue(Math.floor(progress * targetValue));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };
    
    animationFrame = requestAnimationFrame(updateValue);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration]);
  
  return currentValue;
}
