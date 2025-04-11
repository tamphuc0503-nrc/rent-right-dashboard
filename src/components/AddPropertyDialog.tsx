
import React, { useState } from 'react';
import { Home, Building, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

// Property types with icons
const propertyTypes = [
  { type: 'House', icon: Home, units: 1 },
  { type: 'Townhouse', icon: Building, units: 1 },
  { type: 'Condo', icon: Building, units: 1 },
  { type: 'Apartment Building', icon: Building, units: 'multiple' },
  { type: 'Land', icon: 'land' },
  { type: 'Multi Family', icon: Building, units: 'multiple' },
  { type: 'Mobile', icon: Home, units: 1 },
  { type: 'Co-op', icon: Building, units: 1 },
  { type: 'Other', icon: Building },
];

// Dummy address suggestions
const dummyAddresses = Array(30).fill(0).map((_, index) => {
  const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  return {
    id: index + 1,
    address: `${index + 100} ${['Main', 'Oak', 'Cedar', 'Maple', 'Pine'][Math.floor(Math.random() * 5)]} ${['St', 'Ave', 'Blvd', 'Dr', 'Ln'][Math.floor(Math.random() * 5)]}`,
    city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
    state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
    zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    propertyType: propertyType.type,
    units: propertyType.units === 'multiple' ? Math.floor(Math.random() * 20) + 2 : 1
  };
});

interface AddPropertyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (propertyData: any) => void;
}

const AddPropertyDialog: React.FC<AddPropertyDialogProps> = ({ isOpen, onClose, onAddProperty }) => {
  const [address, setAddress] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
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

  const handleSelectAddress = (address: any) => {
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

  const getPropertyIcon = (type: string) => {
    const propertyType = propertyTypes.find(p => p.type === type);
    if (!propertyType) return Building;
    
    if (typeof propertyType.icon === 'string') {
      return Building; // Default fallback for string icons
    }
    
    return propertyType.icon;
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
            <div className="relative">
              <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="street-address"
                      value={address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      placeholder="Enter your street address"
                      className="pl-10"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full" align="start">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No addresses found</CommandEmpty>
                      <CommandGroup heading="Suggested Addresses">
                        {filteredAddresses.map((addr) => {
                          const PropertyIcon = getPropertyIcon(addr.propertyType);
                          return (
                            <CommandItem 
                              key={addr.id} 
                              onSelect={() => handleSelectAddress(addr)}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <PropertyIcon className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="font-medium">{addr.address}</p>
                                <p className="text-xs text-gray-500">{addr.city}, {addr.state} {addr.zipCode} • {addr.propertyType}</p>
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {selectedProperty && (
            <div className="p-4 border rounded-md bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                {React.createElement(getPropertyIcon(selectedProperty.propertyType), { className: "h-5 w-5 text-realestate-700" })}
                <h3 className="font-medium">{selectedProperty.propertyType}</h3>
              </div>
              
              {selectedProperty.units > 1 && (
                <div className="mt-2 flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{selectedProperty.units} Units</span>
                </div>
              )}
              
              <p className="mt-1 text-sm text-gray-600">
                {selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state} {selectedProperty.zipCode}
              </p>
            </div>
          )}
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
