
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function AgentsSection({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="agentName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter agent name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="agentEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="agent@example.com" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="agentPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent Phone</FormLabel>
            <FormControl>
              <Input placeholder="(555) 555-5555" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="isSeller"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Seller's Agent</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isBuyer"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Buyer's Agent</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
