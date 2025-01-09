import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Chat from '../components/Chatbot';
import Analytics from '../pages/Analytics';
import Leaderboard from './Leaderboard';
import Health from '../pages/Health';
import Content from './Content';

const Home: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

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
                        element={<Analytics darkMode={darkMode} />}
                    />
                    <Route
                        path="/leaderboard"
                        element={<Leaderboard darkMode={darkMode} />}
                    />
                    <Route
                        path="/health"
                        element={<Health darkMode={darkMode} />}
                    />
                    <Route
                        path="/content"
                        // @ts-ignore
                        element={<Content darkMode={darkMode} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default Home;
