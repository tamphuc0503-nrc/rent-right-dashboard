
export interface PropertyDetailType {
  id: number;
  address: string;
  city: string;
  state: string;
  type: string;
  units: number;
  occupancyRate: string;
  image: string;
  // Extended property details
  zipCode?: string;
  price?: number;
  sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  description?: string;
  amenities?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}
