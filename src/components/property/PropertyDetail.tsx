
import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PropertyDetailType } from '@/types/propertyDetail';
import PropertyHeader from './detail/PropertyHeader';
import PropertyOverview from './detail/PropertyOverview';
import PropertyFeatures from './detail/PropertyFeatures';
import PropertyContact from './detail/PropertyContact';

interface PropertyDetailProps {
  property: PropertyDetailType;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetail = ({ property, isOpen, onClose }: PropertyDetailProps) => {
  const overviewRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="sticky top-0 z-10 bg-white p-6 pb-4 border-b">
          <PropertyHeader property={property} />
          
          <div className="mt-6 flex space-x-4 overflow-x-auto pb-2">
            <Button 
              variant="ghost" 
              className="flex-shrink-0"
              onClick={() => scrollToSection(overviewRef)}
            >
              Overview
            </Button>
            <Button 
              variant="ghost" 
              className="flex-shrink-0"
              onClick={() => scrollToSection(featuresRef)}
            >
              Facts & Features
            </Button>
            <Button 
              variant="ghost" 
              className="flex-shrink-0"
              onClick={() => scrollToSection(contactRef)}
            >
              Contact
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(90vh-150px)] px-6">
          <div className="pb-6">
            <div ref={overviewRef}>
              <h2 className="text-xl font-semibold pt-6 mb-4">Overview</h2>
              <PropertyOverview property={property} />
            </div>
            
            <div ref={featuresRef}>
              <h2 className="text-xl font-semibold pt-8 mb-4">Facts & Features</h2>
              <PropertyFeatures property={property} />
            </div>
            
            <div ref={contactRef}>
              <h2 className="text-xl font-semibold pt-8 mb-4">Contact</h2>
              <PropertyContact property={property} />
            </div>
          </div>
        </ScrollArea>
        
        <div className="sticky bottom-0 p-4 bg-white border-t flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">Close</Button>
          <Button>Schedule a Viewing</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetail;
