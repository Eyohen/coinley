// src/Home.jsx
import { useState, useCallback } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { ArrowRight, CheckCircle, Globe, Wallet, Zap } from 'lucide-react';
import { loadSlim } from "tsparticles-slim" 

const Home = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

    // Optional: Handle particles loaded event
    const particlesLoaded = useCallback(async (container) => {
      console.log("Particles loaded!", container)
    }, [])

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 overflow-hidden">
      {/* Particles Background */}
      <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#301934",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-purple-700/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-white">COINLEY</div>
              <div>
                <a href="#waitlist" className="text-white hover:text-purple-200 transition">Join Waitlist</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Empowering Modern Businesses with Crypto Payments
            </h1>
            <p className="text-xl sm:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto">
              An entirely new payment infrastructure, built with blockchain technology, to simplify global crypto transactions.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="#waitlist" 
                className="px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-300 flex items-center gap-2"
              >
                Join Waitlist <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30 hover:border-purple-500/50 transition-colors duration-300">
              <Globe className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Global Reach</h3>
              <p className="text-purple-200">Accept payments from customers worldwide without traditional banking restrictions.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30 hover:border-purple-500/50 transition-colors duration-300">
              <Zap className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Settlement</h3>
              <p className="text-purple-200">Receive payments instantly with blockchain technology, no more waiting days.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30 hover:border-purple-500/50 transition-colors duration-300">
              <Wallet className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Multi-Chain Support</h3>
              <p className="text-purple-200">Support for multiple blockchain networks including Ethereum, Solana, BNB, and Celo.</p>
            </div>
          </div>
        </div>

        {/* Waitlist Section */}
        <div id="waitlist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join the Waitlist</h2>
            <p className="text-purple-200 mb-8">Be among the first to experience the future of crypto payments.</p>
            
            {isSubmitted ? (
              <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-6 border border-green-500/30 flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-white">Thank you for joining our waitlist!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-purple-700/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-300"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-purple-700/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-purple-200">
              © 2025 Coinley. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;