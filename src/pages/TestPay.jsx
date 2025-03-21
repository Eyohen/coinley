// // src/components/TestPay.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { URL } from '../url';

// const TestPay = () => {
//   const [apiCredentials, setApiCredentials] = useState({
//     apiKey: '',
//     apiSecret: ''
//   });
  
//   const [paymentDetails, setPaymentDetails] = useState({
//     amount: '10.00',
//     currency: 'USDT',
//     customerEmail: 'customer@example.com',
//     metadata: { orderId: 'TEST-123' }
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [paymentUrl, setPaymentUrl] = useState('');
  
//   const createPayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setPaymentUrl('');
    
//     try {
//       const response = await axios.post(
//         `${URL}/api/payments/create`,
//         paymentDetails,
//         {
//           headers: {
//             'x-api-key': apiCredentials.apiKey,
//             'x-api-secret': apiCredentials.apiSecret
//           }
//         }
//       );
      
//       console.log('Payment created:', response.data);
//       setPaymentUrl(response.data.paymentUrl);
//     } catch (error) {
//       console.error('Error creating payment:', error);
//       setError(error.response?.data?.error || 'Failed to create payment');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="px-6 py-8">
//           <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
//             DODO Test Payment Integration
//           </h2>
          
//           {error && (
//             <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
//               {error}
//             </div>
//           )}
          
//           <form onSubmit={createPayment} className="space-y-6">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-4">API Credentials</h3>
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">API Key</label>
//                   <input
//                     type="text"
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     value={apiCredentials.apiKey}
//                     onChange={(e) => setApiCredentials({...apiCredentials, apiKey: e.target.value})}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">API Secret</label>
//                   <input
//                     type="text"
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     value={apiCredentials.apiSecret}
//                     onChange={(e) => setApiCredentials({...apiCredentials, apiSecret: e.target.value})}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Amount</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     value={paymentDetails.amount}
//                     onChange={(e) => setPaymentDetails({...paymentDetails, amount: e.target.value})}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Currency</label>
//                   <select
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     value={paymentDetails.currency}
//                     onChange={(e) => setPaymentDetails({...paymentDetails, currency: e.target.value})}
//                   >
//                     <option value="USDT">USDT</option>
//                     <option value="USDC">USDC</option>
//                     <option value="BNB">BNB</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Customer Email</label>
//                   <input
//                     type="email"
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     value={paymentDetails.customerEmail}
//                     onChange={(e) => setPaymentDetails({...paymentDetails, customerEmail: e.target.value})}
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? 'Creating Payment...' : 'Create Payment'}
//             </button>
//           </form>
          
//           {paymentUrl && (
//             <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <h3 className="text-lg font-medium text-green-800 mb-2">Payment Created!</h3>
//               <p className="text-sm text-green-600 mb-3">Use this URL to complete the payment:</p>
//               <div className="bg-white p-3 rounded border border-gray-200 break-all">
//                 <a 
//                   href={paymentUrl} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   {paymentUrl}
//                 </a>
//               </div>
//               <div className="mt-4">
//                 <button
//                   onClick={() => window.open(paymentUrl, '_blank')}
//                   className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
//                 >
//                   Open Payment Page
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestPay;



// src/components/TestPay.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../url';

const TestPay = () => {
  const [apiCredentials, setApiCredentials] = useState({
    apiKey: '',
    apiSecret: ''
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '10.00',
    currency: 'USDT',
    customerEmail: 'customer@example.com',
    metadata: { orderId: 'TEST-123' }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  
  const createPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPaymentUrl('');
    
    try {
      const response = await axios.post(
        `${URL}/api/payments/create`,
        paymentDetails,
        {
          headers: {
            'x-api-key': apiCredentials.apiKey,
            'x-api-secret': apiCredentials.apiSecret
          }
        }
      );
      
      console.log('Payment created:', response.data);
      setPaymentUrl(response.data.paymentUrl);
    } catch (error) {
      console.error('Error creating payment:', error);
      setError(error.response?.data?.error || 'Failed to create payment');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            COINLEY Test Payment Integration
          </h2>
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={createPayment} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">API Credentials</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">API Key</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={apiCredentials.apiKey}
                    onChange={(e) => setApiCredentials({...apiCredentials, apiKey: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">API Secret</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={apiCredentials.apiSecret}
                    onChange={(e) => setApiCredentials({...apiCredentials, apiSecret: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={paymentDetails.amount}
                    onChange={(e) => setPaymentDetails({...paymentDetails, amount: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Currency</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={paymentDetails.currency}
                    onChange={(e) => setPaymentDetails({...paymentDetails, currency: e.target.value})}
                  >
                    <option value="USDT">USDT</option>
                    <option value="USDC">USDC</option>
                    <option value="BNB">BNB</option>
                    <option value="SOL">SOL</option>
                    <option value="USDC_SOL">USDC on Solana</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={paymentDetails.customerEmail}
                    onChange={(e) => setPaymentDetails({...paymentDetails, customerEmail: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Creating Payment...' : 'Create Payment'}
            </button>
          </form>
          
          {paymentUrl && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-2">Payment Created!</h3>
              <p className="text-sm text-green-600 mb-3">Use this URL to complete the payment:</p>
              <div className="bg-white p-3 rounded border border-gray-200 break-all">
                <a 
                  href={paymentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {paymentUrl}
                </a>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.open(paymentUrl, '_blank')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Open Payment Page
                </button>
              </div>
              
              {/* Add note about Solana wallet requirement if SOL is selected */}
              {(paymentDetails.currency === 'SOL' || paymentDetails.currency === 'USDC_SOL') && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> This payment requires a Phantom wallet. Make sure you have it installed before proceeding.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPay;