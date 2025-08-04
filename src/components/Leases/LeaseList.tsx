import React, { useState } from 'react';
import { Plus, Search, FileText, Calendar, AlertTriangle, CheckCircle, Clock, Filter, User, MapPin } from 'lucide-react';
import { Tenant } from '../../types';
import { mockProperties } from '../../data/mockData';

interface LeaseListProps {
  tenants: Tenant[];
}

export const LeaseList: React.FC<LeaseListProps> = ({ tenants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'expired' | 'expiring-soon'>('all');

  const getLeaseStatus = (tenant: Tenant) => {
    const now = new Date();
    const leaseEnd = new Date(tenant.leaseEnd);
    const daysUntilExpiry = Math.ceil((leaseEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 30) return 'expiring-soon';
    if (tenant.status === 'pending') return 'pending';
    return 'active';
  };

  const filteredTenants = tenants.filter(tenant => {
    const leaseStatus = getLeaseStatus(tenant);
    const matchesSearch = 
      tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || leaseStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-success-500',
          text: 'text-success-700',
          bgClass: 'bg-success-100',
          icon: CheckCircle
        };
      case 'expiring-soon':
        return {
          bg: 'bg-warning-500',
          text: 'text-warning-700',
          bgClass: 'bg-warning-100',
          icon: AlertTriangle
        };
      case 'expired':
        return {
          bg: 'bg-danger-500',
          text: 'text-danger-700',
          bgClass: 'bg-danger-100',
          icon: AlertTriangle
        };
      case 'pending':
        return {
          bg: 'bg-primary-500',
          text: 'text-primary-700',
          bgClass: 'bg-primary-100',
          icon: Clock
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-700',
          bgClass: 'bg-gray-100',
          icon: FileText
        };
    }
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

  const getDaysUntilExpiry = (leaseEnd: Date) => {
    const now = new Date();
    const days = Math.ceil((leaseEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getStatusCounts = () => {
    const counts = {
      total: filteredTenants.length,
      active: 0,
      expiringSoon: 0,
      expired: 0,
      pending: 0
    };

    filteredTenants.forEach(tenant => {
      const status = getLeaseStatus(tenant);
      switch (status) {
        case 'active':
          counts.active++;
          break;
        case 'expiring-soon':
          counts.expiringSoon++;
          break;
        case 'expired':
          counts.expired++;
          break;
        case 'pending':
          counts.pending++;
          break;
      }
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-display gradient-text">Lease Management</h2>
          <p className="text-gray-600 mt-1">Manage lease agreements and renewals</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Lease</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card group bg-gradient-to-br from-primary-50 to-primary-100/50 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Total Leases</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-medium">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-success-50 to-success-100/50 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Active</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.active}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-medium">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-warning-50 to-warning-100/50 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.expiringSoon}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center shadow-medium">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="stat-card group bg-gradient-to-br from-danger-50 to-danger-100/50 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Expired</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.expired}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-danger-500 to-danger-600 rounded-2xl flex items-center justify-center shadow-medium">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="select-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring-soon">Expiring Soon</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredTenants.map((tenant) => {
          const leaseStatus = getLeaseStatus(tenant);
          const style = getStatusStyle(leaseStatus);
          const StatusIcon = style.icon;
          const daysUntilExpiry = getDaysUntilExpiry(new Date(tenant.leaseEnd));
          
          return (
            <div key={tenant.id} className="card hover:shadow-medium transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {tenant.firstName} {tenant.lastName}
                      </h3>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${style.bgClass} ${style.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{leaseStatus.replace('-', ' ')}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{getPropertyName(tenant.propertyId)}</span>
                        {tenant.unitNumber && <span className="ml-1">- Unit {tenant.unitNumber}</span>}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Start: {formatDate(new Date(tenant.leaseStart))}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>End: {formatDate(new Date(tenant.leaseEnd))}</span>
                      </div>
                      
                      <div className="text-gray-900 font-semibold">
                        ${tenant.rentAmount.toLocaleString()}/month
                      </div>
                    </div>
                    
                    {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                      <div className="mt-3 p-2 bg-warning-50 border border-warning-200 rounded-lg">
                        <p className="text-sm text-warning-700 font-medium">
                          ⚠️ Lease expires in {daysUntilExpiry} days - Consider renewal
                        </p>
                      </div>
                    )}
                    
                    {daysUntilExpiry <= 0 && (
                      <div className="mt-3 p-2 bg-danger-50 border border-danger-200 rounded-lg">
                        <p className="text-sm text-danger-700 font-medium">
                          🚨 Lease has expired - Immediate action required
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button className="btn-secondary text-sm">View Lease</button>
                  {(leaseStatus === 'expiring-soon' || leaseStatus === 'expired') && (
                    <button className="btn-primary text-sm">Renew</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileText className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leases found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}; 