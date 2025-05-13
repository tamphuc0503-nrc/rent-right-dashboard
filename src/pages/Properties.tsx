
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import PropertyDetail from '@/components/property/PropertyDetail';
import AddPropertyDialog from '@/components/property/AddPropertyDialog';
import { useToast } from '@/hooks/use-toast';
import { PropertyAddress } from '@/types/property';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertySearch from '@/components/property/PropertySearch';
import PropertyGrid from '@/components/property/PropertyGrid';
import PropertyListTable from '@/components/property/PropertyListTable';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSearchTerm,
  setViewMode,
  setSelectedProperty,
  setShowAddPropertyDialog,
  addProperty,
  selectFilteredProperties,
  selectSearchTerm,
  selectViewMode,
  selectSelectedProperty,
  selectShowAddPropertyDialog
} from '@/store/slices/propertiesSlice';

const Properties = () => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  // Select state from Redux
  const searchTerm = useAppSelector(selectSearchTerm);
  const viewMode = useAppSelector(selectViewMode);
  const selectedProperty = useAppSelector(selectSelectedProperty);
  const showAddPropertyDialog = useAppSelector(selectShowAddPropertyDialog);
  const filteredProperties = useAppSelector(selectFilteredProperties);

  const handleViewProperty = (property: any) => {
    dispatch(setSelectedProperty(property));
  };
  
  const handleAddProperty = (propertyData: PropertyAddress) => {
    dispatch(addProperty(propertyData));
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
          <PropertyHeader onAddProperty={() => dispatch(setShowAddPropertyDialog(true))} />
          
          <PropertySearch 
            searchTerm={searchTerm}
            onSearchChange={(term) => dispatch(setSearchTerm(term))}
            viewMode={viewMode}
            onViewModeChange={(mode) => dispatch(setViewMode(mode))}
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
          onClose={() => dispatch(setSelectedProperty(null))} 
        />
      )}
      
      <AddPropertyDialog 
        isOpen={showAddPropertyDialog}
        onClose={() => dispatch(setShowAddPropertyDialog(false))}
        onAddProperty={handleAddProperty}
      />
    </div>
  );
};

export default Properties;
