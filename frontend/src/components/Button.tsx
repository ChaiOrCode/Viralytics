import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface QuantumButtonProps {
  darkMode?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

interface Particle extends HTMLDivElement {
  animate: (keyframes: Keyframe[], options: KeyframeAnimationOptions) => Animation;
}

const QuantumButton: React.FC<QuantumButtonProps> = ({ 
  darkMode = false, 
  onClick,
  children = 'Get Started'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isHovered || !buttonRef.current) return;

    const button = buttonRef.current;
    const particles: Particle[] = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div') as Particle;
      particle.className = 'absolute w-2 h-2 rounded-full';
      particle.style.background = darkMode 
        ? `hsl(${Math.random() * 360}, 80%, 70%)`
        : `hsl(${Math.random() * 360}, 90%, 60%)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      button.appendChild(particle);
      particles.push(particle);

      animateParticle(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [isHovered, darkMode]);

  const animateParticle = (particle: Particle) => {
    const duration = 2000 + Math.random() * 2000;
    const x1 = Math.random() * 100;
    const y1 = Math.random() * 100;
    const x2 = Math.random() * 100;
    const y2 = Math.random() * 100;

    particle.animate([
      { transform: 'scale(0)', opacity: '0' },
      { transform: 'scale(1)', opacity: '1', offset: 0.2 },
      { transform: 'scale(1)', opacity: '1', offset: 0.8 },
      { transform: 'scale(0)', opacity: '0' }
    ], {
      duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      iterations: Infinity
    });

    particle.animate([
      { left: `${particle.offsetLeft}px`, top: `${particle.offsetTop}px` },
      { left: `${x1}%`, top: `${y1}%` },
      { left: `${x2}%`, top: `${y2}%` },
      { left: `${particle.offsetLeft}px`, top: `${particle.offsetTop}px` }
    ], {
      duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      iterations: Infinity
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative flex items-center 
        px-6 py-3 md:px-8 md:py-4 
        font-semibold rounded-xl
        overflow-hidden
        transition-all duration-300
        ${
          darkMode
            ? 'bg-dark-primary text-dark-background hover:bg-dark-secondary hover:shadow-dark-primary/25'
            : 'bg-light-tertiary text-light-background hover:bg-light-primary hover:shadow-light-primary/25'
        }
      `}
    >
      <span className="flex relative z-10 items-center">
        {children} <ArrowRight className="ml-2 w-5 h-5" />
      </span>
      <div 
        className={`
          absolute inset-0 
          transition-opacity duration-300 
          opacity-0 group-hover:opacity-100
          ${darkMode ? 'bg-dark-secondary' : 'bg-light-primary'}
        `}
      />
    </motion.button>
  );
};

export default QuantumButton;