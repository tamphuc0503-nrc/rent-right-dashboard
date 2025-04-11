
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
  // New fields for enhanced property detail
  images?: string[];
  status?: {
    offer?: string; // e.g., "special offer", "new offer"
    condition?: string; // e.g., "new construction", "90% new"
  };
  facts?: {
    interior?: {
      bedrooms?: number;
      bathrooms?: number;
      fullBathrooms?: number;
      halfBathrooms?: number;
      appliances?: string[];
      flooring?: string[];
      heatingType?: string;
      coolingType?: string;
    };
    exterior?: {
      lotSize?: string;
      parking?: string;
      mailbox?: string;
      parcelNumber?: string;
    };
    garage?: {
      type?: string; // e.g., "attached", "detached"
      capacity?: number;
    };
    community?: {
      hoa?: string;
      communityName?: string;
      location?: string;
      financialDetails?: string;
    };
    construction?: {
      builder?: string;
      yearBuilt?: number;
      homeType?: string;
      propertySubType?: string;
    };
    services?: {
      parks?: string[];
      walkingScore?: number;
      bikeScore?: number;
      internetProviders?: string[];
      tvProviders?: string[];
    };
    schools?: {
      elementary?: {
        name: string;
        score?: number;
        distance?: string;
      }[];
      middle?: {
        name: string;
        score?: number;
        distance?: string;
      }[];
      high?: {
        name: string;
        score?: number;
        distance?: string;
      }[];
    };
  };
  realtor?: {
    name: string;
    phone: string;
    email: string;
    image: string;
    company?: string;
    license?: string;
  };
  // Optional fields for compatibility with PropertyAddress
  propertyType?: string;
}
