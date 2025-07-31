'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Pause, Volume2, Zap, Shield, Clock, Users, TrendingUp, Smartphone, Monitor, CheckCircle, XCircle, ArrowRight, Star, Globe, Sparkles, MousePointer2, Timer, AlertTriangle, GraduationCap, Layers3, Sparkle, User, MessageSquare, Mail, Building, Send } from 'lucide-react';

interface DemoCommand {
  command: string;
  processing: string;
  response: string;
  visual: string;
}

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [demoStep, setDemoStep] = useState(0); // 0: idle, 1: command, 2: processing, 3: response, 4: visual
  const [currentDemo, setCurrentDemo] = useState<DemoCommand | null>(null);
  const [demoCommands] = useState<DemoCommand[]>([
    {
      command: "This week's occupancy is low, analyze revenue and apply optimized pricing",
      processing: "Analyzing occupancy data for Fri-Sun...",
      response: "Occupancy for Fri–Sun is under 30%. Applying smart pricing: ₩148,000 → ₩132,000.",
      visual: "pricing"
    },
    {
      command: "Block room 301 for maintenance",
      processing: "Checking room availability...",
      response: "Room 301 blocked for maintenance. Status updated in calendar.",
      visual: "calendar"
    },

    {
      command: "Summarize this week's reviews",
      processing: "Analyzing customer feedback...",
      response: "Average 4.8/5 stars. Top mentions: cleanliness, location, staff friendliness.",
      visual: "reviews"
    },
    {
      command: "Schedule cleaning for room 203 at 10:00 AM",
      processing: "Coordinating with housekeeping...",
      response: "Room 203 cleaning scheduled for 10:00 AM tomorrow. Team notified.",
      visual: "cleaning"
    }
  ]);

  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Contact form handlers
  const handleContactChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setContactForm({ name: '', email: '', company: '', message: '' });
    }, 5000);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  useEffect(() => {
    // Auto-rotation only when not actively using the demo
    if (!isListening && demoStep === 0) {
      const interval = setInterval(() => {
        setCurrentDemoIndex((prev) => (prev + 1) % demoCommands.length);
      }, 8000); // Slower rotation for better UX
      return () => clearInterval(interval);
    }
  }, [demoCommands.length, isListening, demoStep]);

  const startDemo = (demoIndex?: number) => {
    const targetIndex = demoIndex !== undefined ? demoIndex : currentDemoIndex;
    setIsListening(true);
    setCurrentDemo(demoCommands[targetIndex]);
    setDemoStep(1); // Start with command
    
    // Extended timing for better user comprehension
    setTimeout(() => setDemoStep(2), 2000); // Command display: 2 seconds
    setTimeout(() => setDemoStep(3), 4500); // Processing: 2.5 seconds  
    setTimeout(() => setDemoStep(4), 7000); // Response: 2.5 seconds
    setTimeout(() => {
      setIsListening(false);
      // Keep demoStep at 4 and currentDemo to maintain PMS interface
      // Only reset when user clicks "Try another example"
    }, 9500); // Stop recording but keep visual result visible
  };

  const toggleListening = () => {
    if (!isListening && demoStep === 0) {
      startDemo();
    } else if (isListening) {
      // If currently recording, stop the demo
      setIsListening(false);
      setDemoStep(0);
      setCurrentDemo(null);
    } else if (demoStep === 4) {
      // If at step 4 (visual result), restart the same demo
      startDemo(currentDemoIndex);
    }
  };

  const tryAnotherExample = () => {
    const nextIndex = (currentDemoIndex + 1) % demoCommands.length;
    setCurrentDemoIndex(nextIndex);
    
    // Reset current demo state and start new one
    setDemoStep(0);
    setCurrentDemo(null);
    setIsListening(false);
    
    // Start new demo after brief transition
    setTimeout(() => {
      startDemo(nextIndex);
    }, 200);
  };

  const selectDemo = (index: number) => {
    if (index !== currentDemoIndex) {
      setCurrentDemoIndex(index);
      
      // Reset current demo state and start selected one
      setDemoStep(0);
      setCurrentDemo(null);
      setIsListening(false);
      
      // Start selected demo after brief transition
      setTimeout(() => {
        startDemo(index);
      }, 200);
    }
  };



  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/30 to-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-slate-800/10 to-black" />
      
      {/* Subtle Aurora Accent Points */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(34,197,94,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.12),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(168,85,247,0.1),transparent_60%)]" />
      
      {/* Gentle Aurora Shimmer - Very Subtle */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent animate-pulse" style={{animationDelay: '0s', animationDuration: '8s'}} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-blue-400/4 to-transparent animate-pulse" style={{animationDelay: '4s', animationDuration: '10s'}} />
      </div>
      
      {/* Space Stars */}
      <div className="absolute inset-0">
        {/* Large stars */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}} />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-200 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/5 right-1/3 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse" style={{animationDelay: '3s'}} />
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-pink-200 rounded-full animate-pulse" style={{animationDelay: '4s'}} />
        
        {/* Medium stars */}
        <div className="absolute top-2/5 left-1/5 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
        <div className="absolute top-3/5 right-2/5 w-0.5 h-0.5 bg-blue-100/70 rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
        <div className="absolute bottom-2/5 left-2/5 w-0.5 h-0.5 bg-purple-100/60 rounded-full animate-pulse" style={{animationDelay: '2.5s'}} />
        <div className="absolute top-1/6 left-3/5 w-0.5 h-0.5 bg-indigo-100/70 rounded-full animate-pulse" style={{animationDelay: '3.5s'}} />
        
        {/* Small stars */}
        <div className="absolute top-1/2 left-1/6 w-px h-px bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
        <div className="absolute top-3/4 right-1/6 w-px h-px bg-blue-100/50 rounded-full animate-pulse" style={{animationDelay: '1.2s'}} />
        <div className="absolute bottom-1/6 left-1/2 w-px h-px bg-purple-100/40 rounded-full animate-pulse" style={{animationDelay: '2.2s'}} />
        <div className="absolute top-1/8 right-1/2 w-px h-px bg-white/50 rounded-full animate-pulse" style={{animationDelay: '3.2s'}} />
        <div className="absolute bottom-1/2 right-3/4 w-px h-px bg-indigo-100/40 rounded-full animate-pulse" style={{animationDelay: '4.2s'}} />
        <div className="absolute top-5/6 left-3/4 w-px h-px bg-pink-100/30 rounded-full animate-pulse" style={{animationDelay: '5s'}} />
      </div>
      
      {/* Subtle Aurora Accent Streams - Minimal */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/8 w-8 h-16 bg-gradient-to-b from-emerald-400/20 to-transparent rounded-full blur-xl transform rotate-12" />
        <div className="absolute bottom-1/3 right-1/8 w-10 h-20 bg-gradient-to-t from-blue-400/15 to-transparent rounded-full blur-2xl transform -rotate-12" />
        <div className="absolute top-2/3 left-3/4 w-6 h-12 bg-gradient-to-br from-purple-400/18 to-transparent rounded-full blur-lg transform rotate-45" />
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-3xl bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">VoiceHotel</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors font-medium">Features</a>
              <a href="#comparison" className="text-white/80 hover:text-white transition-colors font-medium">Comparison</a>
              <button onClick={scrollToHero} className="text-white/80 hover:text-white transition-colors font-medium">Demo</button>
              <button onClick={scrollToContact} className="text-white/80 hover:text-white transition-colors font-medium">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Operate without screens
              <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Just speak
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              The future of hospitality starts with your voice
            </motion.p>

            {/* Enhanced Interactive Voice Demo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-5xl mx-auto mb-12"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Voice Command Interface */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-purple-500/10">
                  <div className="flex items-center justify-center mb-6">
                                            <button
                          onClick={toggleListening}
                          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                            isListening 
                              ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 shadow-red-500/50 animate-pulse' 
                              : demoStep === 4
                              ? 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 hover:scale-110'
                              : 'bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 hover:scale-110'
                          }`}
                        >
                          {isListening ? (
                            <MicOff className="w-8 h-8 text-white" />
                          ) : demoStep === 4 ? (
                            <Play className="w-8 h-8 text-white" />
                          ) : (
                            <Mic className="w-8 h-8 text-white" />
                          )}
                        </button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {demoStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <p className="text-white/60 text-base mb-4">Click to experience interactive demo</p>
                        <div className="text-xs text-white/40 mb-4">
                          Current demo: "{demoCommands[currentDemoIndex].command.substring(0, 30)}..."
                        </div>
                        
                        {/* Demo Indicators - Clickable */}
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          {demoCommands.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => selectDemo(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                                index === currentDemoIndex 
                                  ? 'bg-purple-400 scale-125' 
                                  : 'bg-white/20 hover:bg-white/40'
                              }`}
                              title={`Demo ${index + 1}: ${demoCommands[index].command.substring(0, 40)}...`}
                            />
                          ))}
                        </div>
                        
                        {/* Step Counter */}
                        <div className="text-xs text-white/50 mb-6">
                          Demo {currentDemoIndex + 1} of {demoCommands.length}
                        </div>
                        
                        {/* Try Another Example Button */}
                        <button
                          onClick={tryAnotherExample}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-white/70 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                          Try another example →
                        </button>
                      </motion.div>
                    )}

                    {demoStep === 1 && currentDemo && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center"
                      >
                        <div className="bg-blue-500/20 rounded-xl p-4 mb-4 border-l-4 border-blue-400">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-blue-300 text-sm font-medium">Hotel Manager</span>
                          </div>
                          <p className="text-white/90 text-left italic">"{currentDemo.command}"</p>
                        </div>
                        
                        {/* Step indicator during demo */}
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          <span className="text-xs text-white/50">Step 1:</span>
                          <span className="text-xs text-blue-300 font-medium">Voice Command</span>
                        </div>
                      </motion.div>
                    )}

                    {demoStep === 2 && currentDemo && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center"
                      >
                        <div className="flex justify-center mb-6">
                          <div className="flex space-x-2">
                            {[...Array(7)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  height: [30, 45, 30],
                                  opacity: [0.6, 1, 0.6]
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                  ease: "easeInOut"
                                }}
                                className="w-2 h-8 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-purple-300 text-base font-medium mb-4">{currentDemo.processing}</p>
                        
                        {/* Step indicator during demo */}
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-xs text-white/50">Step 2:</span>
                          <span className="text-xs text-purple-300 font-medium">AI Processing</span>
                        </div>
                      </motion.div>
                    )}

                    {demoStep === 3 && currentDemo && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border-l-4 border-emerald-400/50 mb-4 shadow-lg shadow-emerald-500/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-emerald-300 text-sm font-medium">VoiceHotel AI</span>
                          </div>
                          <p className="text-white/90 text-left">{currentDemo.response}</p>
                        </div>
                        
                        {/* Step indicator during demo */}
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-xs text-white/50">Step 3:</span>
                          <span className="text-xs text-green-300 font-medium">AI Response</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {demoStep === 4 && currentDemo && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border-l-4 border-emerald-400/50 mb-4 shadow-lg shadow-emerald-500/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-emerald-300 text-sm font-medium">Demo Complete</span>
                          </div>
                          <p className="text-white/90 text-left text-sm">
                            PMS interface updated successfully.
                          </p>
                        </div>
                        
                        {/* Navigation options */}
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => startDemo(currentDemoIndex)}
                            className="px-3 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/20 hover:border-emerald-400/40 rounded-lg text-emerald-300 hover:text-emerald-200 text-xs font-medium transition-all duration-300 shadow-md hover:shadow-lg shadow-emerald-500/20"
                          >
                            <Play className="w-3 h-3 inline mr-1" />
                            Replay
                          </button>
                          <button
                            onClick={tryAnotherExample}
                            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 hover:border-purple-400/50 rounded-lg text-purple-300 hover:text-purple-200 text-xs font-medium transition-all duration-300"
                          >
                            Try another →
                          </button>
                        </div>
                        
                        {/* Demo indicator - Clickable */}
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          {demoCommands.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => selectDemo(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                                index === currentDemoIndex 
                                  ? 'bg-emerald-400 scale-125' 
                                  : 'bg-white/20 hover:bg-white/40'
                              }`}
                              title={`Demo ${index + 1}: ${demoCommands[index].command.substring(0, 40)}...`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-white/50 mt-2">
                          Demo {currentDemoIndex + 1} of {demoCommands.length} - Result showing
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Visual Result Panel */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-emerald-500/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg">PMS Interface</h3>
                    </div>
                    
                    {/* Step indicator for visual result */}
                    {demoStep === 4 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-white/50">Step 4:</span>
                        <span className="text-xs text-blue-300 font-medium">Live Update</span>
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {demoStep < 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative text-center py-16 overflow-hidden"
                      >
                        {/* Enhanced Aurora Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/8 to-green-500/10 rounded-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl" />
                        
                        {/* Floating Aurora Particles */}
                        <div className="absolute top-4 left-6 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '0s', animationDuration: '3s'}} />
                        <div className="absolute top-12 right-8 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}} />
                        <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-green-400/45 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '2.5s'}} />
                        <div className="absolute bottom-16 right-6 w-0.5 h-0.5 bg-purple-300/60 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '3.5s'}} />
                        
                        {/* Animated Aurora Streams */}
                        <div className="absolute top-0 left-1/4 w-6 h-12 bg-gradient-to-b from-purple-400/20 to-transparent rounded-full blur-sm transform rotate-12 animate-pulse" style={{animationDuration: '6s'}} />
                        <div className="absolute bottom-0 right-1/3 w-8 h-16 bg-gradient-to-t from-blue-400/15 to-transparent rounded-full blur-md transform -rotate-12 animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}} />
                        
                        <div className="relative z-10">
                          {/* Enhanced AI Waveform Icon */}
                          <div className="relative w-20 h-20 mx-auto mb-6">
                            {/* Glassmorphism Container */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl" />
                            
                            {/* AI Brain/Circuit Icon with Subtle Pulse */}
                            <div className="relative w-full h-full flex items-center justify-center">
                              <motion.div
                                animate={{
                                  opacity: [0.8, 1, 0.8]
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                className="w-10 h-10 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-lg flex items-center justify-center shadow-lg"
                              >
                                <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
                              </motion.div>
                              
                              {/* Orbiting Particles */}
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                              >
                                <div className="absolute top-2 left-1/2 w-1 h-1 bg-purple-400 rounded-full transform -translate-x-1/2" />
                                <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2" />
                                <div className="absolute left-2 top-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-y-1/2" />
                                <div className="absolute right-2 top-1/2 w-1 h-1 bg-purple-300 rounded-full transform -translate-y-1/2" />
                              </motion.div>
                            </div>
                            
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-blue-400/20 to-green-400/30 rounded-2xl blur-xl opacity-50" />
                          </div>
                          
                          {/* Enhanced Typography with Glow */}
                          <motion.div
                            animate={{
                              opacity: [0.9, 1, 0.9]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="space-y-3"
                          >
                            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-blue-200 text-lg font-semibold tracking-wide">
                              Listening for your voice...
                            </h4>
                            <p className="text-white/50 text-xs font-medium">
                              AI-powered interface ready
                            </p>
                          </motion.div>
                          
                          {/* Animated Voice Wave Visualization */}
                          <div className="flex justify-center items-center space-x-1 mt-6">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  height: [10, 14, 10],
                                  opacity: [0.6, 0.9, 0.6]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                  ease: "easeInOut"
                                }}
                                className="w-1 h-2 bg-gradient-to-t from-purple-400 to-blue-400 rounded-full"
                              />
                            ))}
                          </div>
                          
                          {/* Subtle Status Indicator */}
                          <div className="flex items-center justify-center space-x-2 mt-4 opacity-60">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs text-green-300 font-medium">Ready</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {demoStep === 4 && currentDemo && currentDemo.visual === 'pricing' && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <div className="bg-slate-800/50 rounded-xl p-4">
                          <h4 className="text-white/80 text-sm font-medium mb-3">Dynamic Pricing Update</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-red-500/20 rounded-lg">
                              <span className="text-white/70 text-sm">Friday Rate</span>
                              <div className="text-right">
                                <span className="text-red-400 line-through text-xs">₩148,000</span>
                                <span className="text-green-400 font-bold ml-2">₩132,000</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-red-500/20 rounded-lg">
                              <span className="text-white/70 text-sm">Saturday Rate</span>
                              <div className="text-right">
                                <span className="text-red-400 line-through text-xs">₩148,000</span>
                                <span className="text-green-400 font-bold ml-2">₩132,000</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-red-500/20 rounded-lg">
                              <span className="text-white/70 text-sm">Sunday Rate</span>
                              <div className="text-right">
                                <span className="text-red-400 line-through text-xs">₩148,000</span>
                                <span className="text-green-400 font-bold ml-2">₩132,000</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 p-2 bg-green-500/20 rounded-lg">
                            <p className="text-green-300 text-xs">✓ Optimized for 30% occupancy increase</p>
                          </div>
                        </div>
                        

                      </motion.div>
                    )}

                    {demoStep === 4 && currentDemo && currentDemo.visual === 'calendar' && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <div className="bg-slate-800/50 rounded-xl p-4">
                          <h4 className="text-white/80 text-sm font-medium mb-3">Room Management Calendar</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg border border-red-400/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-xs">301</span>
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">Room 301</div>
                                  <div className="text-red-300 text-xs">Blocked for maintenance</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-red-300 text-xs font-medium">BLOCKED</div>
                                <div className="text-white/50 text-xs">Until further notice</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-400/20 shadow-lg shadow-emerald-500/20">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">Block Status</div>
                                  <div className="text-emerald-300 text-xs">Successfully applied</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-emerald-300 text-xs font-medium">UPDATED</div>
                                <div className="text-white/50 text-xs">Just now</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        

                      </motion.div>
                    )}

                    {demoStep === 4 && currentDemo && currentDemo.visual === 'cleaning' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <div className="bg-slate-800/50 rounded-xl p-4">
                          <h4 className="text-white/80 text-sm font-medium mb-3">Housekeeping Schedule</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-xs">203</span>
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">Room 203</div>
                                  <div className="text-yellow-300 text-xs">Deep cleaning scheduled</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-yellow-300 text-xs font-medium">10:00 AM</div>
                                <div className="text-white/50 text-xs">Tomorrow</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                  <Users className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">Housekeeping Team</div>
                                  <div className="text-blue-300 text-xs">Maria & Jung-ho assigned</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-blue-300 text-xs font-medium">NOTIFIED</div>
                                <div className="text-white/50 text-xs">Just now</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-400/20 shadow-lg shadow-emerald-500/20">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">Schedule Updated</div>
                                  <div className="text-emerald-300 text-xs">Task successfully created</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-emerald-300 text-xs font-medium">CONFIRMED</div>
                                <div className="text-white/50 text-xs">2 min estimated</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        

                      </motion.div>
                    )}

                    {demoStep === 4 && currentDemo && currentDemo.visual === 'reviews' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <div className="bg-slate-800/50 rounded-xl p-4">
                          <h4 className="text-white/80 text-sm font-medium mb-3">Weekly Review Summary</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg">
                              <span className="text-white/70 text-sm">Average Rating</span>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-green-400 font-bold ml-2">4.8/5</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-blue-500/20 rounded-lg">
                                <span className="text-white/70 text-xs">Cleanliness</span>
                                <span className="text-blue-300 text-xs font-medium">Mentioned 23 times</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-purple-500/20 rounded-lg">
                                <span className="text-white/70 text-xs">Location</span>
                                <span className="text-purple-300 text-xs font-medium">Mentioned 18 times</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-green-500/20 rounded-lg">
                                <span className="text-white/70 text-xs">Staff Friendliness</span>
                                <span className="text-green-300 text-xs font-medium">Mentioned 15 times</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>


          </div>
        </div>
      </section>



      {/* GUI vs VUI Comparison */}
      <section id="comparison" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Now, operate with your voice—not your hands.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Background gradient effects - removed purple background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-500/5 rounded-3xl" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              {/* Traditional GUI - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-slate-600/30 shadow-2xl hover:shadow-slate-500/20 transition-all duration-500 hover:-translate-y-2">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 to-slate-800/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <Layers3 className="w-6 h-6 text-slate-200" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-200">Traditional GUI</h3>
                      <div className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-400 font-medium">LEGACY</div>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <MousePointer2 className="w-6 h-6 text-slate-400" />
                        <span className="text-slate-300 text-sm">Navigate through 5+ complex screens</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <Timer className="w-6 h-6 text-slate-400" />
                        <span className="text-slate-300 text-sm">Takes 5 minutes per task</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <AlertTriangle className="w-6 h-6 text-slate-400" />
                        <span className="text-slate-300 text-sm">High risk of user errors</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <GraduationCap className="w-6 h-6 text-slate-400" />
                        <span className="text-slate-300 text-sm">Requires extensive training</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* VS Badge in Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/25">
                  <span className="text-white font-bold text-lg">VS</span>
                </div>

              </motion.div>

              {/* VoiceHotel VUI - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-emerald-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-400/20 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-400/25 transition-all duration-500 hover:-translate-y-2">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <Sparkle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">VoiceHotel VUI</h3>
                      <div className="px-3 py-1 bg-green-500/20 rounded-full text-xs text-green-300 font-medium">FUTURE</div>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-colors"
                      >
                        <Mic className="w-6 h-6 text-green-400" />
                        <span className="text-green-100 text-sm font-medium">"Block room for July 16th" - Done!</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-4 p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors"
                      >
                        <Zap className="w-6 h-6 text-blue-400" />
                        <span className="text-blue-100 text-sm font-medium">Completed in 5 seconds</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center space-x-4 p-4 bg-purple-500/10 rounded-xl hover:bg-purple-500/20 transition-colors"
                      >
                        <Shield className="w-6 h-6 text-purple-400" />
                        <span className="text-purple-100 text-sm font-medium">AI-powered error prevention</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center space-x-4 p-4 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-colors"
                      >
                        <Sparkles className="w-6 h-6 text-green-400" />
                        <span className="text-green-100 text-sm font-medium">No training required</span>
                      </motion.div>
                    </div>

                    {/* CTA at bottom */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-8 pt-6 border-t border-white/10"
                    >
                      <button className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                        <span>Try VoiceHotel</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Build for Growth */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-green-900/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center tracking-wide">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Setting a New Standard for User Experience
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { 
                title: "Natural Conversation", 
                description: "Voice interface that understands intent and flows like a real conversation", 
                icon: MessageSquare, 
                gradientBg: "from-purple-500/20 via-pink-500/15 to-purple-600/20",
                iconGradient: "from-purple-400 via-pink-400 to-purple-500",
                glowColor: "purple-400",
                rotation: "rotate-1"
              },
              { 
                title: "Elder-Friendly UX", 
                description: "Designed for intuitive use even by non-digital-savvy users", 
                icon: Users, 
                gradientBg: "from-blue-500/20 via-cyan-500/15 to-blue-600/20",
                iconGradient: "from-blue-400 via-cyan-400 to-blue-500",
                glowColor: "blue-400",
                rotation: "-rotate-1"
              },
              { 
                title: "Context-Aware Suggestions", 
                description: "AI adapts based on real-time context to optimize operations", 
                icon: Sparkles, 
                gradientBg: "from-green-500/20 via-emerald-500/15 to-green-600/20",
                iconGradient: "from-green-400 via-emerald-400 to-green-500",
                glowColor: "green-400",
                rotation: "rotate-1"
              },
              { 
                title: "Automated Daily Tasks", 
                description: "From pricing to messaging, routine tasks handled by voice", 
                icon: Zap, 
                gradientBg: "from-orange-500/20 via-yellow-500/15 to-orange-600/20",
                iconGradient: "from-orange-400 via-yellow-400 to-orange-500",
                glowColor: "orange-400",
                rotation: "-rotate-1"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`group relative ${feature.rotation} hover:rotate-0 transition-all duration-700`}
              >
                {/* Card with enhanced glassmorphism */}
                <div className={`relative bg-gradient-to-br ${feature.gradientBg} backdrop-blur-3xl rounded-[2rem] p-8 border border-white/20 shadow-2xl hover:shadow-${feature.glowColor}/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden`}>
                  
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glow border effect */}
                  <div className={`absolute inset-0 rounded-[2rem] border-2 border-transparent bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 text-center">
                    {/* Enhanced 3D Icon with glow */}
                    <div className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-br ${feature.iconGradient} rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:shadow-${feature.glowColor}/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12`}>
                      {/* Icon glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.iconGradient} rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                      <feature.icon className="w-12 h-12 text-white relative z-10 drop-shadow-2xl" />
                    </div>
                    
                    {/* Enhanced Typography */}
                    <h3 className="text-xl font-bold text-white mb-4 tracking-wide leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Ambient particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-300" />
                </div>

                {/* Card reflection effect */}
                <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background spotlight effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-purple-900/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-40" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-orange-100 bg-clip-text text-transparent">
                They used to click.
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-200 via-white to-purple-100 bg-clip-text text-transparent">
                Now, they just speak.
              </span>
            </h2>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Sarah Kim */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative hover:rotate-0 transition-all duration-700"
            >
              <div className="relative bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-purple-600/20 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-purple-300/20 shadow-2xl hover:shadow-purple-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Profile avatar with glow */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-400/50 transition-all duration-500 transform group-hover:scale-110">
                        <span className="text-white font-bold text-xl">S</span>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Sarah Kim</h4>
                      <p className="text-white/70 text-sm">Hotel Manager, Seoul</p>
                      <div className="inline-flex items-center mt-1 px-2 py-1 bg-purple-500/20 rounded-full">
                        <span className="text-purple-300 text-xs font-medium">Verified User</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote with voice wave icon */}
                  <div className="relative">
                    <div className="absolute -left-2 -top-2 text-purple-400/30 text-4xl font-serif">"</div>
                    <p className="text-white/90 text-base italic leading-relaxed pl-6 group-hover:text-white transition-colors duration-300">
                      I used to worry about making mistakes every time I touched the system.<br />
                      Now I just speak — it's faster, and I feel way more confident.
                    </p>
                    {/* Voice wave decoration */}
                    <div className="flex items-center mt-4 space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Volume2 className="w-4 h-4 text-purple-400" />
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mike Chen */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative hover:rotate-0 transition-all duration-700"
            >
              <div className="relative bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-blue-600/20 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-blue-300/20 shadow-2xl hover:shadow-blue-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Profile avatar with glow */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-400/50 transition-all duration-500 transform group-hover:scale-110">
                        <span className="text-white font-bold text-xl">M</span>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Mike Chen</h4>
                      <p className="text-white/70 text-sm">Operations Director, Tokyo</p>
                      <div className="inline-flex items-center mt-1 px-2 py-1 bg-blue-500/20 rounded-full">
                        <span className="text-blue-300 text-xs font-medium">Verified User</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote with voice wave icon */}
                  <div className="relative">
                    <div className="absolute -left-2 -top-2 text-blue-400/30 text-4xl font-serif">"</div>
                    <p className="text-white/90 text-base italic leading-relaxed pl-6 group-hover:text-white transition-colors duration-300">
                      This isn't just a new tool.<br />
                      It's a completely new way to think about hotel operations.
                    </p>
                    {/* Voice wave decoration */}
                    <div className="flex items-center mt-4 space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Volume2 className="w-4 h-4 text-blue-400" />
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Natsumi Ito */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group relative hover:rotate-0 transition-all duration-700"
            >
              <div className="relative bg-gradient-to-br from-emerald-500/20 via-teal-400/15 to-emerald-600/20 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-emerald-300/10 shadow-2xl hover:shadow-emerald-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Profile avatar with glow */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-500 transform group-hover:scale-110">
                        <span className="text-white font-bold text-xl">N</span>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Natsumi Ito</h4>
                      <p className="text-white/70 text-sm">Owner-Manager, Kyoto</p>
                      <div className="inline-flex items-center mt-1 px-2 py-1 bg-emerald-500/20 rounded-full">
                        <span className="text-emerald-300 text-xs font-medium">Verified User</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote with voice wave icon */}
                  <div className="relative">
                    <div className="absolute -left-2 -top-2 text-emerald-400/30 text-4xl font-serif">"</div>
                    <p className="text-white/90 text-base italic leading-relaxed pl-6 group-hover:text-white transition-colors duration-300">
                      Technology used to overwhelm me.<br />
                      But with this, I just say what I need and it happens.<br />
                      It feels like having an assistant by my side.
                    </p>
                    {/* Voice wave decoration */}
                    <div className="flex items-center mt-4 space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Jaehoon Park */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: -0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group relative hover:rotate-0 transition-all duration-700"
            >
              <div className="relative bg-gradient-to-br from-orange-500/20 via-yellow-400/15 to-orange-600/20 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-orange-300/20 shadow-2xl hover:shadow-orange-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Profile avatar with glow */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-400/50 transition-all duration-500 transform group-hover:scale-110">
                        <span className="text-white font-bold text-xl">J</span>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Jaehoon Park</h4>
                      <p className="text-white/70 text-sm">Guesthouse Host, Jeju</p>
                      <div className="inline-flex items-center mt-1 px-2 py-1 bg-orange-500/20 rounded-full">
                        <span className="text-orange-300 text-xs font-medium">Verified User</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote with voice wave icon */}
                  <div className="relative">
                    <div className="absolute -left-2 -top-2 text-orange-400/30 text-4xl font-serif">"</div>
                    <p className="text-white/90 text-base italic leading-relaxed pl-6 group-hover:text-white transition-colors duration-300">
                      I never imagined I could run a guesthouse without using a screen.<br />
                      But this makes it possible. It's like giving a voice to my operations.
                    </p>
                    {/* Voice wave decoration */}
                    <div className="flex items-center mt-4 space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Volume2 className="w-4 h-4 text-orange-400" />
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom floating particles */}
          <div className="absolute bottom-10 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-500" />
          <div className="absolute top-10 right-10 w-1.5 h-1.5 bg-green-400/35 rounded-full animate-pulse delay-1000" />
        </div>
      </section>

      {/* Final CTA Section */}


      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Space background with subtle aurora accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-black to-gray-900/15 pointer-events-none" />
        
        {/* Stronger Aurora Accent Points for Contact Section */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/22 rounded-full blur-3xl opacity-45" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-600/18 rounded-full blur-3xl opacity-40" />
        
        {/* Enhanced aurora streams for contact section */}
        <div className="absolute top-0 right-0 w-20 h-40 bg-gradient-to-b from-emerald-400/25 to-transparent rounded-full blur-2xl transform rotate-12" />
        <div className="absolute bottom-0 left-0 w-24 h-48 bg-gradient-to-t from-blue-400/20 to-transparent rounded-full blur-2xl transform -rotate-12" />
        
        {/* Contact section stars with aurora colors */}
        <div className="absolute top-10 right-20 w-1 h-1 bg-emerald-200 rounded-full animate-pulse shadow-emerald-200/50 shadow-sm" style={{animationDelay: '6s'}} />
        <div className="absolute bottom-20 left-20 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse shadow-blue-200/50 shadow-sm" style={{animationDelay: '7s'}} />
        <div className="absolute top-1/3 right-1/3 w-px h-px bg-purple-200/80 rounded-full animate-pulse" style={{animationDelay: '8s'}} />
        
        <div className="max-w-4xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-wide">
              It's time to join<br />
              the thousands of hoteliers using VoiceHotel.
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              From boutique hotels to large management companies,<br />
              we'd love to discuss your operational challenges together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main contact form */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-[2rem] p-8 md:p-12 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
              
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/5 rounded-[2rem] opacity-50" />
              
              <div className="relative z-10">
                {!isSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="group">
                        <label className="block text-white/80 text-sm font-medium mb-3 flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Name *</span>
                        </label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => handleContactChange('name', e.target.value)}
                          placeholder="Michael Johnson"
                          required
                          className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 text-white placeholder-white/50 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                        />
                      </div>

                      {/* Email field */}
                      <div className="group">
                        <label className="block text-white/80 text-sm font-medium mb-3 flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email *</span>
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          placeholder="contact@yourhotel.com"
                          required
                          className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 text-white placeholder-white/50 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                        />
                      </div>
                    </div>

                    {/* Company field */}
                    <div className="group">
                      <label className="block text-white/80 text-sm font-medium mb-3 flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>Hotel/Company Name</span>
                        <span className="text-white/40 text-xs">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => handleContactChange('company', e.target.value)}
                        placeholder="Grand Hotel, Boutique Inn, ABC Management Co., etc."
                        className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 text-white placeholder-white/50 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      />
                    </div>

                    {/* Message field */}
                    <div className="group">
                      <label className="block text-white/80 text-sm font-medium mb-3 flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Message *</span>
                      </label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => handleContactChange('message', e.target.value)}
                        placeholder="Tell us about your current operation and what features you're considering. Include details like number of rooms, key workflows, current systems, etc."
                        required
                        rows={5}
                        className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 text-white placeholder-white/50 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15 resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <div className="text-center pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || !contactForm.name || !contactForm.email || !contactForm.message}
                        className="group relative bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                      >
                        <div className="flex items-center space-x-3">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                              <span>Get in Touch</span>
                            </>
                          )}
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Thank you message */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Thanks! We'll get back to you soon.
                    </h3>
                    <p className="text-white/70 text-lg">
                      Until then, keep speaking easy.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Usually reply within 2 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">support@hautrip.com</span>
                </div>
              </div>
              
              <p className="text-white/50 text-sm mt-6 max-w-2xl mx-auto leading-relaxed">
                Have questions? Feel free to reach out anytime. We'll personally respond to every inquiry.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-8 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-3xl bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">VoiceHotel</span>
            </div>
            <div className="flex space-x-12 text-white/60">
              <a href="#" className="hover:text-white transition-colors font-medium">Careers</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Blog</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Newsletter</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Support</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-lg">
              © 2025 Vacatio Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
