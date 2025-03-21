
// // src/components/Payment.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Web3 from 'web3';
// import axios from 'axios';
// import { URL } from '../url';


// // Account Selection Modal Component
// const AccountSelectionModal = ({ 
//   isOpen, 
//   onClose, 
//   accounts, 
//   onSelectAccount,
//   web3 
// }) => {
//   const [accountBalances, setAccountBalances] = useState({});

//   // Fetch balances for all accounts
//   useEffect(() => {
//     const fetchBalances = async () => {
//       if (!web3 || !accounts.length) return;

//       const balancesMap = {};
//       for (const account of accounts) {
//         try {
//           const balanceWei = await web3.eth.getBalance(account);
//           // Convert balance from Wei to Ether
//           balancesMap[account] = web3.utils.fromWei(balanceWei, 'ether');
//         } catch (error) {
//           console.error(`Error fetching balance for ${account}:`, error);
//           balancesMap[account] = '0';
//         }
//       }
//       setAccountBalances(balancesMap);
//     };

//     fetchBalances();
//   }, [accounts, web3]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">Select Account</h2>
        
//         <div className="space-y-3">
//           {accounts.map((account) => (
//             <div 
//               key={account}
//               onClick={() => {
//                 onSelectAccount(account);
//                 onClose();
//               }}
//               className="cursor-pointer hover:bg-gray-100 p-3 rounded-md transition-colors border"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-medium text-gray-800">
//                     {account.slice(0, 6)}...{account.slice(-4)}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Balance: {accountBalances[account] || '0'} ETH
//                   </p>
//                 </div>
//                 <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
//                   Select
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button 
//           onClick={onClose}
//           className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };


// // Simple ERC-20 ABI for token transfers (only the functions we need)
// const ERC20_ABI = [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "name": "balance",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// // USDT contract addresses (use testnet for testing)
// const TOKEN_ADDRESSES = {
//   'USDT': {
//     '0x1': '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Mainnet
//     '0x5': '0x509Ee0d083DdF8AC028f2a56731412edD63223B9',  // Goerli
//     '0xaa36a7': '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06', // Sepolia
//     '0x61': '0x337610d27c682E715CC0c365C96102a1fcF59c753' // BSC Testnet
//   },
//   'USDC': {
//     '0x1': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Mainnet
//     '0x5': '0x07865c6e87b9f70255377e024ace6630c1eaa37f',  // Goerli
//     '0xaa36a7': '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Sepolia
//     '0x61': '0x64544969ed7EBf5f83a6c2B9E46e4853f45B7934' // BSC Testnet
//   },
//   'BNB': {
//      '0x1': '0x0000000000000000000000000000000000000000', // Mainnet
//     '0x5': '0x0000000000000000000000000000000000000000', // Goerli 
//     '0xaa36a7': '0x0000000000000000000000000000000000000000', // Sepolia
//     '0x61': '0x0000000000000000000000000000000000000000' // BSC Testnet
//   }
// };

// // Add token decimal places configuration
// const TOKEN_DECIMALS = {
//   'USDT': 6,
//   'USDC': 6,
//   'BNB': 18 // BNB has 18 decimal places
// };

// const Payment = () => {
//   const { paymentId } = useParams();
//   const [payment, setPayment] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [chainId, setChainId] = useState(null);
//   const [txHash, setTxHash] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [web3, setWeb3] = useState(null);

//   const FEE_PERCENTAGE = 0.0175; // 1.75%

//   useEffect(() => {
//     const initWeb3 = async () => {
//       if (window.ethereum) {
//         try {
//           const web3Instance = new Web3(window.ethereum);
//           setWeb3(web3Instance);
          
//           // Get current chain ID
//           const networkId = await web3Instance.eth.getChainId();
//           setChainId(`0x${networkId.toString(16)}`);
          
//           // Get accounts if already connected
//           const accounts = await web3Instance.eth.getAccounts();
//           if (accounts.length > 0) {
//             setAccount(accounts[0]);
//           }
          
//           // Listen for chain changes
//           window.ethereum.on('chainChanged', (newChainId) => {
//             setChainId(newChainId);
//           });
          
//           // Listen for account changes
//           window.ethereum.on('accountsChanged', (newAccounts) => {
//             setAccount(newAccounts[0] || null);
//           });
//         } catch (error) {
//           console.error('Web3 initialization error:', error);
//         }
//       }
//     };
    
