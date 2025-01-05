import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sun, Moon, LogOut } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const notifications = [
    { id: 1, text: "Welcome back! 👋", time: "just now" },
    { id: 2, text: "Your last login was from a new device", time: "2h ago" },
    { id: 3, text: "Check out new AI features!", time: "1d ago" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const UserProfile = () => {
    if (!user) return null;

    const userImage = user.picture || 'https://via.placeholder.com/150';
    
    return (
      <motion.div 
        className="flex items-center space-x-2"
        initial={false}
        animate={{ opacity: 1 }}
      >
        <img src={userImage} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-opacity-50 ring-offset-2 ring-offset-transparent transition-all duration-300" />
        <span className={`font-medium transition-colors duration-300 ${
          darkMode ? "text-dark-primary" : "text-light-tertiary"
        }`}>
          {user.name}
        </span>
      </motion.div>
    );
  };

  return (
    <>
      <div className="w-full h-20 absolute z-0" />

      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled 
            ? darkMode ? 'rgba(24, 76, 116, 0.8)' : 'rgba(220, 229, 237, 0.8)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
        className={`
          fixed top-0 left-0 right-0 w-full z-40
          transition-all duration-300 
          ${isScrolled ? 'shadow-lg' : ''}`}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-85 bg-noise"></div>
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            darkMode 
              ? 'bg-gradient-to-r from-dark-tertiary/80 to-dark-secondary/80'
              : 'bg-gradient-to-r from-light-tertiary/80 to-light-secondary/80'
          }`}></div>
        </div>

        <div className="relative z-10 px-4 mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="relative text-3xl font-extrabold tracking-tight"
            >
              <span className={`bg-clip-text text-transparent bg-gradient-to-r 
                ${darkMode
                  ? 'bg-light-primary'
                  : 'bg-text-dim'
                }`}
              >
                Viralytics
              </span>
            </motion.a>

            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? 'hover:bg-dark-primary/20 text-dark-primary'
                    : 'hover:bg-light-primary/20 text-light-tertiary'
                }`}
              >
                {darkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </motion.button>

              {isAuthenticated ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative p-2 rounded-xl transition-all duration-300 ${
                      darkMode
                        ? 'hover:bg-dark-primary/20 text-dark-primary'
                        : 'hover:bg-light-primary/20 text-light-tertiary'
                    }`}
                  >
                    <Bell className="w-6 h-6" />
                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div
                          ref={notificationRef}
                          variants={menuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`absolute right-0 mt-4 w-72 rounded-xl shadow-lg border backdrop-blur-md ${
                            darkMode
                              ? "bg-dark-background/90 border-dark-primary/20"
                              : "bg-light-background/90 border-light-primary/20"
                          }`}
                        >
                          <div className="p-2">
                            {notifications.map(notification => (
                              <motion.div
                                key={notification.id}
                                whileHover={{ scale: 1.02 }}
                                className={`flex flex-col p-3 rounded-lg transition-all duration-300 ${
                                  darkMode
                                    ? "hover:bg-dark-primary/10"
                                    : "hover:bg-light-primary/10"
                                }`}
                              >
                                <span className={`text-sm font-medium ${
                                  darkMode ? "text-dark-primary" : "text-light-tertiary"
                                }`}>
                                  {notification.text}
                                </span>
                                <span className={`text-xs mt-1 ${
                                  darkMode ? "text-dark-secondary" : "text-light-secondary"
                                }`}>
                                  {notification.time}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <div className="relative" ref={userMenuRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={`flex items-center p-2 rounded-xl transition-all duration-300 ${
                        darkMode
                          ? 'hover:bg-dark-primary/20'
                          : 'hover:bg-light-primary/20'
                      }`}
                    >
                      <UserProfile />
                    </motion.button>
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          variants={menuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`absolute right-0 mt-4 w-48 rounded-xl shadow-lg border backdrop-blur-md ${
                            darkMode
                              ? "bg-dark-background/90 border-dark-primary/20"
                              : "bg-light-background/90 border-light-primary/20"
                          }`}
                        >
                          <div className="p-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              onClick={() => logout()}
                              className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                                darkMode
                                  ? "hover:bg-dark-primary/10 text-dark-primary"
                                  : "hover:bg-light-primary/10 text-light-tertiary"
                              }`}
                            >
                              <LogOut className="mr-2 w-4 h-4" />
                              Logout
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => loginWithRedirect()}
                  className={`px-6 py-2 font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                    darkMode
                      ? "bg-dark-primary text-dark-background hover:bg-dark-secondary"
                      : "bg-light-tertiary text-light-background hover:bg-light-primary"
                  }`}
                >
                  Log In
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;