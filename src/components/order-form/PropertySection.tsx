
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const PROPERTY_TYPES = [
  "Single Family",
  "Duplex",
  "Triplex",
  "Quad-plex",
  "Other"
];

const FOUNDATION_TYPES = [
  "Slab-on-grade",
  "Crawl Space",
  "Pier-and-beam"
];

const PROPERTY_TAGS = [
  { id: 'clientAttending', label: 'Client Attending' },
  { id: 'occupied', label: 'Occupied' },
  { id: 'utilities', label: 'Utilities On' },
  { id: 'alarm', label: 'Has Alarm' },
];

export function PropertySection({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="propertyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Address</FormLabel>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <FormControl>
                <Input 
                  placeholder="Enter property address" 
                  className="pl-10"
                  {...field} 
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertyType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PROPERTY_TYPES.map(type => (
                  <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="yearBuilt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Built</FormLabel>
              <FormControl>
                <Input type="number" placeholder="YYYY" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age (years)</FormLabel>
              <FormControl>
                <Input type="number" {...field} readOnly />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="foundationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foundation Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select foundation type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {FOUNDATION_TYPES.map(type => (
                  <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="gateCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gate Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lockboxCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lockbox Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="mlsNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>MLS Number</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel>Property Tags</FormLabel>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TAGS.map(tag => (
            <FormField
              key={tag.id}
              control={form.control}
              name={`tags.${tag.id}`}
              render={({ field }) => (
                <Badge
                  variant={field.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => field.onChange(!field.value)}
                >
                  {tag.label}
                </Badge>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
