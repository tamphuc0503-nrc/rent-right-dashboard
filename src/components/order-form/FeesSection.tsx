
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function FeesSection({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="inspectionFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inspection Fee</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0.00" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="thirdPartyFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Third Party Inspections</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0.00" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="discountFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0.00" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="processingFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Card Processing Fee</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0.00" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
