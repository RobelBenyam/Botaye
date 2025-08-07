import React, { useState } from 'react';
import { Plus, Search, DollarSign, Calendar, CheckCircle, AlertCircle, Clock, Filter } from 'lucide-react';
import { Payment } from '../../types';
import { mockTenants, mockProperties } from '../../data/mockData';

interface PaymentListProps {
  payments: Payment[];
}

export const PaymentList: React.FC<PaymentListProps> = ({ payments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');
  const [filterType, setFilterType] = useState<'all' | 'rent' | 'deposit' | 'fee' | 'utility'>('all');

  const filteredPayments = payments.filter(payment => {
    const tenant = mockTenants.find(t => t.id === payment.tenantId);
    const property = mockProperties.find(p => p.id === payment.propertyId);
    const matchesSearch = 
      tenant?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesType = filterType === 'all' || payment.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-success-500',
          text: 'text-success-700',
          bgClass: 'bg-success-100',
          icon: CheckCircle
        };
      case 'pending':
        return {
          bg: 'bg-warning-500',
          text: 'text-warning-700',
          bgClass: 'bg-warning-100',
          icon: Clock
        };
      case 'failed':
        return {
          bg: 'bg-danger-500',
          text: 'text-danger-700',
          bgClass: 'bg-danger-100',
          icon: AlertCircle
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-700',
          bgClass: 'bg-gray-100',
          icon: Clock
        };
    }
  };

  const getTenantName = (tenantId: string) => {
    const tenant = mockTenants.find(t => t.id === tenantId);
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown Tenant';
  };

  const getPropertyName = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.name || 'Unknown Property';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getTotalAmount = (status?: string) => {
    const filtered = status ? filteredPayments.filter(p => p.status === status) : filteredPayments;
    return filtered.reduce((sum, payment) => sum + payment.amount, 0);
  };

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-display gradient-text">Payment Management</h2>
          <p className="text-gray-600 mt-1">Track and manage all property payments</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Record Payment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card group bg-gradient-to-br from-primary-50 to-primary-100/50 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Total Payments</p>
                                <p className="text-2xl font-bold text-gray-900">KSh {getTotalAmount().toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-medium">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-success-50 to-success-100/50 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">KSh {getTotalAmount('completed').toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-medium">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-warning-50 to-warning-100/50 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">KSh {getTotalAmount('pending').toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center shadow-medium">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-danger-50 to-danger-100/50 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Failed</p>
                                <p className="text-2xl font-bold text-gray-900">KSh {getTotalAmount('failed').toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-danger-500 to-danger-600 rounded-2xl flex items-center justify-center shadow-medium">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="select-field"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="select-field"
            >
              <option value="all">All Types</option>
              <option value="rent">Rent</option>
              <option value="deposit">Deposit</option>
              <option value="fee">Fee</option>
              <option value="utility">Utility</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Tenant</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Property</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Type</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Due Date</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const style = getStatusStyle(payment.status);
                const StatusIcon = style.icon;
                
                return (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                    <td className="py-4 px-2">
                      <div className="font-medium text-gray-900">{getTenantName(payment.tenantId)}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-gray-700">{getPropertyName(payment.propertyId)}</div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium capitalize">
                        {payment.type}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="font-bold text-gray-900">KSh {payment.amount.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(payment.dueDate)}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${style.bgClass} ${style.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{payment.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex space-x-2">
                        <button className="btn-ghost text-xs">View</button>
                        <button className="btn-primary text-xs py-1 px-3">Update</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <DollarSign className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}; 