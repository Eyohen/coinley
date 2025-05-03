// // src/components/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { URL } from '../url';
// import EditProfile from './EditProfile';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [merchantData, setMerchantData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showEditProfile, setShowEditProfile] = useState(false);

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

//   const handleProfileUpdate = (updatedMerchant) => {
//     setMerchantData({
//       ...merchantData,
//       merchant: updatedMerchant
//     });
//     setShowEditProfile(false);
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
        
//         {showEditProfile ? (
//           <EditProfile 
//             merchant={merchantData?.merchant}
//             onUpdate={handleProfileUpdate}
//             onCancel={() => setShowEditProfile(false)}
//           />
//         ) : (
//           <div className="bg-white rounded-lg shadow p-6 mb-8">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Merchant Information</h2>
//               <button
//                 onClick={() => setShowEditProfile(true)}
//                 className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//               >
//                 Edit Profile
//               </button>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Business Name</label>
//                 <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md">
//                   {merchantData?.merchant?.businessName || 'Not available'}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md">
//                   {merchantData?.merchant?.email || 'Not available'}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700">Ethereum Wallet Address</label>
//               <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm break-all">
//                 {merchantData?.merchant?.walletAddress || 'Not set'}
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700">
//                 Solana Wallet Address
//                 {!merchantData?.merchant?.solWalletAddress && (
//                   <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                     Not Set
//                   </span>
//                 )}
//               </label>
//               <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm break-all">
//                 {merchantData?.merchant?.solWalletAddress || 'Not set - edit profile to add a Solana wallet address'}
//               </div>
//             </div>

//             <h2 className="text-xl font-semibold mb-4 mt-6">API Credentials</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">API Key</label>
//                 <input
//                   type="text"
//                   readOnly
//                   value={merchantData?.merchant?.apiKey || 'Not available'}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">API Secret</label>
//                 <input
//                   type="text"
//                   readOnly
//                   value={merchantData?.merchant?.apiSecret || 'Not available'}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
//                 />
//               </div>
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700">Webhook Secret</label>
//                 <input
//                   type="text"
//                   readOnly
//                   value={merchantData?.merchant?.webhookSecret || 'Not available'}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

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
//                       Currency
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
//                         {payment.amount}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {payment.currency || 'USDT'}
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
import PaymentStats from '../components/PaymentStats';

const Dashboard = () => {
  const navigate = useNavigate();
  const [merchantData, setMerchantData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentsMetadata, setPaymentsMetadata] = useState({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [filters, setFilters] = useState({
    currencies: [],
    statuses: []
  });
  
  // Filter states
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currency, setCurrency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Debounced search to prevent too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('merchantToken');
    localStorage.removeItem('merchantData');
    navigate('/login');
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [search]);
  
  // Load data when filters change
  useEffect(() => {
    loadDashboard(1);
  }, [debouncedSearch, status, currency, startDate, endDate]);
  
  // Initial load
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async (page = 1) => {
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
        merchant: stored
      });
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 4); // Show 4 transactions per page
      
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (status) params.append('status', status);
      if (currency) params.append('currency', currency);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      // Try to get fresh data from the API
      const response = await axios.get(
        `${URL}/api/merchants/dashboard?${params.toString()}`,
        {
          headers: {
            'x-api-key': stored.apiKey,
            'x-api-secret': stored.apiSecret
          }
        }
      );
      
      console.log('Dashboard API response:', response.data);
      
      setMerchantData({
        merchant: response.data.merchant
      });
      
      setPayments(response.data.payments.data || []);
      setPaymentsMetadata({
        totalCount: response.data.payments.totalCount,
        totalPages: response.data.payments.totalPages,
        currentPage: response.data.payments.currentPage
      });
      
      setFilters({
        currencies: response.data.filters?.currencies || [],
        statuses: response.data.filters?.statuses || []
      });
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
  
  const handlePageChange = (page) => {
    loadDashboard(page);
  };
  
  const resetFilters = () => {
    setSearch('');
    setStatus('');
    setCurrency('');
    setStartDate('');
    setEndDate('');
    // The search will be debounced, so loadDashboard will be triggered by useEffect
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-xl">Loading dashboard...</div>
    </div>;
  }

  const renderPagination = () => {
    const { currentPage, totalPages } = paymentsMetadata;
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-4">
        <nav className="inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
              currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            &laquo;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                currentPage === i + 1
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
              currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            &raquo;
          </button>
        </nav>
      </div>
    );
  };

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

{!showEditProfile && (
  <div className="bg-white rounded-lg shadow p-6 mb-8">
    <h2 className="text-xl font-semibold mb-4">Payment Analytics</h2>
    <PaymentStats />
  </div>
)}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Payment Transactions</h2>
            <div className="flex space-x-2">
              <button
                onClick={resetFilters}
                className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Payment Search and Filters */}
          <div className="mb-4 flex flex-wrap gap-4">
            <div className="w-full md:w-64">
              <label htmlFor="paymentSearch" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="paymentSearch"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID or transaction hash"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="statusFilter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              >
                <option value="">All Statuses</option>
                {filters.statuses.map((stat, index) => (
                  <option key={index} value={stat}>{stat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="currencyFilter" className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                id="currencyFilter"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              >
                <option value="">All Currencies</option>
                {filters.currencies.map((curr, index) => (
                  <option key={index} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
                {payments.map((payment) => (
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
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : payment.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {payments.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No payment transactions found
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {renderPagination()}
          
          {/* Payment Stats */}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Total Transactions</p>
                <p className="text-lg font-semibold">{paymentsMetadata.totalCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-lg font-semibold text-green-600">
                  {payments.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-lg font-semibold text-yellow-600">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Failed</p>
                <p className="text-lg font-semibold text-red-600">
                  {payments.filter(p => p.status === 'failed').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;