
import React from 'react';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyHeaderProps {
  onAddProperty: () => void;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ onAddProperty }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
        <p className="text-gray-600">Manage your real estate properties</p>
      </div>
      
      <Button 
        className="mt-4 sm:mt-0 bg-realestate-700 hover:bg-realestate-800"
        onClick={onAddProperty}
      >
        <Home className="h-4 w-4 mr-2" />
        Add New Property
      </Button>
    </div>
  );
};

export default PropertyHeader;
