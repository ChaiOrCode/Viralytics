import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Brain, ArrowRight, Download, TrendingUp, Heart, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import Label from './Label';

interface HeroProps {
    darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [_containerWidth, setContainerWidth] = useState<number>(0);
    const [_cardWidth, setCardWidth] = useState<number>(0);

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
        },
        {
            id: 2,
            label: "Real-time Engagement",
            value: "Live Tracking",
            icon: TrendingUp,
        },
        {
            id: 3,
            label: "Sentiment Analysis",
            value: "Deep Understanding",
            icon: Heart,
        },
        {
            id: 4,
            label: "Optimal Post Timing",
            value: "Maximize Reach",
            icon: Clock,
        },
    ];

    const launchConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0ea5e9', '#0284c7', '#0369a1'],
        });
    };

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setContainerWidth(width);
                setCardWidth(width / 4 - 24);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <section className={`relative pt-24 pb-32 overflow-hidden ${darkMode
            ? 'bg-gradient-to-br from-secondary-950 via-secondary-900/90 to-secondary-800/80'
            : 'bg-gradient-to-br from-skyblue-50 via-skyblue-100/95 to-skyblue-200/90'
        } bg-grain`}>
            <div className="absolute inset-0 opacity-60 bg-ambient" />

            <motion.div
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 mx-auto max-w-4xl text-center"
            >
                <Label darkMode={darkMode} />

                <motion.h1
                    variants={heroVariants}
                    className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${darkMode ? 'text-text-dark-primary' : 'text-slate-800'}`}
                >
                    Supercharge Your Twitter Growth with{' '}
                    <motion.span
                        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                        animate={{
                            backgroundColor: darkMode
                                ? 'rgba(188, 204, 220, 0.15)'
                                : 'rgba(51, 65, 85, 0.08)',
                        }}
                        transition={{ duration: 0.5 }}
                        className={`inline-block relative px-2 rounded-md`}
                    >
                        Viralytics
                    </motion.span>
                </motion.h1>

                <motion.p
                    variants={heroVariants}
                    className={`mt-6 text-xl max-w-3xl mx-auto ${darkMode ? 'text-text-dark-secondary' : 'text-slate-600'}`}
                >
                    Transform your Twitter strategy with AI-powered analytics. Track engagement, analyze sentiment, and post at the perfect time.
                </motion.p>

                <motion.div
                    variants={heroVariants}
                    className="flex flex-col gap-4 justify-center mt-10 sm:flex-row"
                >
                    {!isAuthenticated ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => loginWithRedirect()}
                            className="flex overflow-hidden relative justify-center items-center px-8 py-3 font-semibold text-white bg-gradient-to-r rounded-xl transition-all duration-300 from-skyblue-500 to-skyblue-600 hover:from-skyblue-600 hover:to-skyblue-700 shadow-ambient hover:shadow-ambient-lg"
                        >
                            Get Started <ArrowRight className="ml-2 w-5 h-5" />
                        </motion.button>
                    ) : (
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex justify-center items-center px-8 py-3 font-semibold text-white bg-gradient-to-r rounded-xl transition-all duration-300 from-skyblue-500 to-skyblue-600 hover:from-skyblue-600 hover:to-skyblue-700 shadow-ambient hover:shadow-ambient-lg"
                            >
                                Get Started <ArrowRight className="ml-2 w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={launchConfetti}
                                className="flex justify-center items-center px-8 py-3 font-semibold bg-gradient-to-r rounded-xl transition-all duration-300 from-secondary-100 to-secondary-200 hover:from-secondary-200 hover:to-secondary-300 shadow-ambient hover:shadow-ambient-lg"
                            >
                                <Download className="mr-2 w-5 h-5" />
                                Download Extension
                            </motion.button>
                        </div>
                    )}
                </motion.div>

                <div ref={containerRef} className="relative mx-auto mt-20 max-w-6xl">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                                        boxShadow: darkMode
                                            ? '0 8px 32px -4px rgba(31, 38, 54, 0.32)'
                                            : '0 8px 32px -4px rgba(31, 38, 54, 0.24)'
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`
                                        p-6 rounded-2xl
                                        ${darkMode
                                            ? 'bg-secondary-900/50 border-secondary-800/40'
                                            : 'bg-skyblue-100/40 border-skyblue-200/60'}
                                        border
                                        backdrop-blur-sm
                                        transition-all duration-300
                                        hover:shadow-ambient-lg
                                        group
                                    `}
                                >
                                    <div className="flex flex-col gap-4 items-center">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className={`
                                                w-12 h-12 rounded-full
                                                flex items-center justify-center
                                                ${darkMode ? 'bg-skyblue-800/60' : 'bg-skyblue-200'}
                                                backdrop-blur-sm
                                            `}
                                        >
                                            <Icon className={`w-6 h-6 ${darkMode ? 'text-skyblue-200' : 'text-skyblue-700'}`} />
                                        </motion.div>

                                        <div>
                                            <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-text-dark-primary' : 'text-slate-800'}`}>
                                                {stat.value}
                                            </h3>
                                            <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-slate-600'}`}>
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;