import React, { useState } from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Chat from '../components/Chatbot';

const Home: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode)
    }

    return (
        <div className={darkMode ? 'dark' : ''}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Hero darkMode={darkMode} />
            <Chat darkMode={darkMode} />
        </div>
    )
}

export default Home