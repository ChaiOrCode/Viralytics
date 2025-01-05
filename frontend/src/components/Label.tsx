import React from 'react';
import { motion } from 'framer-motion';

interface LabelProps {
  darkMode: boolean;
}

const Label: React.FC<LabelProps> = ({ darkMode }) => {
  const labelVariants = {
    initial: { 
      opacity: 0,
      y: -10,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1.2
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.4, 0.5, 0.4],
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="flex justify-center mb-8"
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={labelVariants}
    >
      <div className="inline-flex relative justify-center items-center">
        {/* Subtle glow effect */}
        <motion.div 
          className={`
            absolute -inset-3 
            ${darkMode 
              ? 'bg-dark-primary/10' 
              : 'bg-light-primary/10'
            }
            opacity-40 blur-xl
            transition-all duration-500
          `}
          variants={glowVariants}
          animate="animate"
        />
        
        {/* Main label */}
        <motion.div
          className={`
            relative 
            px-6 py-2 
            rounded-xl
            border
            ${darkMode 
              ? 'border bg-dark-primary/10 text-dark-primary border-dark-primary/20' 
              : 'border bg-light-primary/10 text-light-tertiary border-light-primary/20'
            }
            backdrop-blur-sm
            flex items-center gap-2
            font-medium
            transition-all duration-300
            shadow-lg shadow-black/5
          `}
        >
          <motion.span 
            role="img" 
            aria-label="Twitter bird"
            whileHover={{ 
              rotate: [0, -15, 15, -5, 0],
              transition: { 
                duration: 0.6,
                ease: "easeInOut"
              }
            }}
          >
            🐦  |
          </motion.span>
          <span className="font-semibold">Twitter Analytics Tool</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Label;