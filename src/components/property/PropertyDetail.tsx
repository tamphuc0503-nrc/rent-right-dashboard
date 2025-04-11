
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <PropertyHeader property={property} />
        
        <div className="mt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Facts & Features</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <PropertyOverview property={property} />
            </TabsContent>
            
            <TabsContent value="features" className="mt-4">
              <PropertyFeatures property={property} />
            </TabsContent>
            
            <TabsContent value="contact" className="mt-4">
              <PropertyContact property={property} />
            </TabsContent>
          </Tabs>
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
