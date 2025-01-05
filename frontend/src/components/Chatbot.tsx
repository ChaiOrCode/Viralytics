import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import axios, { AxiosError } from 'axios';
import { aiPrompt } from '../ai/aiPrompt';
import { Bell, X, Minimize2, Maximize2, Send, MessageSquare } from 'lucide-react';

const API_KEY = import.meta.env.GEMINI_API_KEY as string;
const API_URL = import.meta.env.GEMINI_API_URL as string;

type ButtonVariant = 'default' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  darkMode: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'default',
  darkMode,
  children,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-full";
  const variants: Record<ButtonVariant, string> = {
    default: darkMode
      ? "bg-dark-primary hover:bg-dark-secondary text-dark-background hover:shadow-dark-primary/25"
      : "bg-light-tertiary hover:bg-light-primary text-light-background hover:shadow-light-primary/25",
    ghost: darkMode
      ? "text-dark-primary hover:bg-dark-background/50"
      : "text-light-tertiary hover:bg-light-background/50",
  };
  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 py-1 text-xs",
    lg: "h-12 px-6 py-3",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { darkMode: boolean }> = ({ className = '', darkMode, ...props }) => {
  return (
    <input
      className={`flex px-3 py-2 w-full h-10 text-sm rounded-full border backdrop-blur-sm sm:h-12 sm:px-4 placeholder:text-text-dim focus:outline-none focus:ring-2 focus:border-transparent ${darkMode
          ? 'bg-dark-background/80 border-dark-primary focus:ring-dark-primary text-dark-primary'
          : 'bg-light-background/80 border-light-tertiary focus:ring-light-tertiary text-light-tertiary'
        } ${className}`}
      {...props}
    />
  );
};

