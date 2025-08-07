import React from 'react';
import { Building2, Home, Users, DollarSign, Wrench, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStats as StatsType } from '../../types';

interface DashboardStatsProps {
  stats: StatsType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      change: '+2.5%',
      changeType: 'positive',
      icon: Building2,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100/50',
      iconBg: 'bg-blue-500'
    },
    {
      title: 'Total Units',
      value: stats.totalUnits,
      change: '+1.2%',
      changeType: 'positive',
      icon: Home,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100/50',
      iconBg: 'bg-emerald-500'
    },
    {
      title: 'Occupancy Rate',
      value: `${Math.round((stats.occupiedUnits / stats.totalUnits) * 100)}%`,
      subtitle: `${stats.occupiedUnits}/${stats.totalUnits} units`,
      change: '+5.4%',
      changeType: 'positive',
      icon: Users,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100/50',
      iconBg: 'bg-purple-500'
    },
    {
      title: 'Monthly Revenue',
      value: `KSh ${(stats.monthlyRevenue / 1000).toFixed(0)}K`,
      subtitle: `KSh ${stats.monthlyRevenue.toLocaleString()} total`,
      change: '+12.3%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'from-emerald-600 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-100/50',
      iconBg: 'bg-emerald-600'
    },
    {
      title: 'Maintenance Requests',
      value: stats.maintenanceRequests,
      subtitle: 'Open requests',
      change: '-8.1%',
      changeType: 'positive',
      icon: Wrench,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-100/50',
      iconBg: 'bg-amber-500'
    },
    {
      title: 'Overdue Payments',
      value: stats.overduePayments,
      subtitle: 'Requires attention',
      change: '-15.2%',
      changeType: 'positive',
      icon: AlertTriangle,
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100/50',
      iconBg: 'bg-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.changeType === 'positive' ? TrendingUp : TrendingDown;
        
                  return (
            <div key={index} className={`stat-card stat-enter bg-gradient-to-br ${card.bgGradient} border-0 group`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                {card.subtitle && (
                  <p className="text-sm text-gray-600 font-medium">{card.subtitle}</p>
                )}
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-medium transform group-hover:scale-110 transition-all duration-300`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full ${
                card.changeType === 'positive' 
                  ? 'bg-success-100 text-success-700' 
                  : 'bg-danger-100 text-danger-700'
              }`}>
                <TrendIcon className="w-3 h-3" />
                <span className="text-xs font-bold">{card.change}</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">vs last month</span>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          </div>
        );
      })}
    </div>
      );
  }; 