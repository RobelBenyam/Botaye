import React from 'react';
import { Calendar, User, Wrench, DollarSign, AlertCircle, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'payment' | 'maintenance' | 'lease' | 'tenant';
  title: string;
  description: string;
  timestamp: Date;
  status?: 'success' | 'warning' | 'error';
  amount?: number;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Rent Payment Received',
    description: 'John Smith - Sunset Apartments Unit A12',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'success',
    amount: 2500
  },
  {
    id: '2',
    type: 'maintenance',
    title: 'Maintenance Request Created',
    description: 'Air conditioning issue - Downtown Lofts',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: 'warning'
  },
  {
    id: '3',
    type: 'lease',
    title: 'Lease Renewal Due',
    description: 'Emily Johnson lease expires in 30 days',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'warning'
  },
  {
    id: '4',
    type: 'tenant',
    title: 'New Tenant Application',
    description: 'Application received for Downtown Lofts',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
  },
  {
    id: '5',
    type: 'payment',
    title: 'Payment Overdue',
    description: 'Michael Brown - Office Plaza Unit 301',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'error',
    amount: 8500
  }
];

export const RecentActivity: React.FC = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return DollarSign;
      case 'maintenance':
        return Wrench;
      case 'lease':
        return Calendar;
      case 'tenant':
        return User;
      default:
        return AlertCircle;
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-success-500',
          text: 'text-success-700',
          ring: 'ring-success-100'
        };
      case 'warning':
        return {
          bg: 'bg-warning-500',
          text: 'text-warning-700',
          ring: 'ring-warning-100'
        };
      case 'error':
        return {
          bg: 'bg-danger-500',
          text: 'text-danger-700',
          ring: 'ring-danger-100'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-700',
          ring: 'ring-gray-100'
        };
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      return 'Just now';
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${Math.floor(hours / 24)}d ago`;
    }
  };

  return (
    <div className="card card-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-display mb-1">Recent Activity</h3>
          <p className="text-sm text-gray-600">Latest updates across your properties</p>
        </div>
        <button className="btn-ghost flex items-center space-x-2 group">
          <span>View All</span>
          <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>
      
      <div className="space-y-4">
        {mockActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const style = getStatusStyle(activity.status);
          
                      return (
              <div key={activity.id} className="activity-item group">
              <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft ${style.ring} ring-4`}>
                <div className={`w-8 h-8 ${style.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{activity.title}</p>
                    <p className="text-sm text-gray-600 font-medium">{activity.description}</p>
                    {activity.amount && (
                      <p className="text-sm font-bold text-primary-600 mt-1">
                        ${activity.amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                      {formatTime(activity.timestamp)}
                    </span>
                    {activity.status && (
                      <div className={`mt-1 inline-block w-2 h-2 ${style.bg} rounded-full`}></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <span>Live updates enabled</span>
        </div>
      </div>
    </div>
  );
}; 