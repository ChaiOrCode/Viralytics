import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Brain, ArrowRight, Download, TrendingUp, Heart, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import Label from './Label';
import QuantumButton from './Button';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('Hero component mounted');
    setIsVisible(true);
    return () => {
      console.log('Hero component will unmount');
    };
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const stats = [
    { 
      id: 1, 
      label: "AI-Powered Analytics", 
      value: "Smart Insights", 
      icon: Brain,
      gradient: darkMode ? 
        "from-dark-primary/20 to-dark-secondary/20" : 
        "from-light-primary/20 to-light-secondary/20"
    },
    { 
      id: 2, 
      label: "Real-time Engagement", 
      value: "Live Tracking", 
      icon: TrendingUp,
      gradient: darkMode ? 
        "from-dark-secondary/20 to-dark-tertiary/20" : 
        "from-light-secondary/20 to-light-tertiary/20"
    },
    { 
      id: 3, 
      label: "Sentiment Analysis", 
      value: "Analyze Better", 
      icon: Heart,
      gradient: darkMode ? 
        "from-dark-tertiary/20 to-dark-primary/20" : 
        "from-light-tertiary/20 to-light-primary/20"
    },
    { 
      id: 4, 
      label: "Optimal Post Timing", 
      value: "Maximize Reach", 
      icon: Clock,
      gradient: darkMode ? 
        "from-dark-primary/20 to-dark-tertiary/20" : 
        "from-light-primary/20 to-light-tertiary/20"
    },
  ];

  const launchConfetti = () => {
    console.log('Launching confetti');
    const colors = darkMode 
      ? ['#C8D5E2', '#6989A3', '#184C74']
      : ['#8AA3B8', '#DCE5ED', '#1A5885'];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      ticks: 200,
    });
  };

  const handleLogin = () => {
    console.log('Initiating login from Hero');
    loginWithRedirect();
  };

  console.log('Rendering Hero component, isAuthenticated:', isAuthenticated);

  return (
    <section className={`relative min-h-screen pt-20 pb-20 md:pt-32 md:pb-40 overflow-hidden ${
      darkMode ? 'bg-dark-background' : 'bg-light-background'
    }`}>
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-85 bg-noise" />

      {/* Gradient background */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-dark-tertiary/90 via-dark-background to-dark-secondary/90'
          : 'bg-gradient-to-br from-light-tertiary/90 via-light-background to-light-secondary/90'
      }`} />

      {/* Floating elements */}
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full filter blur-3xl animate-pulse"style={{
            background: darkMode 
              ? 'radial-gradient(circle, rgba(24,76,116,0.3) 0%, rgba(24,76,116,0) 70%)'
              : 'radial-gradient(circle, rgba(26,88,133,0.3) 0%, rgba(26,88,133,0) 70%)',
            animation: 'pulse 8s infinite'
          }}
        />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full filter blur-3xl animate-pulse"
          style={{
            background: darkMode 
              ? 'radial-gradient(circle, rgba(105,137,163,0.3) 0%, rgba(105,137,163,0) 70%)'
              : 'radial-gradient(circle, rgba(138,163,184,0.3) 0%, rgba(138,163,184,0) 70%)',
            animation: 'pulse 12s infinite'
          }}
        />
      </div>

      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        {/* Beta Label */}
        <Label darkMode={darkMode} />
        
        <motion.h1
          variants={heroVariants}
          className={`text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 md:mb-8 ${
            darkMode ? 'text-dark-primary' : 'text-light-tertiary'
          }`}
        >
          Supercharge Your{' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${
              darkMode
                ? 'from-dark-primary via-dark-secondary to-dark-tertiary'
                : 'from-light-primary to-light-tertiary'
            }`}
          >
            Twitter Growth
          </motion.span>
          <br />with{' '}
          <span className="inline-block relative">
            <span className="relative z-10">Viralytics</span>
            <span className={`absolute -inset-1 block -skew-y-3 ${
              darkMode ? 'bg-light-secondary' : 'bg-light-tertiary'
            } opacity-30`}></span>
          </span>
        </motion.h1>

        <motion.p
          variants={heroVariants}
          className={`text-center text-lg md:text-xl max-w-3xl mx-auto mb-8 md:mb-12 ${
            darkMode ? 'text-dark-secondary' : 'text-light-primary'
          }`}
        >
          Transform your Twitter strategy with AI-powered analytics. Track engagement, 
          analyze sentiment, and post at the perfect time.
        </motion.p>

        <motion.div
          variants={heroVariants}
          className="flex flex-col gap-4 justify-center items-center mb-12 md:mb-20 sm:flex-row"
        >
          {!isAuthenticated ? (
            <QuantumButton darkMode={darkMode} onClick={handleLogin}>
              Get Started
            </QuantumButton>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-6 py-3 md:px-8 md:py-4 font-semibold rounded-xl shadow-lg 
                  transition-all duration-300 ${
                  darkMode
                    ? 'bg-dark-primary text-dark-background hover:bg-dark-secondary hover:shadow-dark-primary/25'
                    : 'bg-light-tertiary text-light-background hover:bg-light-primary hover:shadow-light-primary/25'
                }`}
              >
                Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={launchConfetti}
                className={`flex items-center px-6 py-3 md:px-8 md:py-4 font-semibold rounded-xl shadow-lg 
                  transition-all duration-300 ${
                  darkMode
                    ? 'bg-dark-secondary/80 text-dark-primary hover:bg-dark-secondary hover:shadow-dark-secondary/25'
                    : 'bg-light-secondary/80 text-light-tertiary hover:bg-light-secondary hover:shadow-light-secondary/25'
                }`}
              >
                <Download className="mr-2 w-5 h-5" />
                Download Extension
              </motion.button>
            </>
          )}
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className={`
                  p-4 md:p-6 rounded-2xl border backdrop-blur-sm
                  bg-gradient-to-br ${stat.gradient}
                  ${darkMode
                    ? 'border-dark-primary/10 hover:border-dark-primary/20'
                    : 'border-light-primary/10 hover:border-light-primary/20'
                  }
                  transition-all duration-300
                  hover:shadow-lg
                `}
              >
                <div className="flex flex-col gap-3 items-center md:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`
                      w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center
                      ${darkMode 
                        ? 'bg-dark-primary/20' 
                        : 'bg-light-primary/20'}
                    `}
                  >
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${
                      darkMode ? 'text-dark-primary' : 'text-light-tertiary'
                    }`} />
                  </motion.div>

                  <div className="text-center">
                    <h3 className={`text-lg md:text-xl font-bold mb-1 ${
                      darkMode ? 'text-dark-primary' : 'text-light-tertiary'
                    }`}>
                      {stat.value}
                    </h3>
                    <p className={`text-xs md:text-sm ${
                      darkMode ? 'text-dark-secondary' : 'text-light-primary'
                    }`}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;