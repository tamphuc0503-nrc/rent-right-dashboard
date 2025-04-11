
import { LucideIcon } from 'lucide-react';

export interface PropertyAddress {
  id: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  units: number;
}

export interface PropertyType {
  type: string;
  icon: LucideIcon | string;
  units?: number | 'multiple';
}

export const propertyTypes: PropertyType[] = [
  { type: 'House', icon: 'Home', units: 1 },
  { type: 'Townhouse', icon: 'Building', units: 1 },
  { type: 'Condo', icon: 'Building', units: 1 },
  { type: 'Apartment Building', icon: 'Building', units: 'multiple' },
  { type: 'Land', icon: 'land' },
  { type: 'Multi Family', icon: 'Building', units: 'multiple' },
  { type: 'Mobile', icon: 'Home', units: 1 },
  { type: 'Co-op', icon: 'Building', units: 1 },
  { type: 'Other', icon: 'Building' },
];
