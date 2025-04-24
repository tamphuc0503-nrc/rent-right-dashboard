
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const SERVICES = [
  { id: 'flexfund', label: 'FlexFund' },
  { id: 'mold', label: 'Mold Inspection' },
];

export function ServicesSection({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormLabel>Additional Services</FormLabel>
        <div className="grid grid-cols-2 gap-4">
          {SERVICES.map(service => (
            <FormField
              key={service.id}
              control={form.control}
              name={`services.${service.id}`}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{service.label}</FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
