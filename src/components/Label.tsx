import { motion } from 'framer-motion';

const ViralyticsLabel = ({ darkMode = false }) => {
  const theme = {
    background: darkMode 
      ? 'bg-gradient-to-r from-secondary-800/30 to-secondary-700/30'
      : 'bg-gradient-to-r from-primary-100/60 to-primary-200/50',
    text: darkMode
      ? 'text-text-dark-primary'
      : 'text-text-light-primary',
    border: darkMode
      ? 'border-secondary-700/30'
      : 'border-primary-300/50',
    highlight: darkMode
      ? 'bg-gradient-to-r from-secondary-700/20 to-secondary-600/20'
      : 'bg-gradient-to-r from-primary-200/40 to-primary-300/30',
    shadow: darkMode
      ? 'shadow-ambient-dark'
      : 'shadow-ambient'
  };

  const labelVariants = {
    initial: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 1
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
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
        <motion.div 
          className={`absolute -inset-2 bg-gradient-to-r opacity-50 blur-xl from-primary-300/20 via-primary-400/20 to-skyblue-300/20`}
        />
        
        <motion.div
          className={`absolute inset-0 rounded-full ${theme.highlight}`}
          variants={pulseVariants}
          animate="animate"
        />
        
        <motion.div
          className={`
            relative px-6 py-2 rounded-full
            border ${theme.border}
            ${theme.background}
            backdrop-blur-sm
            flex items-center gap-2
            font-medium
            ${theme.text}
            shadow-lg ${theme.shadow}
            hover:bg-gradient-to-r hover:from-primary-400/15 hover:to-skyblue-400/15
            transition-all duration-300
          `}
        >
          <span>🐦 | Twitter Analytics Tool</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViralyticsLabel;