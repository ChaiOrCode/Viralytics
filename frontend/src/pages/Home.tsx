import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Chat from '../components/Chatbot';
import Analytics from './Analytics';
import Leaderboard from './Leaderboard';
import Health from './Health';
import Content from './Content';

const Home: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const { isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        console.log('Home component mounted');
        return () => {
            console.log('Home component will unmount');
        };
    }, []);

    useEffect(() => {
        console.log('Auth state changed:', { isAuthenticated, isLoading });
    }, [isAuthenticated, isLoading]);

    const toggleDarkMode = () => {
        console.log('Toggling dark mode');
        setDarkMode(prevMode => !prevMode);
    };

    if (isLoading) {
        console.log('Auth is loading');
        return <div>Loading...</div>;
    }

    console.log('Rendering Home component');

    return (
        <Router>
            <div className={darkMode ? 'dark' : ''}>
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Hero darkMode={darkMode} />
                                <Chat darkMode={darkMode} />
                            </>
                        }
                    />
                    <Route
                        path="/analytics"
                        element={
                            isAuthenticated ? (
                                <Analytics darkMode={darkMode} />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/leaderboard"
                        element={
                            isAuthenticated ? (
                                <Leaderboard darkMode={darkMode} />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/health"
                        element={
                            isAuthenticated ? (
                                <Health darkMode={darkMode} />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/content"
                        element={
                            isAuthenticated ? (
                                <Content />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default Home;