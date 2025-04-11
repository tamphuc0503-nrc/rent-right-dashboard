
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { PropertyDetailType } from '@/types/propertyDetail';
import PropertyHeader from './detail/PropertyHeader';
import PropertyOverview from './detail/PropertyOverview';
import PropertyAmenities from './detail/PropertyAmenities';
import PropertyContact from './detail/PropertyContact';

interface PropertyDetailProps {
  property: PropertyDetailType;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetail = ({ property, isOpen, onClose }: PropertyDetailProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'contact'>('overview');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{property.address}</DialogTitle>
          <p className="text-gray-600">{property.city}, {property.state}</p>
        </DialogHeader>
        
        <PropertyHeader property={property} />
        
        <div className="mt-6">
          <div className="flex border-b">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-realestate-700 text-realestate-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'amenities' ? 'border-b-2 border-realestate-700 text-realestate-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('amenities')}
            >
              Amenities
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'contact' ? 'border-b-2 border-realestate-700 text-realestate-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact
            </button>
          </div>
          
          {activeTab === 'overview' && <PropertyOverview property={property} />}
          {activeTab === 'amenities' && <PropertyAmenities property={property} />}
          {activeTab === 'contact' && <PropertyContact property={property} />}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">Close</Button>
          <Button>Schedule a Viewing</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetail;
