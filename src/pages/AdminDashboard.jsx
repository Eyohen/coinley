// // src/components/AdminDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { URL } from '../url';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [merchants, setMerchants] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [feeRevenue, setFeeRevenue] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('adminData');
//     navigate('/admin/login');
//   };

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       // Check if we have adminData in localStorage
//       const storedData = localStorage.getItem('adminData');
      
//       if (!storedData) {
//         console.error('No admin data found in localStorage');
//         navigate('/admin/login');
//         return;
//       }
      
//       const stored = JSON.parse(storedData);
//       const token = localStorage.getItem('adminToken');
      
//       if (!token) {
//         navigate('/admin/login');
//         return;
//       }
      
//       // Get admin dashboard data
//       const response = await axios.get(
//         `${URL}/api/admin/dashboard`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );
      
//       console.log('Admin Dashboard API response:', response.data);
//       setMerchants(response.data.merchants);
//       setTransactions(response.data.feeTransactions);
//       setFeeRevenue(response.data.totalFeeRevenue);
//     } catch (error) {
//       console.error('Error loading admin dashboard:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleMerchantStatus = async (merchantId, currentStatus) => {
//     try {
//       const token = localStorage.getItem('adminToken');
      
//       const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      
//       await axios.put(
//         `${URL}/api/admin/merchants/${merchantId}/status`,
//         { status: newStatus },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );
      
//       // Update the merchant status in the local state
//       setMerchants(merchants.map(merchant => 
//         merchant.id === merchantId 
//           ? {...merchant, status: newStatus} 
//           : merchant
//       ));
//     } catch (error) {
//       console.error('Error updating merchant status:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-xl">Loading admin dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <button
//                 onClick={handleLogout}
//                 className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="py-6">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Revenue Summary */}
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Revenue Summary</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
//                 <h3 className="text-sm font-medium text-green-800">Total Fee Revenue</h3>
//                 <p className="mt-1 text-3xl font-semibold text-green-600">${feeRevenue.toFixed(4)}</p>
//               </div>
//               <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
//                 <h3 className="text-sm font-medium text-blue-800">Total Merchants</h3>
//                 <p className="mt-1 text-3xl font-semibold text-blue-600">{merchants.length}</p>
//               </div>
//               <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
//                 <h3 className="text-sm font-medium text-purple-800">Total Fee Transactions</h3>
//                 <p className="mt-1 text-3xl font-semibold text-purple-600">{transactions.length}</p>
//               </div>
//             </div>
//           </div>
          