const ThinkingIndicator: React.FC<{ darkMode: boolean }> = ({ darkMode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="flex justify-start"
  >
    <div className={`${darkMode
        ? 'bg-gradient-to-r from-dark-primary to-dark-tertiary'
        : 'bg-gradient-to-r from-light-primary to-light-tertiary'
      } p-2 sm:p-3 rounded-2xl max-w-[70%]`}>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="flex items-center text-sm font-medium text-white sm:text-base"
      >
        <Bell className="mr-2 w-4 h-4 animate-pulse" />
        Thinking...
      </motion.div>
    </div>
  </motion.div>
);

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

interface TwitterAnalyticsChatbotProps {
  darkMode: boolean;
}

const TwitterAnalyticsChatbot: React.FC<TwitterAnalyticsChatbotProps> = ({ darkMode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedQuestions: string[] = [
    "Best posting time",
    "Engagement metrics",
    "Content strategy",
    "Audience insights",
    "Trend analysis",
    "Performance stats",
  ];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');

    try {
      console.log('Sending request to API...');
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `${aiPrompt}\n\nUser query: ${input}`
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('API response received:', response.data);

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error('Error fetching response from API:', error);
      if (error instanceof AxiosError) {
        console.error('Axios error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      }
      const errorMessage = error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : 'An unexpected error occurred';
      setMessages(prev => [...prev, { text: `I apologize, there was an error analyzing your request: ${errorMessage}. Please try again later.`, sender: 'ai' }]);
    }

    setIsLoading(false);
  }, [input]);

  const handleClearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const containerVariants: Variants = {
    open: (isExpanded) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      width: isExpanded ? '90vw' : '90vw',
      height: isExpanded ? '90vh' : '80vh',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }),
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            custom={isExpanded}
            className={`flex flex-col overflow-hidden shadow-2xl rounded-3xl max-w-[550px] w-full mx-auto backdrop-blur-sm ${darkMode ? 'bg-dark-background/95' : 'bg-light-background/95'
              }`}
            style={{
              boxShadow: darkMode
                ? '0 10px 25px -5px rgba(24,76,116,0.5), 0 8px 10px -6px rgba(24,76,116,0.3)'
                : '0 10px 25px -5px rgba(26,88,133,0.5), 0 8px 10px -6px rgba(26,88,133,0.3)',
            }}
          >
            <motion.div
              className={`flex justify-between items-center p-4 text-white rounded-t-3xl cursor-move sm:p-6 ${darkMode
                  ? 'bg-gradient-to-r from-dark-primary to-dark-tertiary'
                  : 'bg-gradient-to-r from-light-primary to-light-tertiary'
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`flex justify-center items-center w-10 h-10 text-base font-bold rounded-full shadow-inner sm:w-12 sm:h-12 sm:text-lg backdrop-blur-sm ${darkMode
                    ? 'bg-dark-background/80 text-dark-primary'
                    : 'bg-light-background/80 text-light-tertiary'
                  }`}>
                  AI
                </div>
                <div>
                  <h3 className="text-sm font-semibold sm:text-md">Viralytics AI</h3>
                  <p className="text-xs opacity-90 sm:text-sm">Your social media optimizer</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button darkMode={darkMode} variant="ghost" size="sm" onClick={handleClearChat} className="text-white hover:text-dark-primary">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button darkMode={darkMode} variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-white hover:text-dark-primary">
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </Button>
                <Button darkMode={darkMode} variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:text-dark-primary">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </motion.div>

            <div className="overflow-hidden relative flex-1">
              <div className="absolute inset-0 bg-noise opacity-85" />
              <div className={`absolute inset-0 ${darkMode
                  ? 'bg-gradient-to-br from-dark-tertiary/90 via-dark-background to-dark-secondary/90'
                  : 'bg-gradient-to-br from-light-tertiary/90 via-light-background to-light-secondary/90'
                }`} />
              <div className="overflow-y-auto relative p-4 space-y-4 h-full sm:p-6">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 sm:p-4 rounded-2xl backdrop-blur-sm shadow-lg ${message.sender === 'user'
                            ? darkMode
                              ? 'bg-gradient-to-br from-dark-primary to-dark-secondary text-dark-background'
                              : 'bg-gradient-to-br from-light-primary to-light-secondary text-light-background'
                            : darkMode
                              ? 'bg-dark-background/80 text-dark-primary border border-dark-secondary/20'
                              : 'bg-light-background/80 text-light-tertiary border border-light-secondary/20'
                          }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && <ThinkingIndicator darkMode={darkMode} />}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className={`relative p-4 sm:p-6 ${darkMode
                ? 'bg-gradient-to-t to-transparent from-dark-background via-dark-background'
                : 'bg-gradient-to-t to-transparent from-light-background via-light-background'
              }`}>
              <div className="flex mb-4 space-x-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about your Twitter analytics..."
                  className="flex-grow shadow-lg"
                  darkMode={darkMode}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className={`shadow-lg transition-all duration-300 ${darkMode
                      ? 'bg-gradient-to-r from-dark-primary to-dark-secondary hover:from-dark-secondary hover:to-dark-primary'
                      : 'bg-gradient-to-r from-light-primary to-light-secondary hover:from-light-secondary hover:to-light-primary'
                    }`}
                  darkMode={darkMode}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => setInput(question)}
                    className={`text-xs rounded-full border transition-all duration-300 backdrop-blur-sm ${darkMode
                        ? 'border-dark-primary/20 hover:bg-dark-background/50 hover:border-dark-primary'
                        : 'border-light-primary/20 hover:bg-light-background/50 hover:border-light-primary'
                      }`}
                    darkMode={darkMode}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className={`p-3 text-white rounded-full shadow-lg transition-all duration-300 sm:p-4 ${darkMode
              ? 'bg-gradient-to-r transition-colors duration-500 ease-in-out from-dark-primary to-dark-tertiary hover:from-dark-tertiary hover:to-dark-primary'
              : 'bg-gradient-to-r transition-colors duration-500 ease-in-out from-light-primary to-light-tertiary hover:from-light-tertiary hover:to-light-primary'
            } hover:shadow-xl`}
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}
    </div>
  );
};

export default TwitterAnalyticsChatbot;