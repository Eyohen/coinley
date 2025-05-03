// // src/Home.jsx
// import { useState, useCallback } from 'react';
// import Particles from "react-particles";
// import { loadFull } from "tsparticles";
// import { ArrowRight, CheckCircle, Globe, Wallet, Zap } from 'lucide-react';
// import { loadSlim } from "tsparticles-slim" 

// const Home = () => {
//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
  

//   const particlesInit = useCallback(async engine => {
//     await loadSlim(engine);
//   }, []);

//     // Optional: Handle particles loaded event
//     const particlesLoaded = useCallback(async (container) => {
//       console.log("Particles loaded!", container)
//     }, [])

  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the email to your backend
//     setIsSubmitted(true);
//     setEmail('');
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 overflow-hidden">
//       {/* Particles Background */}
//       <Particles
//       id="tsparticles"
//       init={particlesInit}
//       loaded={particlesLoaded}
//       options={{
//         background: {
//           color: {
//             value: "#301934",
//           },
//         },
//         fpsLimit: 120,
//         particles: {
//           color: {
//             value: "#ffffff",
//           },
//           links: {
//             color: "#ffffff",
//             distance: 150,
//             enable: true,
//             opacity: 0.5,
//             width: 1,
//           },
//           move: {
//             enable: true,
//             speed: 2,
//           },
//           number: {
//             density: {
//               enable: true,
//               area: 800,
//             },
//             value: 80,
//           },
//           opacity: {
//             value: 0.5,
//           },
//           shape: {
//             type: "circle",
//           },
//           size: {
//             value: { min: 1, max: 5 },
//           },
//         },
//         detectRetina: true,
//       }}
//       />

//       {/* Main Content */}
//       <div className="relative z-10">
//         {/* Navigation */}
//         <nav className="border-b border-purple-700/30 backdrop-blur-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className="flex justify-between items-center">
//               <div className="text-2xl font-bold text-white">COINLEY</div>
//               <div>
//                 <a href="#waitlist" className="text-white hover:text-purple-200 transition">Join Waitlist</a>
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
//               Empowering Modern Businesses with Crypto Payments
//             </h1>
//             <p className="text-xl sm:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto">
//               An entirely new payment infrastructure, built with blockchain technology, to simplify global crypto transactions.
//             </p>
//             <div className="flex justify-center gap-4">
//               <a 
//                 href="#waitlist" 
//                 className="px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-300 flex items-center gap-2"
//               >
//                 Join Waitlist <ArrowRight className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30 hover:border-purple-500/50 transition-colors duration-300">
//               <Globe className="w-12 h-12 text-purple-300 mb-4" />
//               <h3 className="text-xl font-semibold text-white mb-2">Global Reach</h3>
//               <p className="text-purple-200">Accept payments from customers worldwide without traditional banking restrictions.</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30 hover:border-purple-500/50 transition-colors duration-300">
//               <Zap className="w-12 h-12 text-purple-300 mb-4" />
//               <h3 className="text-xl font-semibold text-white mb-2">Instant Settlement</h3>
//               <p className="text-purple-200">Receive payments instantly with blockchain technology, no more waiting days.</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30 hover:border-purple-500/50 transition-colors duration-300">
//               <Wallet className="w-12 h-12 text-purple-300 mb-4" />
//               <h3 className="text-xl font-semibold text-white mb-2">Multi-Chain Support</h3>
//               <p className="text-purple-200">Support for multiple blockchain networks including Ethereum, Solana, BNB, and Celo.</p>
//             </div>
//           </div>
//         </div>

//         {/* Waitlist Section */}
//         <div id="waitlist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="max-w-xl mx-auto text-center">
//             <h2 className="text-3xl font-bold text-white mb-6">Join the Waitlist</h2>
//             <p className="text-purple-200 mb-8">Be among the first to experience the future of crypto payments.</p>
            
