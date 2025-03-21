// src/components/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';

const EditProfile = ({ merchant, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    walletAddress: '',
    solWalletAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (merchant) {
      setFormData({
        businessName: merchant.businessName || '',
        walletAddress: merchant.walletAddress || '',
        solWalletAddress: merchant.solWalletAddress || ''
      });
    }
  }, [merchant]);

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
    setSuccess(false);

    try {
      // Get stored merchant data for authentication
      const storedData = localStorage.getItem('merchantData');
      if (!storedData) {
        throw new Error('Authentication data not found');
      }
      
      const stored = JSON.parse(storedData);
      
      const response = await axios.put(
        `${URL}/api/merchants/profile`,
        formData,
        {
          headers: {
            'x-api-key': stored.apiKey,
            'x-api-secret': stored.apiSecret
          }
        }
      );
      
      console.log('Profile update successful:', response.data);
      
      // Update merchant data in localStorage
      const updatedMerchant = {
        ...stored,
        ...response.data.merchant
      };
      localStorage.setItem('merchantData', JSON.stringify(updatedMerchant));
      
      setSuccess(true);
      
      // Notify parent component
      if (onUpdate) {
        onUpdate(response.data.merchant);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.response?.data?.error || 'Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          Profile updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.businessName}
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="0x..."
              value={formData.walletAddress}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="solWalletAddress" className="block text-sm font-medium text-gray-700">
              Solana Wallet Address (for SOL, USDC_SOL)
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
            <p className="mt-1 text-sm text-gray-500">
              Your Solana address will be used to receive payments in SOL and USDC on Solana
            </p>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;