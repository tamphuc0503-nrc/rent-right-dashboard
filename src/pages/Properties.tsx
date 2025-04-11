
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import PropertyDetail from '@/components/property/PropertyDetail';
import AddPropertyDialog from '@/components/property/AddPropertyDialog';
import { useToast } from '@/hooks/use-toast';
import { PropertyDetailType } from '@/types/propertyDetail';
import { PropertyAddress } from '@/types/property';
import { sampleProperties } from '@/data/sampleProperties';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertySearch from '@/components/property/PropertySearch';
import PropertyGrid from '@/components/property/PropertyGrid';
import PropertyListTable from '@/components/property/PropertyListTable';

const Properties = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetailType | null>(null);
  const [showAddPropertyDialog, setShowAddPropertyDialog] = useState(false);
  const [propertiesList, setPropertiesList] = useState<PropertyDetailType[]>(sampleProperties);
  const { toast } = useToast();
  
  const filteredProperties = propertiesList.filter(property => 
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProperty = (property: PropertyDetailType) => {
    setSelectedProperty(property);
  };
  
  const handleAddProperty = (propertyData: PropertyAddress) => {
    const newProperty: PropertyDetailType = {
      id: propertiesList.length + 1,
      address: propertyData.address,
      city: propertyData.city,
      state: propertyData.state,
      type: propertyData.propertyType || 'Unknown',
      units: propertyData.units,
      occupancyRate: '0%',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      zipCode: propertyData.zipCode,
    };
    
    setPropertiesList([newProperty, ...propertiesList]);
    toast({
      title: "Property Added",
      description: `${propertyData.address} has been added to your properties.`,
    });
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'}`}>
        <DashboardHeader />
        
        <main className="p-6">
          <PropertyHeader onAddProperty={() => setShowAddPropertyDialog(true)} />
          
          <PropertySearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          {viewMode === 'grid' ? (
            <PropertyGrid 
              properties={filteredProperties} 
              onViewProperty={handleViewProperty} 
            />
          ) : (
            <PropertyListTable 
              properties={filteredProperties} 
              onViewProperty={handleViewProperty} 
            />
          )}
        </main>
      </div>
      
      {selectedProperty && (
        <PropertyDetail 
          property={selectedProperty} 
          isOpen={!!selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
      
      <AddPropertyDialog 
        isOpen={showAddPropertyDialog}
        onClose={() => setShowAddPropertyDialog(false)}
        onAddProperty={handleAddProperty}
      />
    </div>
  );
};

export default Properties;
