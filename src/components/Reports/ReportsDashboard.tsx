import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Download, Filter, PieChart, Activity } from 'lucide-react';

export const ReportsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');


  const financialData = {
    totalRevenue: 1685000,
    totalExpenses: 280000,
    netIncome: 1405000,
    occupancyRate: 100,
    collectionRate: 98.5,
    maintenanceCosts: 85000,
    vacancyLoss: 0,
    propertyAppreciation: 8.5
  };

  const monthlyData = [
    { month: 'Jan', revenue: 1685000, expenses: 280000 },
    { month: 'Feb', revenue: 1690000, expenses: 275000 },
    { month: 'Mar', revenue: 1700000, expenses: 285000 },
    { month: 'Apr', revenue: 1695000, expenses: 280000 },
    { month: 'May', revenue: 1705000, expenses: 285000 },
    { month: 'Jun', revenue: 1685000, expenses: 285000 },
  ];

  const propertyPerformance = [
    { name: 'Two Rivers Mall Residences', revenue: 120000, occupancy: 100 },
    { name: 'Gigiri Diplomatic Heights', revenue: 180000, occupancy: 100 },
    { name: 'Westlands Business Park', revenue: 150000, occupancy: 100 },
    { name: 'Karen Golf View', revenue: 200000, occupancy: 100 },
    { name: 'Upperhill Financial Centre', revenue: 220000, occupancy: 100 },
    { name: 'South C Comfort Homes', revenue: 75000, occupancy: 100 },
    { name: 'Lavington Green Apartments', revenue: 110000, occupancy: 100 },
    { name: 'Kilimani Business Hub', revenue: 140000, occupancy: 100 },
    { name: 'Westlands Executive Suites', revenue: 160000, occupancy: 100 },
    { name: 'Karen Country Club Residences', revenue: 250000, occupancy: 100 },
  ];

  const expenseBreakdown = [
    { category: 'Maintenance', amount: 85000, percentage: 30.4 },
    { category: 'Insurance', amount: 56000, percentage: 20.0 },
    { category: 'Property Tax', amount: 78400, percentage: 28.0 },
    { category: 'Management', amount: 33600, percentage: 12.0 },
    { category: 'Utilities', amount: 16800, percentage: 6.0 },
    { category: 'Security', amount: 11200, percentage: 4.0 },
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
              <p className="text-3xl font-bold text-gray-900">KSh {financialData.totalRevenue.toLocaleString()}</p>
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
              <p className="text-3xl font-bold text-gray-900">KSh {financialData.netIncome.toLocaleString()}</p>
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
            {monthlyData.map((data) => (
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
                    KSh {expense.amount.toLocaleString()}
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
                                <span>KSh {financialData.totalExpenses.toLocaleString()}</span>
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
                  <td className="py-4 font-bold text-gray-900">KSh {property.revenue.toLocaleString()}</td>
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