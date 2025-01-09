import { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sun, Moon, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode } : { darkMode: boolean, toggleDarkMode: () => void }) => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const notifications = [
    { id: 1, text: "Welcome back! 👋", time: "just now" },
    { id: 2, text: "Your last login was from a new device", time: "2h ago" },
    { id: 3, text: "Check out new AI features!", time: "1d ago" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (userMenuRef.current && !(userMenuRef.current as HTMLElement).contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !(notificationRef.current as HTMLElement).contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (mobileMenuRef.current && !(mobileMenuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRouteChange = () => {
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
    setShowNotifications(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 }
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  };

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.2 } }
  };

  const UserProfile = () => {
    if (!user) return null;
    const userImage = user.picture || 'https://via.placeholder.com/150';

    return (
      <motion.div className="flex items-center space-x-2" initial={false} animate={{ opacity: 1 }}>
        <img
          src={userImage}
          alt={user.name}
          className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full ring-2 ring-opacity-50 ring-offset-2 transition-all duration-300 ${darkMode ? "ring-dark-primary ring-offset-dark-background" : "ring-light-primary ring-offset-light-background"
            }`}
        />
        <span className={`font-medium hidden sm:block text-sm sm:text-base md:text-lg transition-colors duration-300 ${darkMode ? "text-dark-primary" : "text-light-tertiary"
          }`}>
          {user.name}
        </span>
      </motion.div>
    );
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? darkMode ? 'rgba(24, 76, 116, 0.85)' : 'rgba(220, 229, 237, 0.85)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
      className="fixed top-0 right-0 left-0 z-40 w-full transition-all duration-300"
    >
      <div className="px-3 mx-auto max-w-7xl sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="relative z-10 text-lg font-extrabold tracking-tight sm:text-xl md:text-2xl lg:text-3xl"
          >
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-dark-primary to-dark-secondary' : 'from-light-primary to-light-secondary'
              }`}>
              Viralytics
            </span>
          </motion.a>

          <div className="hidden items-center space-x-2 md:flex lg:space-x-4 xl:space-x-6">
            {['Analytics', 'Leaderboard', 'Health', 'Content'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                onClick={handleRouteChange}
                className={`
                  text-sm lg:text-base font-medium px-2 sm:px-3 md:px-4 py-2 rounded-lg transition-all duration-300
                  ${darkMode
                    ? "text-dark-primary hover:bg-dark-primary/10"
                    : "text-light-tertiary hover:bg-light-primary/10"
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${darkMode
                    ? "focus:ring-dark-primary focus:ring-offset-dark-background"
                    : "focus:ring-light-primary focus:ring-offset-light-background"
                  }
                `}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-1 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 ${darkMode ? 'hover:bg-dark-primary/20 text-dark-primary' : 'hover:bg-light-primary/20 text-light-tertiary'
                }`}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              )}
            </motion.button>

            {isAuthenticated ? (
              <>
                <div className="relative" ref={notificationRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-1 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 ${darkMode ? 'hover:bg-dark-primary/20 text-dark-primary' : 'hover:bg-light-primary/20 text-light-tertiary'
                      }`}
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`absolute right-0 mt-2 w-60 sm:w-64 md:w-72 rounded-xl shadow-lg border backdrop-blur-md ${darkMode
                            ? "bg-dark-background/95 border-dark-primary/20"
                            : "bg-light-background/95 border-light-primary/20"
                          }`}
                      >
                        <div className="p-2">
                          {notifications.map(notification => (
                            <motion.div
                              key={notification.id}
                              whileHover={{ scale: 1.02 }}
                              className={`flex flex-col p-2 sm:p-3 rounded-lg transition-all duration-300 ${darkMode ? "hover:bg-dark-primary/10" : "hover:bg-light-primary/10"
                                }`}
                            >
                              <span className={`text-xs sm:text-sm md:text-base font-medium ${darkMode ? "text-dark-primary" : "text-light-tertiary"
                                }`}>
                                {notification.text}
                              </span>
                              <span className={`text-xs mt-1 ${darkMode ? "text-dark-secondary" : "text-light-secondary"
                                }`}>
                                {notification.time}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center p-1 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 ${darkMode ? 'hover:bg-dark-primary/20' : 'hover:bg-light-primary/20'
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
                        className={`absolute right-0 mt-2 w-40 sm:w-44 md:w-48 rounded-xl shadow-lg border backdrop-blur-md ${darkMode
                            ? "bg-dark-background/95 border-dark-primary/20"
                            : "bg-light-background/95 border-light-primary/20"
                          }`}
                      >
                        <div className="p-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              logout();
                              handleRouteChange();
                            }}
                            className={`flex items-center w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg transition-all duration-300 ${darkMode
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
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${darkMode
                    ? "bg-dark-primary text-dark-background hover:bg-dark-secondary"
                    : "bg-light-tertiary text-light-background hover:bg-light-primary"
                  }`}
              >
                Log In
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1 sm:p-2 rounded-lg sm:rounded-xl md:hidden transition-all duration-300 ${darkMode ? 'hover:bg-dark-primary/20 text-dark-primary' : 'hover:bg-light-primary/20 text-light-tertiary'
                }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-y-0 right-0 w-48 sm:w-56 md:w-64 shadow-xl md:hidden ${darkMode
                ? "backdrop-blur-lg bg-dark-background/95"
                : "backdrop-blur-lg bg-light-background/95"
              }`}
          >
            <div className="flex flex-col p-4 mt-16 space-y-1 sm:p-6 sm:mt-20 sm:space-y-2">
              {['Analytics', 'Leaderboard', 'Health'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  onClick={handleRouteChange}
                  className={`
                    w-full text-sm sm:text-base font-medium px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300
                    ${darkMode
                      ? "text-dark-primary hover:bg-dark-primary/10"
                      : "text-light-tertiary hover:bg-light-primary/10"
                    }
                    focus:outline-none focus:ring-2
                    ${darkMode
                      ? "focus:ring-dark-primary"
                      : "focus:ring-light-primary"
                    }
                  `}
                >
                  {item}
                </Link>
              ))}

              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    logout();
                    handleRouteChange();
                  }}
                  className={`
                    w-full text-sm sm:text-base font-medium px-3 sm:px-4 py-2 sm:py-3 
                    rounded-lg transition-all duration-300 mt-4 flex items-center
                    ${darkMode
                      ? "text-dark-primary hover:bg-dark-primary/10"
                      : "text-light-tertiary hover:bg-light-primary/10"
                    }
                  `}
                >
                  <LogOut className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Logout
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;