//     initWeb3();
//     loadPaymentDetails();
//   }, [paymentId]);

//   const loadPaymentDetails = async () => {
//     try {
//       setLoading(true);
//       console.log('Loading payment details for ID:', paymentId);
//       const response = await axios.get(`${URL}/api/payments/${paymentId}`);
//       console.log('Payment details:', response.data);
//       setPayment(response.data.payment);
//     } catch (error) {
//       console.error('Error loading payment:', error);
//       setError('Payment not found or has expired');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) {
//         setError('Please install MetaMask to make payments');
//         return;
//       }

//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       setAccount(accounts[0]);

      
//       // Check if on the right network
//       const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
//       setChainId(currentChainId);
      
//       // For simplicity, we'll use both mainnet and Goerli and Sepolia
//       if (currentChainId !== '0x1' && currentChainId !== '0x5' && currentChainId !== '0xaa36a7') {
//         try {
//           // Try to switch to sepolia for testing
//           await window.ethereum.request({
//             method: 'wallet_switchEthereumChain',
//             params: [{ chainId: '0xaa36a7' }], // Sepolia
//           });
//         } catch (switchError) {
//           setError('Please switch to a supported network in your wallet');
//         }
//       }

//   // If payment currency is BNB, switch to BSC network
//   if (payment?.currency === 'BNB') {
//     try {
//       await window.ethereum.request({
//         method: 'wallet_switchEthereumChain',
//         params: [{ chainId: '0x61' }], // BSC Testnet
//       });
//     } catch (switchError) {
//       // This error code means the chain is not added to MetaMask
//       if (switchError.code === 4902) {
//         try {
//           await window.ethereum.request({
//             method: 'wallet_addEthereumChain',
//             params: [
//               {
//                 chainId: '0x61',
//                 chainName: 'BSC Testnet',
//                 nativeCurrency: {
//                   name: 'BNB',
//                   symbol: 'BNB',
//                   decimals: 18
//                 },
//                 rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
//                 blockExplorerUrls: ['https://testnet.bscscan.com/']
//               }
//             ]
//           });
//         } catch (addError) {
//           setError('Could not add BSC network to your wallet');
//         }
//       }
//     }
//   }

//     } catch (error) {
//       console.error('Error connecting wallet:', error);
//       setError('Failed to connect wallet');
//     }
//   };


//   const handlePayment = async () => {
//     if (!account || !payment || !web3) {
//       setError('Please connect your wallet first');
//       return;
//     }

//     setProcessing(true);
//     setError('');

//     try {
//       // Specific handling for BNB payment
//       if (payment.currency === 'BNB') {
//         // Try to switch to BSC Testnet if not already on it
//         if (chainId !== '0x61') {
//           try {
//             await window.ethereum.request({
//               method: 'wallet_switchEthereumChain',
//               params: [{ chainId: '0x61' }], // BSC Testnet
//             });
            
//             // Refresh chain ID after switch
//             const newChainId = await web3.eth.getChainId();
//             setChainId(`0x${newChainId.toString(16)}`);
//           } catch (switchError) {
//             // This error code means the chain hasn't been added to MetaMask
//             if (switchError.code === 4902) {
//               try {
//                 await window.ethereum.request({
//                   method: 'wallet_addEthereumChain',
//                   params: [
//                     {
//                       chainId: '0x61',
//                       chainName: 'BSC Testnet',
//                       nativeCurrency: {
//                         name: 'BNB',
//                         symbol: 'BNB',
//                         decimals: 18
//                       },
//                       rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
//                       blockExplorerUrls: ['https://testnet.bscscan.com/']
//                     }
//                   ]
//                 });
//               } catch (addError) {
//                 throw new Error('Could not add BSC network to your wallet');
//               }
//             } else {
//               throw new Error('Failed to switch to BSC network');
//             }
//           }
//         }
//       }

//       // Get token contract based on currency and chain ID
//       const tokenAddress = TOKEN_ADDRESSES[payment.currency]?.[chainId];
//       if (!tokenAddress) {
//         throw new Error(`${payment.currency} is not supported on this network (Chain ID: ${chainId})`);
//       }
      
//       console.log(`Using token contract at ${tokenAddress} for ${payment.currency}`);
      
