
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { PropertyDetailType } from '@/types/propertyDetail';
import { PropertyAddress } from '@/types/property';
import { sampleProperties } from '@/data/sampleProperties';

interface PropertiesState {
  properties: PropertyDetailType[];
  selectedProperty: PropertyDetailType | null;
  viewMode: 'grid' | 'list';
  searchTerm: string;
  showAddPropertyDialog: boolean;
}

const initialState: PropertiesState = {
  properties: sampleProperties,
  selectedProperty: null,
  viewMode: 'grid',
  searchTerm: '',
  showAddPropertyDialog: false,
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setSelectedProperty: (state, action: PayloadAction<PropertyDetailType | null>) => {
      state.selectedProperty = action.payload;
    },
    setShowAddPropertyDialog: (state, action: PayloadAction<boolean>) => {
      state.showAddPropertyDialog = action.payload;
    },
    addProperty: (state, action: PayloadAction<PropertyAddress>) => {
      const propertyData = action.payload;
      const newProperty: PropertyDetailType = {
        id: state.properties.length + 1,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        type: propertyData.propertyType || 'Unknown',
        units: propertyData.units,
        occupancyRate: '0%',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        zipCode: propertyData.zipCode,
      };
      state.properties = [newProperty, ...state.properties];
    }
  },
});

export const { 
  setSearchTerm, 
  setViewMode, 
  setSelectedProperty,
  setShowAddPropertyDialog,
  addProperty 
} = propertiesSlice.actions;

// Selectors
export const selectProperties = (state: RootState) => state.properties.properties;
export const selectSearchTerm = (state: RootState) => state.properties.searchTerm;
export const selectViewMode = (state: RootState) => state.properties.viewMode;
export const selectSelectedProperty = (state: RootState) => state.properties.selectedProperty;
export const selectShowAddPropertyDialog = (state: RootState) => state.properties.showAddPropertyDialog;
export const selectFilteredProperties = (state: RootState) => {
  const { properties, searchTerm } = state.properties;
  return properties.filter(property => 
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default propertiesSlice.reducer;