//             {isSubmitted ? (
//               <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-6 border border-green-500/30 flex items-center justify-center gap-2">
//                 <CheckCircle className="w-6 h-6 text-green-400" />
//                 <span className="text-white">Thank you for joining our waitlist!</span>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="flex gap-2">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                   className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-purple-700/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-300"
//                 >
//                   Join
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="border-t border-purple-700/30 backdrop-blur-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="text-center text-purple-200">
//               © 2025 Coinley. All rights reserved.
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Home;






// import React, { useState } from 'react';
// import { ArrowRight, CreditCard, Clock, FilePlus, BarChart4, CheckCircle, Menu, X } from 'lucide-react';

// export default function SpendSyncLandingPage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-800">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <span className="text-2xl font-bold text-teal-500">Spend<span className="text-green-700">Sync</span></span>
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                 <a href="#features" className="border-transparent text-gray-700 hover:text-teal-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                   Features
//                 </a>
//                 <a href="#how-it-works" className="border-transparent text-gray-700 hover:text-teal-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                   How It Works
//                 </a>
//                 <a href="#testimonials" className="border-transparent text-gray-700 hover:text-teal-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                   Testimonials
//                 </a>
//                 <a href="#contact" className="border-transparent text-gray-700 hover:text-teal-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                   Contact
//                 </a>
//               </div>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:items-center">
//               <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
//                 Get Started
//               </button>
//             </div>
//             <div className="flex items-center sm:hidden">
//               <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
//                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile menu, toggle classes based on menu state */}
//         <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
//           <div className="pt-2 pb-3 space-y-1">
//             <a href="#features" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
//               Features
//             </a>
//             <a href="#how-it-works" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
//               How It Works
//             </a>
//             <a href="#testimonials" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
//               Testimonials
//             </a>
//             <a href="#contact" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
//               Contact
//             </a>
//             <div className="mt-4 px-3">
//               <button className="w-full bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero section */}
//       <div className="relative bg-white overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
//             <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
//               <div className="sm:text-center lg:text-left">
//                 <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//                   <span className="block">Simplify Expense</span>
//                   <span className="block text-teal-500">Management for SMEs</span>
//                 </h1>
//                 <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
//                   Transform your expense and wallet management into automated, secure, and transparent workflows tailored for Nigerian and West African businesses.
//                 </p>
//                 <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
//                   <div className="rounded-md shadow">
//                     <a href="#contact" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 md:py-4 md:text-lg md:px-10">
//                       Get Started
//                     </a>
//                   </div>
//                   <div className="mt-3 sm:mt-0 sm:ml-3">
//                     <a href="#how-it-works" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10">
//                       Learn More
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </main>
//           </div>
//         </div>
//         <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100 flex items-center justify-center">
//           <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full p-8">
//             <div className="rounded-lg shadow-xl bg-white p-6 max-w-md">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <p className="text-sm text-gray-500">Wallet Balance</p>
//                   <p className="text-2xl font-bold text-gray-800">₦2,450,000</p>
//                 </div>
//                 <div className="bg-teal-500 p-3 rounded-full">
//                   <CreditCard className="h-6 w-6 text-white" />
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-gray-700">Sales Team</p>
//                       <p className="text-xs text-gray-500">4 Active Cards</p>
//                     </div>
//                     <p className="text-sm font-semibold text-teal-500">₦850,000</p>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-gray-700">Operations</p>
//                       <p className="text-xs text-gray-500">6 Active Cards</p>
//                     </div>
//                     <p className="text-sm font-semibold text-teal-500">₦1,200,000</p>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-gray-700">Marketing</p>
//                       <p className="text-xs text-gray-500">2 Active Cards</p>
//                     </div>
//                     <p className="text-sm font-semibold text-teal-500">₦400,000</p>
//                   </div>
//                 </div>
//               </div>
//               <button className="mt-6 w-full bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600">
//                 Top Up Wallet
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div id="features" className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="lg:text-center">
//             <h2 className="text-base text-teal-500 font-semibold tracking-wide uppercase">Features</h2>
//             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//               Everything you need to manage expenses
//             </p>
//             <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
//               Streamline your financial operations with our comprehensive suite of tools.
//             </p>
//           </div>

