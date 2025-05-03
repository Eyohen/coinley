// // src/components/Register.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { URL } from '../url';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     businessName: '',
//     email: '',
//     password: '',
//     walletAddress: '',
//     solWalletAddress: '',
//     settlementPreference: 'fiat'
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       console.log('Submitting registration:', formData);
//       const response = await axios.post(
//         `${URL}/api/merchants/register`,
//         formData
//       );
      
//       console.log('Registration successful:', response.data);
      
//       // Store credentials
//       localStorage.setItem('merchantToken', response.data.token);
//       localStorage.setItem('merchantData', JSON.stringify(response.data.merchant));
      
//       // Navigate to dashboard
//       navigate('/login');
//     } catch (error) {
//       console.error('Registration error:', error);
//       setError(error.response?.data?.error || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">
//           Register your business
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Or{' '}
//           <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
//             sign in to your account
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
//               {error}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
//                 Business Name
//               </label>
//               <input
//                 id="businessName"
//                 name="businessName"
//                 type="text"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 value={formData.businessName}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
//                 Ethereum Wallet Address (for ETH, USDT, USDC, BNB)
//               </label>
//               <input
//                 id="walletAddress"
//                 name="walletAddress"
//                 type="text"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 placeholder="0x..."
//                 value={formData.walletAddress}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="solWalletAddress" className="block text-sm font-medium text-gray-700">
//                 Solana Wallet Address (Optional)
//               </label>
//               <input
//                 id="solWalletAddress"
//                 name="solWalletAddress"
//                 type="text"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 placeholder="Enter your Solana wallet address..."
//                 value={formData.solWalletAddress}
//                 onChange={handleChange}
//               />
//               <p className="mt-1 text-xs text-gray-500">
//                 You can add this later if you want to accept Solana payments
//               </p>
//             </div>

//             <div>
//               <label htmlFor="settlementPreference" className="block text-sm font-medium text-gray-700">
//                 Settlement Preference
//               </label>
//               <select
//                 id="settlementPreference"
//                 name="settlementPreference"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 value={formData.settlementPreference}
//                 onChange={handleChange}
//               >
//                 <option value="crypto">Crypto</option>
//                 <option value="fiat">Fiat</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? 'Registering...' : 'Register'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Building, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Signup submitted with:', { fullName, companyName, email, password, agreed });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Signup decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-teal-500 skew-x-6 transform origin-top-left opacity-5 hidden lg:block"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-teal-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-600 rounded-full opacity-10 blur-3xl"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <span className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-700">SpendSync</span>
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="font-medium text-teal-600 hover:text-teal-500 transition duration-300">
              Sign in
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 transform transition-all duration-500 hover:shadow-2xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="full-name"
                  name="full-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="company-name"
                  name="company-name"
                  type="text"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="block w-full pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Alara Logistics"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-teal-600 hover:text-teal-500 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-teal-600 hover:text-teal-500 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <div>
              <button
                onClick={handleSignup}
                disabled={!agreed}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-sm font-medium text-white ${
                  agreed
                    ? 'bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 transform hover:scale-105 shadow-md`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {agreed ? (
                    <CheckCircle className="h-5 w-5 text-teal-50 group-hover:text-white" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </span>
                Create account
                <ArrowRight className="ml-2 -mr-1 h-5 w-5 text-teal-50 group-hover:text-white" />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By clicking "Create account" or signing up with social providers, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-gray-600 relative z-10">
        <p>&copy; {new Date().getFullYear()} SpendSync. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-teal-500 transition duration-300">Privacy Policy</a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-gray-600 hover:text-teal-500 transition duration-300">Terms of Service</a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-gray-600 hover:text-teal-500 transition duration-300">Contact</a>
        </div>
      </div>
    </div>
  );
}