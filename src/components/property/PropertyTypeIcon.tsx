
import React from 'react';
import { Home, Building, LucideIcon } from 'lucide-react';
import { propertyTypes } from '@/types/property';

interface PropertyTypeIconProps {
  type: string;
  className?: string;
}

export const PropertyTypeIcon: React.FC<PropertyTypeIconProps> = ({ type, className }) => {
  const getPropertyIcon = (propertyType: string): LucideIcon => {
    const property = propertyTypes.find(p => p.type === propertyType);
    if (!property) return Building;
    
    if (typeof property.icon === 'string') {
      if (property.icon === 'Home') return Home;
      return Building; // Default fallback for string icons
    }
    
    return property.icon as LucideIcon;
  };

  const IconComponent = getPropertyIcon(type);
  return <IconComponent className={className} />;
};