//           <div className="mt-10">
//             <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
//               <div className="relative">
//                 <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
//                   <CreditCard className="h-6 w-6" />
//                 </div>
//                 <div className="ml-16">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Virtual Cards</h3>
//                   <p className="mt-2 text-base text-gray-600">
//                     Issue virtual cards to employees with preset spending limits that draw directly from your corporate wallet.
//                   </p>
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
//                   <Clock className="h-6 w-6" />
//                 </div>
//                 <div className="ml-16">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Real-time Tracking</h3>
//                   <p className="mt-2 text-base text-gray-600">
//                     Monitor transactions as they happen with instant notifications and a live dashboard feed.
//                   </p>
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
//                   <FilePlus className="h-6 w-6" />
//                 </div>
//                 <div className="ml-16">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Automated Receipt Management</h3>
//                   <p className="mt-2 text-base text-gray-600">
//                     Capture receipts with your phone, automatically attach them to transactions, and categorize expenses.
//                   </p>
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
//                   <BarChart4 className="h-6 w-6" />
//                 </div>
//                 <div className="ml-16">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Comprehensive Reporting</h3>
//                   <p className="mt-2 text-base text-gray-600">
//                     Generate fully-audited reports with a single click, ready for tax filing or audit.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* How It Works */}
//       <div id="how-it-works" className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="lg:text-center">
//             <h2 className="text-base text-teal-500 font-semibold tracking-wide uppercase">How It Works</h2>
//             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//               Simple, secure, and effective
//             </p>
//             <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
//               Spend Sync transforms your expense management in just a few easy steps.
//             </p>
//           </div>

//           <div className="mt-10">
//             <div className="space-y-10">
//               <div className="flex flex-col md:flex-row items-start md:items-center">
//                 <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-500 mr-4">
//                   <span className="text-xl font-bold">1</span>
//                 </div>
//                 <div className="mt-4 md:mt-0">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Top Up Your Corporate Wallet</h3>
//                   <p className="mt-2 text-base text-gray-600">
//                     As an Admin, top up your corporate wallet via a secure payment link through Paystack or Flutterwave. Your transfer is automatically confirmed, crediting your wallet and creating a clear ledger entry.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row items-start md:items-center">
//                 <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-500 mr-4">
//                   <span className="text-xl font-bold">2</span>
//                 </div>
//                 <div className="mt-4 md:mt-0">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Issue Virtual Cards</h3>
//                   <p className="mt-2 text-base text-gray-600">
//                     With funds ready, issue virtual cards to your team with preset spending limits that draw directly from your wallet. Control who spends what, where, and when.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row items-start md:items-center">
//                 <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-500 mr-4">
//                   <span className="text-xl font-bold">3</span>
//                 </div>
//                 <div className="mt-4 md:mt-0">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Track Spending in Real Time</h3>
//                   <p className="mt-2 text-base text-gray-600">
//                     As employees make purchases, transactions appear live on your dashboard. Receipts are captured with a phone, auto-attached to transactions, and categorized automatically.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row items-start md:items-center">
//                 <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-500 mr-4">
//                   <span className="text-xl font-bold">4</span>
//                 </div>
//                 <div className="mt-4 md:mt-0">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Effortless Reconciliation</h3>
//                   <p className="mt-2 text-base text-gray-600">
//                     At month-end, pull a fully-audited report with a single click—complete with receipts, categories, wallet top-ups, and comments—ready for tax filing or audit.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div id="testimonials" className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="lg:text-center">
//             <h2 className="text-base text-teal-500 font-semibold tracking-wide uppercase">Testimonials</h2>
//             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//               What our customers say
//             </p>
//           </div>

//           <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0">
//                   <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-teal-500">
//                     <span className="text-white font-medium">AL</span>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="text-lg font-bold text-gray-900">Alara Logistics</h4>
//                   <p className="text-sm text-gray-600">Lagos, Nigeria</p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <p className="text-gray-600">
//                   "Spend Sync has revolutionized how we manage our expenses. We've reduced reconciliation time from weeks to hours, and our employees love the simplicity of the system."
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0">
//                   <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-teal-500">
//                     <span className="text-white font-medium">EC</span>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="text-lg font-bold text-gray-900">Echo Consulting</h4>
//                   <p className="text-sm text-gray-600">Abuja, Nigeria</p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <p className="text-gray-600">
//                   "The real-time tracking and automated receipt management have saved us countless hours. Our finance team can now focus on strategic decisions instead of chasing receipts."
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0">
//                   <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-teal-500">
//                     <span className="text-white font-medium">ST</span>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="text-lg font-bold text-gray-900">Savvy Tech</h4>
//                   <p className="text-sm text-gray-600">Accra, Ghana</p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <p className="text-gray-600">
//                   "With Spend Sync, we've slashed manual work by over 80% and gained complete visibility into our spending. The virtual cards give us control we never had before."
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div id="contact" className="bg-teal-500">
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
//           <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
//             <span className="block">Ready to streamline your expense management?</span>
//             <span className="block text-teal-100">Get started with Spend Sync today.</span>
//           </h2>
//           <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
//             <div className="inline-flex rounded-md shadow">
//               <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50">
//                 Request Demo
//               </a>
//             </div>
//             <div className="ml-3 inline-flex rounded-md shadow">
//               <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800">
//                 Sign Up <ArrowRight className="ml-2 h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>


//       </div>
        
// )};






