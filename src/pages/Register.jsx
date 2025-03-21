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
//       navigate('/dashboard');
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
//                 Wallet Address
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




// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { URL } from '../url';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    walletAddress: '',
    solWalletAddress: '',
    settlementPreference: 'fiat'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Submitting registration:', formData);
      const response = await axios.post(
        `${URL}/api/merchants/register`,
        formData
      );
      
      console.log('Registration successful:', response.data);
      
      // Store credentials
      localStorage.setItem('merchantToken', response.data.token);
      localStorage.setItem('merchantData', JSON.stringify(response.data.merchant));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Register your business
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
                Ethereum Wallet Address (for ETH, USDT, USDC, BNB)
              </label>
              <input
                id="walletAddress"
                name="walletAddress"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="0x..."
                value={formData.walletAddress}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="solWalletAddress" className="block text-sm font-medium text-gray-700">
                Solana Wallet Address (Optional)
              </label>
              <input
                id="solWalletAddress"
                name="solWalletAddress"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter your Solana wallet address..."
                value={formData.solWalletAddress}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-gray-500">
                You can add this later if you want to accept Solana payments
              </p>
            </div>

            <div>
              <label htmlFor="settlementPreference" className="block text-sm font-medium text-gray-700">
                Settlement Preference
              </label>
              <select
                id="settlementPreference"
                name="settlementPreference"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.settlementPreference}
                onChange={handleChange}
              >
                <option value="crypto">Crypto</option>
                <option value="fiat">Fiat</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;