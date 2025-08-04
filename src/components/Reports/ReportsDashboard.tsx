import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Download, Calendar, Filter, PieChart, Activity } from 'lucide-react';

export const ReportsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const financialData = {
    totalRevenue: 156500,
    totalExpenses: 45200,
    netIncome: 111300,
    occupancyRate: 77.8,
    collectionRate: 98.5,
    maintenanceCosts: 12800,
    vacancyLoss: 8900,
    propertyAppreciation: 5.2
  };

  const monthlyData = [
    { month: 'Jan', revenue: 145000, expenses: 42000 },
    { month: 'Feb', revenue: 148000, expenses: 38000 },
    { month: 'Mar', revenue: 152000, expenses: 45000 },
    { month: 'Apr', revenue: 149000, expenses: 41000 },
    { month: 'May', revenue: 155000, expenses: 43000 },
    { month: 'Jun', revenue: 156500, expenses: 45200 },
  ];

  const propertyPerformance = [
    { name: 'Sunset Apartments', revenue: 60000, occupancy: 95.8 },
    { name: 'Downtown Lofts', revenue: 57600, occupancy: 88.9 },
    { name: 'Office Plaza', revenue: 38900, occupancy: 100 },
  ];

  const expenseBreakdown = [
    { category: 'Maintenance', amount: 12800, percentage: 28.3 },
    { category: 'Insurance', amount: 8500, percentage: 18.8 },
    { category: 'Property Tax', amount: 15200, percentage: 33.6 },
    { category: 'Management', amount: 5700, percentage: 12.6 },
    { category: 'Utilities', amount: 3000, percentage: 6.6 },
  ];

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-display gradient-text">Analytics & Reports</h2>
          <p className="text-gray-600 mt-1">Comprehensive financial insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="select-field"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card group bg-gradient-to-br from-success-50 to-success-100/50 border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${financialData.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-medium">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-1 text-success-700">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-bold">+12.3% vs last month</span>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-primary-50 to-primary-100/50 border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Net Income</p>
              <p className="text-3xl font-bold text-gray-900">${financialData.netIncome.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-medium">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-1 text-primary-700">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-bold">+8.7% vs last month</span>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-purple-50 to-purple-100/50 border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Occupancy Rate</p>
              <p className="text-3xl font-bold text-gray-900">{financialData.occupancyRate}%</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-medium">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-1 text-purple-700">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-bold">+5.4% vs last month</span>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-accent-50 to-accent-100/50 border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Collection Rate</p>
              <p className="text-3xl font-bold text-gray-900">{financialData.collectionRate}%</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-medium">
              <Activity className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-1 text-accent-700">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-bold">+2.1% vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue vs Expenses</h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select className="select-field text-sm">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-success-500 to-success-600 h-full rounded-full"
                      style={{ width: `${(data.revenue / 160000) * 100}%` }}
                    />
                  </div>
                  <div className="w-20 text-sm font-semibold text-gray-900">
                    ${(data.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-danger-500 to-danger-600 h-full rounded-full"
                      style={{ width: `${(data.expenses / 50000) * 100}%` }}
                    />
                  </div>
                  <div className="w-20 text-sm font-semibold text-gray-900">
                    ${(data.expenses / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span className="text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
              <span className="text-gray-600">Expenses</span>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Expense Breakdown</h3>
            <PieChart className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {expenseBreakdown.map((expense, index) => (
              <div key={expense.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: [
                        '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'
                      ][index] 
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700">{expense.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    ${expense.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {expense.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between font-bold text-gray-900">
              <span>Total Expenses</span>
              <span>${financialData.totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Performance */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Property Performance</h3>
          <div className="text-sm text-gray-500">Current Month</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-semibold text-gray-900">Property</th>
                <th className="text-left py-3 font-semibold text-gray-900">Revenue</th>
                <th className="text-left py-3 font-semibold text-gray-900">Occupancy</th>
                <th className="text-left py-3 font-semibold text-gray-900">Performance</th>
              </tr>
            </thead>
            <tbody>
              {propertyPerformance.map((property) => (
                <tr key={property.name} className="border-b border-gray-100">
                  <td className="py-4 font-medium text-gray-900">{property.name}</td>
                  <td className="py-4 font-bold text-gray-900">${property.revenue.toLocaleString()}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full"
                          style={{ width: `${property.occupancy}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{property.occupancy}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      property.occupancy >= 95 
                        ? 'bg-success-100 text-success-700' 
                        : property.occupancy >= 85 
                        ? 'bg-warning-100 text-warning-700'
                        : 'bg-danger-100 text-danger-700'
                    }`}>
                      {property.occupancy >= 95 ? 'Excellent' : property.occupancy >= 85 ? 'Good' : 'Needs Attention'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 