import React, { useState } from 'react';
import { ArrowRight, CreditCard, Clock, FilePlus, BarChart4, CheckCircle, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Add keyframes for float animation at the top of the component  
const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
`;

export default function SpendSyncLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>{floatAnimation}</style>
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans text-gray-800">
      {/* Navigation */}
      <nav className="bg-white backdrop-blur-lg bg-opacity-80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-700">SpendSync</span>
                </span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <a href="#features" className="border-transparent hover:border-teal-500 text-gray-700 hover:text-teal-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-300">
                  Features
                </a>
                <a href="#how-it-works" className="border-transparent hover:border-teal-500 text-gray-700 hover:text-teal-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-300">
                  How It Works
                </a>
                <a href="#testimonials" className="border-transparent hover:border-teal-500 text-gray-700 hover:text-teal-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-300">
                  Testimonials
                </a>
                <a href="#contact" className="border-transparent hover:border-teal-500 text-gray-700 hover:text-teal-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-300">
                  Contact
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="bg-gradient-to-r from-teal-500 to-green-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:from-teal-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 transform hover:scale-105 shadow-md">
                Get Started
              </button>
            </div>
            <div className="flex items-center sm:hidden">
              <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, toggle classes based on menu state */}
        <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <a href="#features" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </a>
            <div className="mt-4 px-3">
              <button onClick={() => navigate('/login')} className="w-full bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full bg-gradient-to-br from-teal-50 to-green-50 transform -skew-y-6 -top-10 z-0"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="inline-block mb-4 px-3 py-1 bg-teal-50 rounded-full">
                  <p className="text-sm font-medium text-teal-600">Expense Management Made Easy</p>
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Simplify Expense</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-700">Management for SMEs</span>
                </h1>
                <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Transform your expense and wallet management into automated, secure, and transparent workflows tailored for Nigerian and West African businesses.
                </p>
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-teal-500 to-green-700 hover:from-teal-600 hover:to-green-800 md:py-4 md:text-lg md:px-10 transition duration-300 transform hover:scale-105 shadow-md">
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#how-it-works" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-green-700 bg-teal-50 hover:bg-teal-100 md:py-4 md:text-lg md:px-10 transition duration-300">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center animate-float">
          <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full p-8 transform hover:scale-105 transition duration-500">
            <div className="rounded-2xl shadow-2xl bg-white p-6 max-w-md transform rotate-2 hover:rotate-0 transition duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">Wallet Balance</p>
                  <p className="text-2xl font-bold text-gray-800">₦2,450,000</p>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-green-600 p-3 rounded-full shadow-md">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-xl hover:shadow-md transition duration-300">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Sales Team</p>
                      <p className="text-xs text-gray-500">4 Active Cards</p>
                    </div>
                    <p className="text-sm font-semibold text-teal-500">₦850,000</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl hover:shadow-md transition duration-300">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Operations</p>
                      <p className="text-xs text-gray-500">6 Active Cards</p>
                    </div>
                    <p className="text-sm font-semibold text-teal-500">₦1,200,000</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl hover:shadow-md transition duration-300">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Marketing</p>
                      <p className="text-xs text-gray-500">2 Active Cards</p>
                    </div>
                    <p className="text-sm font-semibold text-teal-500">₦400,000</p>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full bg-gradient-to-r from-teal-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-teal-600 hover:to-green-700 transition duration-300 transform hover:translate-y-px shadow-md">
                Top Up Wallet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <div className="inline-block mb-3 px-3 py-1 bg-teal-50 rounded-full">
              <p className="text-sm font-medium text-teal-600">What We Offer</p>
            </div>
            <h2 className="text-base text-teal-500 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-700">manage expenses</span>
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Streamline your financial operations with our comprehensive suite of tools.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-16">
              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-teal-500 to-green-600 text-white transform -translate-y-1/2 shadow-lg transition duration-300 group-hover:scale-110">
                  <CreditCard className="h-8 w-8" />
                </div>
                <div className="bg-white p-8 pl-20 pr-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform group-hover:-translate-y-1">
                  <h3 className="text-xl leading-6 font-bold text-gray-900 mb-3">Virtual Cards</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Issue virtual cards to employees with preset spending limits that draw directly from your corporate wallet. Control who can spend what, where, and when.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-teal-500 to-green-600 text-white transform -translate-y-1/2 shadow-lg transition duration-300 group-hover:scale-110">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="bg-white p-8 pl-20 pr-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform group-hover:-translate-y-1">
                  <h3 className="text-xl leading-6 font-bold text-gray-900 mb-3">Real-time Tracking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Monitor transactions as they happen with instant notifications and a live dashboard feed. Stop unauthorized spend before it becomes a headache.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-teal-500 to-green-600 text-white transform -translate-y-1/2 shadow-lg transition duration-300 group-hover:scale-110">
                  <FilePlus className="h-8 w-8" />
                </div>
                <div className="bg-white p-8 pl-20 pr-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform group-hover:-translate-y-1">
                  <h3 className="text-xl leading-6 font-bold text-gray-900 mb-3">Automated Receipt Management</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Capture receipts with your phone, automatically attach them to transactions, and categorize expenses with OCR technology.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-teal-500 to-green-600 text-white transform -translate-y-1/2 shadow-lg transition duration-300 group-hover:scale-110">
                  <BarChart4 className="h-8 w-8" />
                </div>
                <div className="bg-white p-8 pl-20 pr-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform group-hover:-translate-y-1">
                  <h3 className="text-xl leading-6 font-bold text-gray-900 mb-3">Comprehensive Reporting</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Generate fully-audited reports with a single click, ready for tax filing or audit. Reclaim weeks of trapped cash flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-teal-500 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, secure, and effective
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Spend Sync transforms your expense management in just a few easy steps.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-500 mr-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="mt-4 md:mt-0">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Top Up Your Corporate Wallet</h3>
                  <p className="mt-2 text-base text-gray-600">
                    As an Admin, top up your corporate wallet via a secure payment link through Paystack or Flutterwave. Your transfer is automatically confirmed, crediting your wallet and creating a clear ledger entry.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-500 mr-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="mt-4 md:mt-0">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Issue Virtual Cards</h3>
                  <p className="mt-2 text-base text-gray-600">
                    With funds ready, issue virtual cards to your team with preset spending limits that draw directly from your wallet. Control who spends what, where, and when.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-500 mr-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="mt-4 md:mt-0">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Track Spending in Real Time</h3>
                  <p className="mt-2 text-base text-gray-600">
                    As employees make purchases, transactions appear live on your dashboard. Receipts are captured with a phone, auto-attached to transactions, and categorized automatically.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-500 mr-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <div className="mt-4 md:mt-0">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Effortless Reconciliation</h3>
                  <p className="mt-2 text-base text-gray-600">
                    At month-end, pull a fully-audited report with a single click—complete with receipts, categories, wallet top-ups, and comments—ready for tax filing or audit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-16 bg-teal-50 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center">
            <div className="inline-block mb-3 px-3 py-1 bg-teal-100 rounded-full">
              <p className="text-sm font-medium text-teal-600">Success Stories</p>
            </div>
            <h2 className="text-base text-teal-500 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-700">customers say</span>
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white shadow-lg rounded-2xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 shadow-md">
                    <span className="text-white text-xl font-bold">AL</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Alara Logistics</h4>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-gray-600">Lagos, Nigeria</p>
                    <div className="flex ml-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-600 italic">
                  "Spend Sync has revolutionized how we manage our expenses. We've reduced reconciliation time from weeks to hours, and our employees love the simplicity of the system."
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-teal-600">
                  <span>Finance Manager</span>
                </span>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-teal-500 to-green-600 shadow-md">
                    <span className="text-white text-xl font-bold">EC</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Echo Consulting</h4>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-gray-600">Abuja, Nigeria</p>
                    <div className="flex ml-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-600 italic">
                  "The real-time tracking and automated receipt management have saved us countless hours. Our finance team can now focus on strategic decisions instead of chasing receipts."
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-teal-600">
                  <span>Chief Financial Officer</span>
                </span>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-green-600 to-green-700 shadow-md">
                    <span className="text-white text-xl font-bold">ST</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Savvy Tech</h4>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-gray-600">Accra, Ghana</p>
                    <div className="flex ml-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-600 italic">
                  "With Spend Sync, we've slashed manual work by over 80% and gained complete visibility into our spending. The virtual cards give us control we never had before."
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-teal-600">
                  <span>Operations Director</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div id="contact" className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-700 transform skew-y-6 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="lg:grid lg:grid-cols-2">
              <div className="py-12 px-6 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="max-w-lg mx-auto lg:mx-0">
                  <div className="inline-block mb-3 px-3 py-1 bg-teal-50 rounded-full">
                    <p className="text-sm font-medium text-teal-600">Ready to start?</p>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block">Ready to streamline your</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-700">expense management?</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-gray-600">
                    Sign up today and join hundreds of businesses that have transformed their financial operations with Spend Sync.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-teal-500 to-green-700 hover:from-teal-600 hover:to-green-800 transition duration-300 transform hover:scale-105 shadow-md"
                    >
                      Get Started
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100 transition duration-300"
                    >
                      Request Demo
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="hidden md:block absolute inset-0 h-full w-full bg-gradient-to-r from-teal-800 to-green-800 opacity-20"></div>
                <img
                  className="h-56 w-full object-cover lg:absolute lg:h-full lg:w-full"
                  src="/api/placeholder/1000/800"
                  alt="Working at desk"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8">
                  <div className="text-center">
                    <p className="text-lg font-medium text-white mb-2">Need more information?</p>
                    <p className="text-white text-sm mb-4">Speak with our expert team today</p>
                    <a href="#" className="inline-block px-4 py-2 bg-white text-teal-700 rounded-full font-medium text-sm hover:bg-gray-100 transition duration-300">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Footer */}
    <footer className="bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-green-600 to-teal-500"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-900 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-900 rounded-full opacity-10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-4 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="inline-block">
                <span className="text-2xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-green-400">SpendSync</span>
                </span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">
                Transforming expense and wallet management into automated, secure, and transparent workflows for West African businesses.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-teal-400 transition duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">About</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Careers</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Blog</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Press</a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Contact</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Documentation</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Guides</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">API Status</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Privacy</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Terms</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Cookie Policy</a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-teal-400 transition duration-300">Licenses</a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Subscribe</h3>
                  <p className="mt-4 text-base text-gray-400">Get the latest news and updates.</p>
                  <div className="mt-4 flex">
                    <input
                      type="email"
                      className="appearance-none min-w-0 w-full bg-gray-800 border border-gray-700 rounded-l-lg py-2 px-4 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-r-lg text-white bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} SpendSync. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-teal-400 transition duration-300">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-teal-400 transition duration-300">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-teal-400 transition duration-300">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>  

      </div>
      </>
            

)};