//       // Check if we're doing a simulated transaction for testing
//       const isSimulation = process.env.NODE_ENV === 'development' || !payment.walletAddress;
      
//       let transactionHash;
      
//       if (isSimulation) {
//         // For testing/demo purposes, generate a fake hash
//         console.log('SIMULATION MODE: Generating fake transaction hash');
//         transactionHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
//       } else {
//         // Determine decimals for the token/coin
//         const decimals = TOKEN_DECIMALS[payment.currency] || 6;
//         const amount = web3.utils.toBN(
//           Math.floor(parseFloat(payment.amount) * Math.pow(10, decimals))
//         );
        
//         console.log(`Sending ${amount.toString()} units of ${payment.currency} to ${payment.walletAddress}`);
        
//         if (payment.currency === 'BNB') {
//           // For native BNB, use sendTransaction
//           const receipt = await web3.eth.sendTransaction({
//             from: account,
//             to: payment.walletAddress,
//             value: amount
//           });
          
//           transactionHash = receipt.transactionHash;
//         } else {
//           // For ERC20 tokens
//           const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
          
//           const receipt = await contract.methods
//             .transfer(payment.walletAddress, amount)
//             .send({ from: account });
          
//           transactionHash = receipt.transactionHash;
//         }
//       }
      
//       console.log('Transaction hash:', transactionHash);
//       setTxHash(transactionHash);
      
//       // Notify backend of successful payment
//       const response = await axios.post(`${URL}/api/payments/process`, {
//         paymentId: payment.id,
//         transactionHash: transactionHash
//       });
      
//       console.log('Payment processed:', response.data);
//       setSuccess(true);
//     } catch (error) {
//       console.error('Payment error:', error);
//       setError(`Payment failed: ${error.message || 'Unknown error'}`);
//     } finally {
//       setProcessing(false);
//     }
//   };
  
//   const handleEthPayment = async () => {
//     if (!account || !payment || !web3) {
//       setError('Please connect your wallet first');
//       return;
//     }

//     setProcessing(true);
//     setError('');

//     try {
//       // For testing/demo purposes, we'll just send a small amount of ETH
//       console.log(`Sending ETH payment to ${payment.walletAddress}`);
      
//       // Use a test wallet if real wallet not available
//       const recipientAddress = payment.walletAddress || '0x1234567890123456789012345678901234567890';
      
//       // Convert to wei (smallest ETH unit)
//       const amount = web3.utils.toWei('0.001', 'ether'); // Small test amount
      
//       // Send transaction
//       const receipt = await web3.eth.sendTransaction({
//         from: account,
//         to: recipientAddress,
//         value: amount
//       });
      
//       console.log('Transaction receipt:', receipt);
//       setTxHash(receipt.transactionHash);
      
//       // Notify backend of successful payment
//       const response = await axios.post(`${URL}/api/payments/process`, {
//         paymentId: payment.id,
//         transactionHash: receipt.transactionHash
//       });
      
//       console.log('Payment processed:', response.data);
//       setSuccess(true);
//     } catch (error) {
//       console.error('ETH payment error:', error);
//       setError(`Payment failed: ${error.message || 'Unknown error'}`);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-xl">Loading payment details...</div>
//       </div>
//     );
//   }

//   if (error && !payment) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//           <div className="text-red-500 font-bold text-xl mb-4">Error</div>
//           <p className="text-gray-700">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (success) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
//           <div className="text-green-500 font-bold text-2xl mb-4">Payment Successful!</div>
//           <p className="text-gray-700 mb-4">
//             Your payment of {payment.amount} {payment.currency} has been completed.
//           </p>
//           <p className="text-sm text-gray-500 mb-4">Transaction Hash: {txHash}</p>
//           <button
//             onClick={() => window.close()}
//             className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
//           Payment Request
//         </h2>
        
//         {error && (
//           <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
//             {error}
//           </div>
//         )}
        
//         <div className="space-y-6">
//           <div className="text-center">
//             <p className="text-gray-700 mb-2">Payment to</p>
//             <p className="font-semibold">{payment?.merchantName}</p>
//           </div>

//             {/* Updated payment information section with fee breakdown */}
//             <div className="text-center">
//             <p className="text-4xl font-bold text-gray-900">
//               {payment?.amount} {payment?.currency}
//             </p>
            
