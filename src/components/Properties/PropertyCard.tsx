import React from 'react';
import { MapPin, Users, DollarSign, MoreVertical, Star, Zap, Shield } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onEdit?: (property: Property) => void;
  onView?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEdit, onView }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'status-occupied';
      case 'vacant':
        return 'status-vacant';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getTypeStyle = (type: string) => {
    return type === 'commercial' 
      ? 'bg-primary-600 text-white' 
      : 'bg-secondary-600 text-white';
  };

  return (
    <div className="property-card group">
      <div className="relative">
        <img
          src={property.imageUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=240&fit=crop'}
          alt={property.name}
          className="w-full h-56 object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`status-badge ${getStatusStyle(property.status)}`}>
            {property.status}
          </span>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getTypeStyle(property.type)}`}>
            {property.type}
          </span>
        </div>
        
        <div className="absolute top-4 right-4">
          <button className="w-8 h-8 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group">
            <MoreVertical className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div className="text-white">
              <h3 className="text-lg font-bold font-display mb-1">{property.name}</h3>
              <div className="flex items-center text-white/90 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="font-medium">{property.address.split(',')[0]}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md rounded-full px-2 py-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-bold">4.8</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{property.units} units</span>
          </div>
          <div className="flex items-center text-gray-900">
            <DollarSign className="w-5 h-5 mr-1 text-success-600" />
            <span className="text-lg font-bold">${property.rentAmount.toLocaleString()}</span>
            <span className="text-sm text-gray-500 ml-1">/mo</span>
          </div>
        </div>
        
        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                >
                  {amenity === 'Gym' && <Zap className="w-3 h-3 mr-1" />}
                  {amenity === 'Security' && <Shield className="w-3 h-3 mr-1" />}
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-bold">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex space-x-3">
          <button
            onClick={() => onView?.(property)}
            className="flex-1 btn-secondary text-sm py-2.5"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit?.(property)}
            className="flex-1 btn-primary text-sm py-2.5"
          >
            Manage
          </button>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}; 