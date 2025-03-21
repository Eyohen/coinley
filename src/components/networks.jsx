// // src/config/networks.js
// export const NETWORKS = {
//     // Ethereum networks
//     '0x1': { name: 'Ethereum Mainnet', currency: 'ETH', rpcUrl: 'https://mainnet.infura.io/v3/21f0c9ba4be0420083cfbfa4c520e648' },
//     '0xaa36a7': { name: 'Sepolia', currency: 'ETH', rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/IzpxfbnayL-lpp5EASNemPq2lTdA4Woqv' },
    
    
//     // BSC networks
//     '0x38': { name: 'Binance Smart Chain', currency: 'BNB', rpcUrl: 'https://bsc-dataseed.binance.org/' },
//     '0x61': { name: 'BSC Testnet', currency: 'BNB', rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/' }
//   };
  
//   export const isBscNetwork = (chainId) => {
//     return chainId === '0x38' || chainId === '0x61';
//   };


// src/components/networks.js
export const NETWORKS = {
    // Ethereum networks
    '0x1': { name: 'Ethereum Mainnet', currency: 'ETH' },
    '0xaa36a7': { name: 'Sepolia', currency: 'ETH' },
    
    // BSC networks
    '0x38': { name: 'Binance Smart Chain', currency: 'BNB' },
    '0x61': { name: 'BSC Testnet', currency: 'BNB' }
  };
  
  export const isBscNetwork = (chainId) => {
    return chainId === '0x38' || chainId === '0x61';
  };