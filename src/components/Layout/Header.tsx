import React, { useEffect, useRef, useState } from "react";
import { Bell, User, ChevronDown, MessageSquare, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "./SearchBar";

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-white/50 fixed top-0 right-0 left-72 z-40 h-36 shadow-soft">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-6">
          <SearchBar />
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-500">
                {(() => {
                  const hour = new Date().getHours();
                  if (hour < 12) return "Good morning";
                  if (hour < 18) return "Good afternoon";
                  return "Good evening";
                })()}
                ,
              </span>
              <span className="text-gray-900 font-semibold ml-1">
                {user?.name ?? "Guest"}
              </span>
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
              <p className="text-sm font-bold text-gray-900">
                {user?.name ?? "Guest"}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Bottaye Manager
              </p>
            </div>
            {/* <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" /> */}
            <UserDropdown />
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

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            onClick={signOut}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