//             {/* Show fee breakdown */}
//             <div className="mt-2 text-sm text-gray-500">
//               <div className="flex justify-between px-2">
//                 <span>Product/Service:</span>
//                 <span>{parseFloat(payment?.originalAmount || 0).toFixed(4)} {payment?.currency}</span>
//               </div>
//               <div className="flex justify-between px-2">
//                 <span>Processing Fee (1.75%):</span>
//                 <span>
//                   {payment?.originalAmount 
//                     ? (parseFloat(payment?.originalAmount) * FEE_PERCENTAGE).toFixed(4) 
//                     : '0.0000'} {payment?.currency}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-b border-gray-200 py-4">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Order ID:</span>
//               <span className="text-gray-900 font-medium">{payment?.id?.slice(0, 8)}</span>
//             </div>
//             <div className="flex justify-between text-sm mt-2">
//               <span className="text-gray-500">Date:</span>
//               <span className="text-gray-900 font-medium">
//                 {payment?.createdAt ? new Date(payment.createdAt).toLocaleString() : ''}
//               </span>
//             </div>
//           </div>

          
//           {/* <div className="text-center">
//             <p className="text-4xl font-bold text-gray-900">
//               {payment?.amount} {payment?.currency}
//             </p>
//           </div>

//           <div className="border-t border-b border-gray-200 py-4">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Order ID:</span>
//               <span className="text-gray-900 font-medium">{payment?.id?.slice(0, 8)}</span>
//             </div>
//             <div className="flex justify-between text-sm mt-2">
//               <span className="text-gray-500">Date:</span>
//               <span className="text-gray-900 font-medium">
//                 {payment?.createdAt ? new Date(payment.createdAt).toLocaleString() : ''}
//               </span>
//             </div>
//           </div> */}

//           {!account ? (
//             <button
//               onClick={connectWallet}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex justify-center items-center"
//               disabled={processing}
//             >
//               Connect Wallet
//             </button>
//           ) : (
//             <div className="space-y-3">
//               <button
//                 onClick={handlePayment}
//                 className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex justify-center items-center"
//                 disabled={processing}
//               >
//                 {processing ? 'Processing...' : `Pay with ${payment?.currency}`}
//               </button>
              
//               {/* For testing purposes */}
//               <button
//                 onClick={handleEthPayment}
//                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex justify-center items-center"
//                 disabled={processing}
//               >
//                 {processing ? 'Processing...' : 'Pay with ETH (Test)'}
//               </button>
//             </div>
//           )}
          
//           {account && (
//             <div className="text-center text-sm text-gray-500">
//               Connected: {account.slice(0, 6)}...{account.slice(-4)}
//             </div>
//           )}

//           <div className="text-xs text-center text-gray-500">
//             Powered by COINLEY Payment Gateway
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;






// src/components/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import axios from 'axios';
import { URL } from '../url';
// Add Solana imports
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';

