import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Chat from '../components/Chatbot'

const Home: React.FC = () => {
    return (
        <div>
            <Navbar darkMode={true} toggleDarkMode={() => {}} />
            <Hero darkMode={true} />
            <Chat />
        </div>
    )
}

export default Home