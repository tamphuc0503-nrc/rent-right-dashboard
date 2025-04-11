
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PropertyAddress } from '@/types/property';
import { PropertyTypeIcon } from './PropertyTypeIcon';

interface AddressSearchProps {
  address: string;
  onAddressChange: (value: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  filteredAddresses: PropertyAddress[];
  onSelectAddress: (address: PropertyAddress) => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({
  address,
  onAddressChange,
  showSuggestions,
  setShowSuggestions,
  filteredAddresses,
  onSelectAddress
}) => {
  return (
    <div className="relative">
      <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              id="street-address"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
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
                {filteredAddresses.map((addr) => (
                  <CommandItem 
                    key={addr.id} 
                    onSelect={() => onSelectAddress(addr)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <PropertyTypeIcon type={addr.propertyType} className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{addr.address}</p>
                      <p className="text-xs text-gray-500">{addr.city}, {addr.state} {addr.zipCode} • {addr.propertyType}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddressSearch;