// Account Selection Modal Component remains unchanged
const AccountSelectionModal = ({ 
  isOpen, 
  onClose, 
  accounts, 
  onSelectAccount,
  web3 
}) => {
  const [accountBalances, setAccountBalances] = useState({});

  // Fetch balances for all accounts
  useEffect(() => {
    const fetchBalances = async () => {
      if (!web3 || !accounts.length) return;

      const balancesMap = {};
      for (const account of accounts) {
        try {
          const balanceWei = await web3.eth.getBalance(account);
          // Convert balance from Wei to Ether
          balancesMap[account] = web3.utils.fromWei(balanceWei, 'ether');
        } catch (error) {
          console.error(`Error fetching balance for ${account}:`, error);
          balancesMap[account] = '0';
        }
      }
      setAccountBalances(balancesMap);
    };

    fetchBalances();
  }, [accounts, web3]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Select Account</h2>
        
        <div className="space-y-3">
          {accounts.map((account) => (
            <div 
              key={account}
              onClick={() => {
                onSelectAccount(account);
                onClose();
              }}
              className="cursor-pointer hover:bg-gray-100 p-3 rounded-md transition-colors border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Balance: {accountBalances[account] || '0'} ETH
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Simple ERC-20 ABI for token transfers (only the functions we need)
const ERC20_ABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Update token addresses to include Solana tokens
const TOKEN_ADDRESSES = {
  'USDT': {
    '0x1': '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Mainnet
    '0x5': '0x509Ee0d083DdF8AC028f2a56731412edD63223B9',  // Goerli
    '0xaa36a7': '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06', // Sepolia
    '0x61': '0x337610d27c682E715CC0c365C96102a1fcF59c753' // BSC Testnet
  },
  'USDC': {
    '0x1': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Mainnet
    '0x5': '0x07865c6e87b9f70255377e024ace6630c1eaa37f',  // Goerli
    '0xaa36a7': '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Sepolia
    '0x61': '0x64544969ed7EBf5f83a6c2B9E46e4853f45B7934' // BSC Testnet
  },
  'BNB': {
     '0x1': '0x0000000000000000000000000000000000000000', // Mainnet
    '0x5': '0x0000000000000000000000000000000000000000', // Goerli 
    '0xaa36a7': '0x0000000000000000000000000000000000000000', // Sepolia
    '0x61': '0x0000000000000000000000000000000000000000' // BSC Testnet
  },
  // Add Solana tokens
  'SOL': {
    'mainnet-beta': 'native', // Native SOL
    'devnet': 'native',
    'testnet': 'native'
  },
  'USDC_SOL': {
    'mainnet-beta': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC on Solana mainnet
    'devnet': '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU', // USDC on Solana devnet
    'testnet': 'CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp' // Example address, replace with actual
  }
};

// Add token decimals for Solana tokens
const TOKEN_DECIMALS = {
  'USDT': 6,
  'USDC': 6,
  'BNB': 18, // BNB has 18 decimal places
  'SOL': 9,  // SOL has 9 decimal places (1 SOL = 1,000,000,000 lamports)
  'USDC_SOL': 6 // USDC on Solana has 6 decimal places
};

const Payment = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [web3, setWeb3] = useState(null);
  // Add state for Solana connection
  const [solanaConnection, setSolanaConnection] = useState(null);
  // Add state to track which wallet type we're using
  const [walletType, setWalletType] = useState('ethereum'); // 'ethereum' or 'solana'

  const FEE_PERCENTAGE = 0.0175; // 1.75%
  
  // Helper function to detect wallet type based on currency
  const detectWalletType = (currency) => {
    if (currency === 'SOL' || currency === 'USDC_SOL') {
      return 'solana';
    }
    return 'ethereum';
  };

  useEffect(() => {
    const initWeb3 = async () => {
      // Initialize Web3 for Ethereum
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          
          // Get current chain ID
          const networkId = await web3Instance.eth.getChainId();
          setChainId(`0x${networkId.toString(16)}`);
          
          // Get accounts if already connected
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
          
          // Listen for chain changes
          window.ethereum.on('chainChanged', (newChainId) => {
            setChainId(newChainId);
          });
          
          // Listen for account changes
          window.ethereum.on('accountsChanged', (newAccounts) => {
            setAccount(newAccounts[0] || null);
          });
        } catch (error) {
          console.error('Web3 initialization error:', error);
        }
      }
      
      // Initialize Solana connection
      try {
        // Default to devnet for testing
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        setSolanaConnection(connection);
        
        // Check if Phantom wallet is installed
        if (window.solana && window.solana.isPhantom) {
          // Listen for Phantom connection changes
          window.solana.on('connect', () => {
            if (window.solana.publicKey) {
              setAccount(window.solana.publicKey.toString());
            }
          });
          
          window.solana.on('disconnect', () => {
            if (walletType === 'solana') {
              setAccount(null);
            }
          });
          
          // If already connected, set the account
          if (window.solana.isConnected && window.solana.publicKey) {
            setAccount(window.solana.publicKey.toString());
          }
        }
      } catch (error) {
        console.error('Solana connection error:', error);
      }
    };
    
    initWeb3();
    loadPaymentDetails();
  }, [paymentId]);
  
  // When payment details are loaded, set the wallet type based on currency
  useEffect(() => {
    if (payment && payment.currency) {
      const detectedWalletType = detectWalletType(payment.currency);
      setWalletType(detectedWalletType);
      
      // If currency is Solana-based, set chainId to appropriate Solana network
      if (detectedWalletType === 'solana') {
        setChainId('devnet'); // Default to devnet for testing
      }
    }
  }, [payment]);

  const loadPaymentDetails = async () => {
    try {
      setLoading(true);
      console.log('Loading payment details for ID:', paymentId);
      const response = await axios.get(`${URL}/api/payments/${paymentId}`);
      console.log('Payment details:', response.data);
      setPayment(response.data.payment);
    } catch (error) {
      console.error('Error loading payment:', error);
      setError('Payment not found or has expired');
    } finally {
      setLoading(false);
    }
  };

  // Connect to the appropriate wallet based on currency
  const connectWallet = async () => {
    try {
      const currentWalletType = payment ? detectWalletType(payment.currency) : 'ethereum';
      setWalletType(currentWalletType);
      
      if (currentWalletType === 'solana') {
        // Connect to Solana wallet (Phantom)
        if (!window.solana || !window.solana.isPhantom) {
          window.open('https://phantom.app/', '_blank');
          setError('Please install Phantom wallet to make Solana payments');
          return;
        }
        
        try {
          await window.solana.connect();
          if (window.solana.publicKey) {
            setAccount(window.solana.publicKey.toString());
            setChainId('devnet'); // Default to devnet for testing
          }
        } catch (error) {
          console.error('Solana wallet connection error:', error);
          setError('Failed to connect Solana wallet');
        }
      } else {
        // Original Ethereum wallet connection logic
        if (!window.ethereum) {
          setError('Please install MetaMask to make payments');
          return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        // Check if on the right network
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(currentChainId);
        
        // Network switching logic for Ethereum and BNB
        if (payment?.currency === 'BNB') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }], // BSC Testnet
            });
          } catch (switchError) {
            // This error code means the chain is not added to MetaMask
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x61',
                      chainName: 'BSC Testnet',
                      nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18
                      },
                      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                      blockExplorerUrls: ['https://testnet.bscscan.com/']
                    }
                  ]
                });
              } catch (addError) {
                setError('Could not add BSC network to your wallet');
              }
            }
          }
        } else {
          // For simplicity, we'll use both mainnet and Goerli and Sepolia
          if (currentChainId !== '0x1' && currentChainId !== '0x5' && currentChainId !== '0xaa36a7') {
            try {
              // Try to switch to sepolia for testing
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }], // Sepolia
              });
            } catch (switchError) {
              setError('Please switch to a supported network in your wallet');
            }
          }
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet');
    }
  };

  // Handle Solana payments
  const handleSolanaPayment = async () => {
    if (!account || !payment) {
      setError('Please connect your Solana wallet first');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Connect to appropriate Solana network
      const network = chainId || 'devnet'; // Default to devnet for testing
      const connection = new Connection(clusterApiUrl(network), 'confirmed');
      
      // Check if we're doing a simulated transaction for testing
      const isSimulation = process.env.NODE_ENV === 'development' || !payment.walletAddress;
      
      let transactionHash;
      
      if (isSimulation) {
        // For testing/demo purposes, generate a fake hash
        console.log('SIMULATION MODE: Generating fake Solana transaction hash');
        transactionHash = `${Array.from({length: 88}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      } else {
        // Determine if this is a native SOL transfer or an SPL token
        if (payment.currency === 'SOL') {
          // Native SOL transfer
          const fromPubkey = new PublicKey(account);
          const toPubkey = new PublicKey(payment.walletAddress);
          
          // Convert amount to lamports (1 SOL = 1,000,000,000 lamports)
          const lamports = Math.floor(parseFloat(payment.amount) * LAMPORTS_PER_SOL);
          
          // Create a simple transfer transaction
          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey,
              toPubkey,
              lamports
            })
          );
          
          // Get the latest block hash
          const { blockhash } = await connection.getRecentBlockhash();
          transaction.recentBlockhash = blockhash;
          transaction.feePayer = fromPubkey;
          
          // Send transaction
          const signedTx = await window.solana.signTransaction(transaction);
          const signature = await connection.sendRawTransaction(signedTx.serialize());
          
          // Wait for confirmation
          await connection.confirmTransaction(signature);
          
          transactionHash = signature;
        } else if (payment.currency === 'USDC_SOL') {
          // SPL Token transfer (like USDC on Solana)
          // This is more complex and would need the actual token program interaction
          // This is a simplified placeholder
          setError('SPL token transfers not yet implemented');
          setProcessing(false);
          return;
        }
      }
      
      console.log('Solana transaction hash:', transactionHash);
      setTxHash(transactionHash);
      
      // Notify backend of successful payment
      const response = await axios.post(`${URL}/api/payments/process`, {
        paymentId: payment.id,
        transactionHash: transactionHash,
        network: network || 'devnet' // Add network information for Solana
      });
      
      console.log('Payment processed:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Solana payment error:', error);
      setError(`Payment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setProcessing(false);
    }
  };

  // Update handlePayment to route to appropriate handler based on wallet type
  const handlePayment = async () => {
    if (!account || !payment || (!web3 && walletType !== 'solana')) {
      setError('Please connect your wallet first');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Route to the appropriate payment handler based on wallet type
      if (walletType === 'solana') {
        await handleSolanaPayment();
        return;
      }

      // The rest is the original Ethereum/BNB payment logic
      // Specific handling for BNB payment
      if (payment.currency === 'BNB') {
        // Try to switch to BSC Testnet if not already on it
        if (chainId !== '0x61') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }], // BSC Testnet
            });
            
            // Refresh chain ID after switch
            const newChainId = await web3.eth.getChainId();
            setChainId(`0x${newChainId.toString(16)}`);
          } catch (switchError) {
            // This error code means the chain hasn't been added to MetaMask
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x61',
                      chainName: 'BSC Testnet',
                      nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18
                      },
                      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                      blockExplorerUrls: ['https://testnet.bscscan.com/']
                    }
                  ]
                });
              } catch (addError) {
                throw new Error('Could not add BSC network to your wallet');
              }
            } else {
              throw new Error('Failed to switch to BSC network');
            }
          }
        }
      }

      // Get token contract based on currency and chain ID
      const tokenAddress = TOKEN_ADDRESSES[payment.currency]?.[chainId];
      if (!tokenAddress) {
        throw new Error(`${payment.currency} is not supported on this network (Chain ID: ${chainId})`);
      }
      
      console.log(`Using token contract at ${tokenAddress} for ${payment.currency}`);
      
      // Check if we're doing a simulated transaction for testing
      const isSimulation = process.env.NODE_ENV === 'development' || !payment.walletAddress;
      
      let transactionHash;
      
      if (isSimulation) {
        // For testing/demo purposes, generate a fake hash
        console.log('SIMULATION MODE: Generating fake transaction hash');
        transactionHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      } else {
        // Determine decimals for the token/coin
        const decimals = TOKEN_DECIMALS[payment.currency] || 6;
        const amount = web3.utils.toBN(
          Math.floor(parseFloat(payment.amount) * Math.pow(10, decimals))
        );
        
        console.log(`Sending ${amount.toString()} units of ${payment.currency} to ${payment.walletAddress}`);
        
        if (payment.currency === 'BNB') {
          // For native BNB, use sendTransaction
          const receipt = await web3.eth.sendTransaction({
            from: account,
            to: payment.walletAddress,
            value: amount
          });
          
          transactionHash = receipt.transactionHash;
        } else {
          // For ERC20 tokens
          const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
          
          const receipt = await contract.methods
            .transfer(payment.walletAddress, amount)
            .send({ from: account });
          
          transactionHash = receipt.transactionHash;
        }
      }
      
      console.log('Transaction hash:', transactionHash);
      setTxHash(transactionHash);
      
      // Notify backend of successful payment
      const response = await axios.post(`${URL}/api/payments/process`, {
        paymentId: payment.id,
        transactionHash: transactionHash
      });
      
      console.log('Payment processed:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Payment error:', error);
      setError(`Payment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleEthPayment = async () => {
    if (!account || !payment || !web3) {
      setError('Please connect your wallet first');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // For testing/demo purposes, we'll just send a small amount of ETH
      console.log(`Sending ETH payment to ${payment.walletAddress}`);
      
      // Use a test wallet if real wallet not available
      const recipientAddress = payment.walletAddress || '0x1234567890123456789012345678901234567890';
      
      // Convert to wei (smallest ETH unit)
      const amount = web3.utils.toWei('0.001', 'ether'); // Small test amount
      
      // Send transaction
      const receipt = await web3.eth.sendTransaction({
        from: account,
        to: recipientAddress,
        value: amount
      });
      
      console.log('Transaction receipt:', receipt);
      setTxHash(receipt.transactionHash);
      
      // Notify backend of successful payment
      const response = await axios.post(`${URL}/api/payments/process`, {
        paymentId: payment.id,
        transactionHash: receipt.transactionHash
      });
      
      console.log('Payment processed:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('ETH payment error:', error);
      setError(`Payment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setProcessing(false);
    }
  };
  
  // Add a test SOL payment method for development purposes
  const handleTestSolPayment = async () => {
    if (!account || !payment) {
      setError('Please connect your Solana wallet first');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      console.log('SIMULATION MODE: Generating fake Solana transaction hash for testing');
      const transactionHash = `${Array.from({length: 88}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      console.log('Simulated Solana transaction hash:', transactionHash);
      setTxHash(transactionHash);
      
      // Notify backend of successful payment
      const response = await axios.post(`${URL}/api/payments/process`, {
        paymentId: payment.id,
        transactionHash: transactionHash,
        network: 'devnet' // Specify test network
      });
      
      console.log('Payment processed:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Test SOL payment error:', error);
      setError(`Payment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl">Loading payment details...</div>
      </div>
    );
  }

  if (error && !payment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 font-bold text-xl mb-4">Error</div>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-green-500 font-bold text-2xl mb-4">Payment Successful!</div>
          <p className="text-gray-700 mb-4">
            Your payment of {payment.amount} {payment.currency} has been completed.
          </p>
          <p className="text-sm text-gray-500 mb-4">Transaction Hash: {txHash}</p>
          <button
            onClick={() => window.close()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Payment Request
        </h2>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-2">Payment to</p>
            <p className="font-semibold">{payment?.merchantName}</p>
          </div>

          {/* Updated payment information section with fee breakdown */}
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">
              {payment?.amount} {payment?.currency}
            </p>
            
            {/* Show fee breakdown */}
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex justify-between px-2">
                <span>Product/Service:</span>
                <span>{parseFloat(payment?.originalAmount || 0).toFixed(4)} {payment?.currency}</span>
              </div>
              <div className="flex justify-between px-2">
                <span>Processing Fee (1.75%):</span>
                <span>
                  {payment?.originalAmount 
                    ? (parseFloat(payment?.originalAmount) * FEE_PERCENTAGE).toFixed(4) 
                    : '0.0000'} {payment?.currency}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID:</span>
              <span className="text-gray-900 font-medium">{payment?.id?.slice(0, 8)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Date:</span>
              <span className="text-gray-900 font-medium">
                {payment?.createdAt ? new Date(payment.createdAt).toLocaleString() : ''}
              </span>
            </div>
            {payment?.network && (
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Network:</span>
                <span className="text-gray-900 font-medium">
                  {payment.network === 'mainnet-beta' ? 'Solana Mainnet' : 
                   payment.network === 'devnet' ? 'Solana Devnet' : 
                   payment.network === 'testnet' ? 'Solana Testnet' : 
                   payment.network}
                </span>
              </div>
            )}
          </div>


              {!account ? (
                <button
                  onClick={connectWallet}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex justify-center items-center"
                  disabled={processing}
                >
                  {walletType === 'solana' ? 'Connect Phantom Wallet' : 'Connect MetaMask'}
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex justify-center items-center"
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : `Pay with ${payment?.currency}`}
                  </button>
                  
                  {/* Different test buttons based on wallet type */}
                  {walletType === 'solana' ? (
                    <button
                      onClick={handleTestSolPayment}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex justify-center items-center"
                      disabled={processing}
                    >
                      {processing ? 'Processing...' : 'Pay with SOL (Test)'}
                    </button>
                  ) : (
                    <button
                      onClick={handleEthPayment}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex justify-center items-center"
                      disabled={processing}
                    >
                      {processing ? 'Processing...' : 'Pay with ETH (Test)'}
                    </button>
                  )}
                </div>
              )}
              
              {account && (
                <div className="text-center text-sm text-gray-500">
                  Connected: {account.slice(0, 6)}...{account.slice(-4)}
                  {walletType === 'solana' && ' (Solana)'}
                </div>
              )}
              
              <div className="text-xs text-center text-gray-500">
                Powered by COINLEY Payment Gateway
              </div>
              </div>
              </div>
              </div>
              );
              };
              
              export default Payment;





