// src/components/PaymentStats.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const STATUS_COLORS = {
  completed: '#10B981', // green
  pending: '#F59E0B',   // yellow
  failed: '#EF4444'     // red
};

const PaymentStats = () => {
  const [stats, setStats] = useState({
    currency: [],
    status: [],
    monthly: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const storedData = localStorage.getItem('merchantData');
      
      if (!storedData) {
        console.error('No merchant data found');
        return;
      }
      
      const stored = JSON.parse(storedData);
      
      const response = await axios.get(
        `${URL}/api/payments/merchant/stats`,
        {
          headers: {
            'x-api-key': stored.apiKey,
            'x-api-secret': stored.apiSecret
          }
        }
      );
      
      console.log('Payment stats:', response.data);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error loading payment stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-40">
      <div className="text-gray-500">Loading stats...</div>
    </div>;
  }

  // Check if we have data to display
  const hasMonthlyData = stats.monthly && stats.monthly.length > 0;
  const hasCurrencyData = stats.currency && stats.currency.length > 0;
  const hasStatusData = stats.status && stats.status.length > 0;

  if (!hasMonthlyData && !hasCurrencyData && !hasStatusData) {
    return <div className="text-center py-6 text-gray-500">
      No payment statistics available yet
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Monthly Transactions Chart */}
      {hasMonthlyData && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">Monthly Transaction Volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.monthly}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8" 
                  name="Transaction Count" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="totalAmount" 
                  stroke="#82ca9d" 
                  name="Total Volume" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Currency Distribution */}
        {hasCurrencyData && (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Currency Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.currency}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="totalAmount"
                    nameKey="currency"
                    label={({ currency, percent }) => `${currency}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.currency.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${parseFloat(value).toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Status Distribution */}
        {hasStatusData && (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Transaction Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.status}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ status, percent }) => `${status}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.status.map((entry) => (
                      <Cell 
                        key={`cell-${entry.status}`} 
                        fill={STATUS_COLORS[entry.status] || COLORS[0]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Total Transactions
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stats.status.reduce((sum, item) => sum + parseInt(item.count), 0)}
              </td>
            </tr>
            {hasCurrencyData && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Total Volume
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${stats.currency.reduce((sum, item) => sum + parseFloat(item.totalAmount || 0), 0).toFixed(2)}
                </td>
              </tr>
            )}
            {hasStatusData && stats.status.map((item) => (
              <tr key={item.status}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)} Transactions
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.count} ({((item.count / stats.status.reduce((sum, s) => sum + parseInt(s.count), 0)) * 100).toFixed(1)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentStats;