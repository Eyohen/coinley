// // src/components/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { URL } from '../url';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [merchantData, setMerchantData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const handleLogout = () => {
//     localStorage.removeItem('merchantToken');
//     localStorage.removeItem('merchantData');
//     navigate('/login');
//   };

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       // First check if we have merchantData in localStorage
//       const storedData = localStorage.getItem('merchantData');
      
//       if (!storedData) {
//         console.error('No merchant data found in localStorage');
//         navigate('/login');
//         return;
//       }
      
//       const stored = JSON.parse(storedData);
//       console.log('Stored merchant data:', stored);
      
//       // If we can't get data from the API, at least show what we have in localStorage
//       setMerchantData({
//         merchant: stored,
//         recentPayments: []
//       });
      
//       // Try to get fresh data from the API
//       const response = await axios.get(
//         `${URL}/api/merchants/dashboard`,
//         {
//           headers: {
//             'x-api-key': stored.apiKey,
//             'x-api-secret': stored.apiSecret
//           }
//         }
//       );
      
//       console.log('Dashboard API response:', response.data);
//       setMerchantData(response.data);
//     } catch (error) {
//       console.error('Error loading dashboard:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="text-xl">Loading dashboard...</div>
//     </div>;
//   }

//   // Debugging: show what data we have
//   console.log('Rendering dashboard with data:', merchantData);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
        
//         <div className="bg-white rounded-lg shadow p-6 mb-8">
//           <h2 className="text-xl font-semibold mb-4">Merchant Information</h2>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Business Name</label>
//               <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md">
//                 {merchantData?.merchant?.businessName || 'Not available'}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md">
//                 {merchantData?.merchant?.email || 'Not available'}
//               </div>
//             </div>
//           </div>

//           <h2 className="text-xl font-semibold mb-4 mt-6">API Credentials</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">API Key</label>
//               <input
//                 type="text"
//                 readOnly
//                 value={merchantData?.merchant?.apiKey || 'Not available'}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">API Secret</label>
//               <input
//                 type="text"
//                 readOnly
//                 value={merchantData?.merchant?.apiSecret || 'Not available'}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
//               />
//             </div>
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700">Webhook Secret</label>
//               <input
//                 type="text"
//                 readOnly
//                 value={merchantData?.merchant?.webhookSecret || 'Not available'}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
//           {merchantData?.recentPayments?.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead>
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {merchantData.recentPayments.map((payment) => (
//                     <tr key={payment.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {payment.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {payment.amount} USDT
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {payment.status}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {new Date(payment.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-4 text-gray-500">
//               No payment transactions found
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { URL } from '../url';
import EditProfile from './EditProfile';

const Dashboard = () => {
  const navigate = useNavigate();
  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('merchantToken');
    localStorage.removeItem('merchantData');
    navigate('/login');
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // First check if we have merchantData in localStorage
      const storedData = localStorage.getItem('merchantData');
      
      if (!storedData) {
        console.error('No merchant data found in localStorage');
        navigate('/login');
        return;
      }
      
      const stored = JSON.parse(storedData);
      console.log('Stored merchant data:', stored);
      
      // If we can't get data from the API, at least show what we have in localStorage
      setMerchantData({
        merchant: stored,
        recentPayments: []
      });
      
      // Try to get fresh data from the API
      const response = await axios.get(
        `${URL}/api/merchants/dashboard`,
        {
          headers: {
            'x-api-key': stored.apiKey,
            'x-api-secret': stored.apiSecret
          }
        }
      );
      
      console.log('Dashboard API response:', response.data);
      setMerchantData(response.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedMerchant) => {
    setMerchantData({
      ...merchantData,
      merchant: updatedMerchant
    });
    setShowEditProfile(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-xl">Loading dashboard...</div>
    </div>;
  }

  // Debugging: show what data we have
  console.log('Rendering dashboard with data:', merchantData);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        
        {showEditProfile ? (
          <EditProfile 
            merchant={merchantData?.merchant}
            onUpdate={handleProfileUpdate}
            onCancel={() => setShowEditProfile(false)}
          />
        ) : (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Merchant Information</h2>
              <button
                onClick={() => setShowEditProfile(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md">
                  {merchantData?.merchant?.businessName || 'Not available'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md">
                  {merchantData?.merchant?.email || 'Not available'}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Ethereum Wallet Address</label>
              <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm break-all">
                {merchantData?.merchant?.walletAddress || 'Not set'}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Solana Wallet Address
                {!merchantData?.merchant?.solWalletAddress && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Not Set
                  </span>
                )}
              </label>
              <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm break-all">
                {merchantData?.merchant?.solWalletAddress || 'Not set - edit profile to add a Solana wallet address'}
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 mt-6">API Credentials</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">API Key</label>
                <input
                  type="text"
                  readOnly
                  value={merchantData?.merchant?.apiKey || 'Not available'}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Secret</label>
                <input
                  type="text"
                  readOnly
                  value={merchantData?.merchant?.apiSecret || 'Not available'}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Webhook Secret</label>
                <input
                  type="text"
                  readOnly
                  value={merchantData?.merchant?.webhookSecret || 'Not available'}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
          {merchantData?.recentPayments?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {merchantData.recentPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.currency || 'USDT'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No payment transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;