import React from "react";
import {
  Bell,
  Search,
  User,
  ChevronDown,
  MessageSquare,
  Sun,
} from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-white/50 fixed top-0 right-0 left-72 z-40 h-36 shadow-soft">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:text-primary-500 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search properties, tenants, or anything..."
              className="pl-12 pr-6 py-3 w-96 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 placeholder-gray-400 text-sm font-medium"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-500">Good morning,</span>
              <span className="text-gray-900 font-semibold ml-1">Sarah</span>
            </div>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all duration-300 group">
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
          </button>

          <button className="relative p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all duration-300 group">
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger-500 rounded-full animate-pulse"></span>
          </button>

          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 pr-4 border border-gray-200 hover:border-primary-300 hover:shadow-medium transition-all duration-300 cursor-pointer group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500 font-medium">
                Bottaye Manager
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
          </div>
        </div>
      </div>

      <div className="px-8 pb-4">
        <div className="flex items-center space-x-4 text-sm">
          <span className="px-3 py-1.5 bg-success-100 text-success-700 rounded-full font-medium">
            All Systems Operational
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">Last sync: 2 minutes ago</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">3 pending actions</span>
        </div>
      </div>
    </header>
  );
};
