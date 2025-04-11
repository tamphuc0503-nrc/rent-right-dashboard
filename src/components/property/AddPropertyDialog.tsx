
import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AddressSearch from './AddressSearch';
import SelectedProperty from './SelectedProperty';
import { PropertyAddress } from '@/types/property';

// Dummy address suggestions
const dummyAddresses = Array(30).fill(0).map((_, index) => {
  const propertyTypes = ['House', 'Townhouse', 'Condo', 'Apartment Building', 'Land', 'Multi Family', 'Mobile', 'Co-op', 'Other'];
  const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const isMultiUnit = ['Apartment Building', 'Multi Family'].includes(propertyType);
  
  return {
    id: index + 1,
    address: `${index + 100} ${['Main', 'Oak', 'Cedar', 'Maple', 'Pine'][Math.floor(Math.random() * 5)]} ${['St', 'Ave', 'Blvd', 'Dr', 'Ln'][Math.floor(Math.random() * 5)]}`,
    city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
    state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
    zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    propertyType,
    units: isMultiUnit ? Math.floor(Math.random() * 20) + 2 : 1
  };
});

interface AddPropertyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (propertyData: PropertyAddress) => void;
}

const AddPropertyDialog: React.FC<AddPropertyDialogProps> = ({ isOpen, onClose, onAddProperty }) => {
  const [address, setAddress] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyAddress | null>(null);
  const [filteredAddresses, setFilteredAddresses] = useState(dummyAddresses);
  const { toast } = useToast();

  const handleAddressChange = (value: string) => {
    setAddress(value);
    
    if (value.length > 2) {
      const filtered = dummyAddresses.filter(
        addr => addr.address.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAddresses(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectAddress = (address: PropertyAddress) => {
    setSelectedProperty(address);
    setAddress(address.address);
    setShowSuggestions(false);
  };

  const handleAddProperty = () => {
    if (!selectedProperty) {
      toast({
        title: "Missing information",
        description: "Please select a property address from the suggestions.",
        variant: "destructive",
      });
      return;
    }

    onAddProperty(selectedProperty);
    toast({
      title: "Success!",
      description: "Your property has been added successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Home className="h-6 w-6 text-realestate-700" />
            <DialogTitle className="text-xl">Now, let's add your property</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-gray-600">
            Once you add your property, you can list it for free in a lot of channels like Facebook, Zillow, Trulia, HotPads and more.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <AddressSearch 
              address={address}
              onAddressChange={handleAddressChange}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              filteredAddresses={filteredAddresses}
              onSelectAddress={handleSelectAddress}
            />
          </div>

          {selectedProperty && <SelectedProperty property={selectedProperty} />}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAddProperty} className="bg-realestate-700 hover:bg-realestate-800">
            Add Property
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyDialog;