//           {/* Merchants List */}
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Merchants</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Business Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Wallet Address
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {merchants.map((merchant) => (
//                     <tr key={merchant.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {merchant.businessName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {merchant.email}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
//                         {merchant.walletAddress}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           merchant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           {merchant.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => toggleMerchantStatus(merchant.id, merchant.status)}
//                           className={`px-3 py-1 rounded-md text-sm font-medium text-white ${
//                             merchant.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
//                           }`}
//                         >
//                           {merchant.status === 'active' ? 'Suspend' : 'Activate'}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {merchants.length === 0 && (
//                 <div className="text-center py-4 text-gray-500">
//                   No merchants found
//                 </div>
//               )}
//             </div>
//           </div>
          
//           {/* Fee Transactions */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Fee Transactions</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Merchant
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Original Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Fee Amount (1.75%)
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Currency
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {transactions.map((transaction) => (
//                     <tr key={transaction.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {transaction.id.slice(0, 8)}...
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {transaction.merchantName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         ${parseFloat(transaction.originalAmount).toFixed(4)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         ${parseFloat(transaction.feeAmount).toFixed(4)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {transaction.currency}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(transaction.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {transactions.length === 0 && (
//                 <div className="text-center py-4 text-gray-500">
//                   No fee transactions found
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;







// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../url';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState([]);
  const [merchantsMetadata, setMerchantsMetadata] = useState({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1
  });
  
  const [transactions, setTransactions] = useState([]);
  const [transactionsMetadata, setTransactionsMetadata] = useState({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1
  });
  
  const [feeRevenue, setFeeRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    currencies: []
  });
  
  // Filter states
  const [merchantSearch, setMerchantSearch] = useState('');
  const [transactionSearch, setTransactionSearch] = useState('');
  const [merchantStatus, setMerchantStatus] = useState('');
  const [currency, setCurrency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Debounced search to prevent too many API calls
  const [debouncedMerchantSearch, setDebouncedMerchantSearch] = useState('');
  const [debouncedTransactionSearch, setDebouncedTransactionSearch] = useState('');
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  // Debounce search inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMerchantSearch(merchantSearch);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [merchantSearch]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTransactionSearch(transactionSearch);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [transactionSearch]);
  
  // Load data when filters change
  useEffect(() => {
    loadDashboard(1, 4, 'merchants');
  }, [debouncedMerchantSearch, merchantStatus]);
  
  useEffect(() => {
    loadDashboard(1, 4, 'transactions');
  }, [debouncedTransactionSearch, currency, startDate, endDate]);

  useEffect(() => {
    loadDashboard();
  }, []);

  // const loadDashboard = async (page = 1, limit = 4, refreshType = 'all') => {
  //   try {
  //     // Check if we have adminData in localStorage
  //     const storedData = localStorage.getItem('adminData');
      
  //     if (!storedData) {
  //       console.error('No admin data found in localStorage');
  //       navigate('/admin/login');
  //       return;
  //     }
      
  //     const stored = JSON.parse(storedData);
  //     const token = localStorage.getItem('adminToken');
      
  //     if (!token) {
  //       navigate('/admin/login');
  //       return;
  //     }
      
  //     // Build query parameters
  //     const params = new URLSearchParams();
      
  //     if (refreshType === 'all' || refreshType === 'merchants') {
  //       params.append('merchantPage', page);
  //       params.append('merchantLimit', limit);
  //       if (debouncedMerchantSearch) params.append('merchantSearch', debouncedMerchantSearch);
  //       if (merchantStatus) params.append('merchantStatus', merchantStatus);
  //     }
      
  //     if (refreshType === 'all' || refreshType === 'transactions') {
  //       params.append('transactionPage', page);
  //       params.append('transactionLimit', limit);
  //       if (debouncedTransactionSearch) params.append('transactionSearch', debouncedTransactionSearch);
  //       if (currency) params.append('currency', currency);
  //       if (startDate) params.append('startDate', startDate);
  //       if (endDate) params.append('endDate', endDate);
  //     }
      
  //     // Get admin dashboard data
  //     const response = await axios.get(
  //       `${URL}/api/admin/dashboard?${params.toString()}`,
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       }
  //     );
      
  //     console.log('Admin Dashboard API response:', response.data);
      
  //     if (refreshType === 'all' || refreshType === 'merchants') {
  //       setMerchants(response.data.merchants.data);
  //       setMerchantsMetadata({
  //         totalCount: response.data.merchants.totalCount,
  //         totalPages: response.data.merchants.totalPages,
  //         currentPage: response.data.merchants.currentPage
  //       });
  //     }
      
  //     if (refreshType === 'all' || refreshType === 'transactions') {
  //       setTransactions(response.data.feeTransactions.data);
  //       setTransactionsMetadata({
  //         totalCount: response.data.feeTransactions.totalCount,
  //         totalPages: response.data.feeTransactions.totalPages,
  //         currentPage: response.data.feeTransactions.currentPage
  //       });
  //     }
      
  //     setFeeRevenue(response.data.totalFeeRevenue);
  //     setFilters(response.data.filters || { currencies: [] });
  //   } catch (error) {
  //     console.error('Error loading admin dashboard:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  // Modified loadDashboard function for AdminDashboard.jsx

const loadDashboard = async (page = 1, limit = 4, refreshType = 'all') => {
  try {
     // Check if we have adminData in localStorage
     const storedData = localStorage.getItem('adminData');
    
     if (!storedData) {
       console.error('No admin data found in localStorage');
       navigate('/admin/login');
       return;
     }
     
     const stored = JSON.parse(storedData);
     const token = localStorage.getItem('adminToken'); // Make sure we define token
     
     if (!token) {
       navigate('/admin/login');
       return;
     }
    
    // Get admin dashboard data
    const response = await axios.get(
      `${URL}/api/admin/dashboard`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Admin Dashboard API response:', response.data);
    
    // Handle current API structure (direct arrays)
    if (Array.isArray(response.data.merchants)) {
      // Apply client-side pagination for merchants
      const allMerchants = response.data.merchants;
      const filteredMerchants = allMerchants.filter(merchant => {
        // Apply search and status filters
        const matchesSearch = !debouncedMerchantSearch || 
          merchant.businessName.toLowerCase().includes(debouncedMerchantSearch.toLowerCase()) ||
          merchant.email.toLowerCase().includes(debouncedMerchantSearch.toLowerCase()) ||
          (merchant.walletAddress && merchant.walletAddress.toLowerCase().includes(debouncedMerchantSearch.toLowerCase()));
        
        const matchesStatus = !merchantStatus || merchant.status === merchantStatus;
        
        return matchesSearch && matchesStatus;
      });
      
      // Calculate pagination
      const totalCount = filteredMerchants.length;
      const totalPages = Math.ceil(totalCount / limit);
      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
      const paginatedMerchants = filteredMerchants.slice(startIdx, endIdx);
      
      setMerchants(paginatedMerchants);
      setMerchantsMetadata({
        totalCount,
        totalPages,
        currentPage: page
      });
    }
    
    // Same approach for transactions
    if (Array.isArray(response.data.feeTransactions)) {
      const allTransactions = response.data.feeTransactions;
      const filteredTransactions = allTransactions.filter(transaction => {
        // Apply search and filters
        const matchesSearch = !debouncedTransactionSearch || 
          transaction.merchantName.toLowerCase().includes(debouncedTransactionSearch.toLowerCase());
        
        const matchesCurrency = !currency || transaction.currency === currency;
        
        // Apply date filters if needed
        let matchesDateRange = true;
        if (startDate || endDate) {
          const txDate = new Date(transaction.createdAt);
          if (startDate) {
            const startDateObj = new Date(startDate);
            matchesDateRange = matchesDateRange && txDate >= startDateObj;
          }
          if (endDate) {
            const endDateObj = new Date(endDate);
            endDateObj.setHours(23, 59, 59, 999); // End of day
            matchesDateRange = matchesDateRange && txDate <= endDateObj;
          }
        }
        
        return matchesSearch && matchesCurrency && matchesDateRange;
      });
      
      // Calculate pagination
      const totalCount = filteredTransactions.length;
      const totalPages = Math.ceil(totalCount / limit);
      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
      const paginatedTransactions = filteredTransactions.slice(startIdx, endIdx);
      
      setTransactions(paginatedTransactions);
      setTransactionsMetadata({
        totalCount,
        totalPages,
        currentPage: page
      });
      
      // Extract unique currencies for filter dropdown
      const uniqueCurrencies = [...new Set(allTransactions.map(t => t.currency))];
      setFilters({
        currencies: uniqueCurrencies
      });
    }
    
    setFeeRevenue(response.data.totalFeeRevenue);
  } catch (error) {
    console.error('Error loading admin dashboard:', error);
  } finally {
    setLoading(false);
  }
};
  
  const toggleMerchantStatus = async (merchantId, currentStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      
      await axios.put(
        `${URL}/api/admin/merchants/${merchantId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Update the merchant status in the local state
      setMerchants(merchants.map(merchant => 
        merchant.id === merchantId 
          ? {...merchant, status: newStatus} 
          : merchant
      ));
    } catch (error) {
      console.error('Error updating merchant status:', error);
    }
  };

  const handleMerchantPageChange = (page) => {
    loadDashboard(page, 4, 'merchants');
  };
  
  const handleTransactionPageChange = (page) => {
    loadDashboard(page, 4, 'transactions');
  };
  
  const resetMerchantFilters = () => {
    setMerchantSearch('');
    setMerchantStatus('');
    // The search will be debounced, so loadDashboard will be triggered by useEffect
  };
  
  const resetTransactionFilters = () => {
    setTransactionSearch('');
    setCurrency('');
    setStartDate('');
    setEndDate('');
    // The search will be debounced, so loadDashboard will be triggered by useEffect
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  const renderPagination = (metadata, onPageChange) => {
    const { currentPage, totalPages } = metadata;
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-4">
        <nav className="inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
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
              onClick={() => onPageChange(i + 1)}
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
            onClick={() => onPageChange(currentPage + 1)}
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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Revenue Summary */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Revenue Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Total Fee Revenue</h3>
                <p className="mt-1 text-3xl font-semibold text-green-600">${feeRevenue.toFixed(4)}</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Total Merchants</h3>
                <p className="mt-1 text-3xl font-semibold text-blue-600">{merchantsMetadata.totalCount}</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">Total Fee Transactions</h3>
                <p className="mt-1 text-3xl font-semibold text-purple-600">{transactionsMetadata.totalCount}</p>
              </div>
            </div>
          </div>
          
          {/* Merchants List */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Merchants</h2>
              <div className="flex space-x-2">
                <button
                  onClick={resetMerchantFilters}
                  className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Merchant Search and Filters */}
            <div className="mb-4 flex flex-wrap gap-4">
              <div className="w-full md:w-64">
                <label htmlFor="merchantSearch" className="block text-sm font-medium text-gray-700">Search</label>
                <input
                  type="text"
                  id="merchantSearch"
                  value={merchantSearch}
                  onChange={(e) => setMerchantSearch(e.target.value)}
                  placeholder="Search by name, email, wallet..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
              <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="statusFilter"
                  value={merchantStatus}
                  onChange={(e) => setMerchantStatus(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wallet Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {merchants?.map((merchant) => (
                    <tr key={merchant.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {merchant.businessName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {merchant.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {merchant.walletAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          merchant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {merchant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleMerchantStatus(merchant.id, merchant.status)}
                          className={`px-3 py-1 rounded-md text-sm font-medium text-white ${
                            merchant.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          {merchant.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {merchants?.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No merchants found
                </div>
              )}
            </div>
            
            {/* Merchant Pagination */}
            {renderPagination(merchantsMetadata, handleMerchantPageChange)}
          </div>
          
          {/* Fee Transactions */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Fee Transactions</h2>
              <div className="flex space-x-2">
                <button
                  onClick={resetTransactionFilters}
                  className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Transaction Search and Filters */}
            <div className="mb-4 flex flex-wrap gap-4">
              <div className="w-full md:w-64">
                <label htmlFor="transactionSearch" className="block text-sm font-medium text-gray-700">Search Merchant</label>
                <input
                  type="text"
                  id="transactionSearch"
                  value={transactionSearch}
                  onChange={(e) => setTransactionSearch(e.target.value)}
                  placeholder="Search by merchant name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
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
                      Merchant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fee Amount (1.75%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions?.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.merchantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${parseFloat(transaction.originalAmount).toFixed(4)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${parseFloat(transaction.feeAmount).toFixed(4)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {transactions?.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No fee transactions found
                </div>
              )}
            </div>
            
            {/* Transaction Pagination */}
            {renderPagination(transactionsMetadata, handleTransactionPageChange)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;