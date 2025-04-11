
import React from 'react';
import { Button } from '@/components/ui/button';
import { PropertyDetailType } from '@/types/propertyDetail';

interface PropertyListTableProps {
  properties: PropertyDetailType[];
  onViewProperty: (property: PropertyDetailType) => void;
}

const PropertyListTable: React.FC<PropertyListTableProps> = ({ properties, onViewProperty }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {properties.map((property) => (
            <tr key={property.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewProperty(property)}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{property.address}</div>
                <div className="text-sm text-gray-500">{property.city}, {property.state}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{property.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{property.units}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {property.occupancyRate}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewProperty(property);
                  }}
                >
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyListTable;
