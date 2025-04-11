
import React, { useState } from 'react';
import { Heart, Share, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyDetailType } from '@/types/propertyDetail';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface PropertyHeaderProps {
  property: PropertyDetailType;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  
  // Default image if none provided
  const defaultImage = property.image;
  
  // Use the images array if available, otherwise create a single-item array with the default image
  const allImages = property.images && property.images.length > 0 
    ? [defaultImage, ...property.images] 
    : [defaultImage];
  
  // Limit to 5 images for the gallery
  const galleryImages = allImages.slice(0, 5);
  const hasMoreImages = allImages.length > 5;
  
  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Removed from saved properties" : "Saved to your favorites",
      description: saved ? "Property has been removed from your saved list." : "Property has been added to your saved list.",
    });
  };
  
  const handleShare = () => {
    // In a real app, this would open a share modal or copy a link
    toast({
      title: "Share this property",
      description: "Link copied to clipboard. You can now share this property.",
    });
  };
  
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{property.address}</h2>
          <p className="text-gray-600">{property.city}, {property.state} {property.zipCode}</p>
          
          {property.status && (
            <div className="flex flex-wrap gap-2 mt-2">
              {property.status.offer && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {property.status.offer}
                </span>
              )}
              {property.status.condition && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {property.status.condition}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleSave}
          >
            <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      {galleryImages.length === 1 ? (
        <div className="h-80 overflow-hidden rounded-lg">
          <img 
            src={galleryImages[0]} 
            alt={property.address} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 h-96">
          {/* Main large image */}
          <div className="col-span-1 row-span-2 h-full">
            <img 
              src={galleryImages[0]} 
              alt={`${property.address} main view`} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Grid of smaller images */}
          <div className="col-span-1 grid grid-cols-2 gap-2">
            {galleryImages.slice(1, 5).map((img, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg">
                <img 
                  src={img} 
                  alt={`${property.address} view ${index + 2}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Show "See All Photos" button on the last visible image if there are more */}
                {index === 3 && hasMoreImages && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button variant="outline" className="text-white border-white hover:bg-white/20">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      See All Photos
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {property.price && (
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-md">
          <span className="font-semibold text-realestate-700">
            ${property.price.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default PropertyHeader;
