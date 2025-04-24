import { useState } from "react";
import { Eye, Users } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import clsx from "clsx";

function getDummyInspectors() {
  const companies = ["HomeCheck LLC", "SafeNest", "InspectoPro", "QuickHouse", "PrimeInspections"];
  return Array.from({ length: 60 }).map((_, i) => {
    const comp = companies[i % companies.length];
    return {
      id: i + 1,
      name: `Inspector ${i + 1}`,
      email: `inspector${i + 1}@${comp.toLowerCase().replace(/\s/g, '')}.com`,
      phone: `0812${String(40000000 + i).slice(-8)}`,
      company: comp,
      status: i % 4 === 0 ? "de-active" : "active",
      point: (i % 5) + 1,
      wip: i % 2 === 0 ? "inspecting" : "non-schedule",
      address: `${300 + i} 2nd Ave, Cityville`,
      tags: ["roof", "electric", "plumbing"].filter((_, idx) => (idx + i) % 2 === 0),
      notes: "Very detail oriented. Great with customers.",
      housesInspected: Array.from({ length: Math.floor(2 + Math.random() * 8) }, (_, h) => ({
        id: i * 100 + h,
        address: `${10 + h} Maple St, Historycity`,
        date: `2024-0${(h%9)+1}-12`,
      })),
    }
  });
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-600",
  "de-active": "bg-red-100 text-red-600"
};

const Inspectors = () => {
  const [inspectors] = useState(() => getDummyInspectors());
  const [selected, setSelected] = useState<typeof inspectors[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (inspector: typeof inspectors[0]) => {
    setSelected(inspector);
    setIsOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="text-realestate-700" /> Inspectors
            </h2>
          </div>
          <div className="border rounded-lg overflow-x-auto bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Point</TableHead>
                  <TableHead>WIP</TableHead>
                  <TableHead className="text-center">Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inspectors.map(inspector => (
                  <TableRow key={inspector.id}>
                    <TableCell>{inspector.name}</TableCell>
                    <TableCell>{inspector.email}</TableCell>
                    <TableCell>{inspector.phone}</TableCell>
                    <TableCell>
                      <span className={clsx("px-2 py-1 rounded text-xs font-semibold", STATUS_COLORS[inspector.status])}>
                        {inspector.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-block font-semibold">{inspector.point}</span>
                      <span className="ml-1 text-yellow-400">★</span>
                    </TableCell>
                    <TableCell>
                      <span className={clsx(
                        "px-2 py-1 rounded text-xs font-semibold",
                        inspector.wip === "inspecting" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                      )}>
                        {inspector.wip}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm" onClick={() => openDialog(inspector)}>
                        <Eye className="h-4 w-4 mr-1" /> Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={(o) => { if(!o){ setSelected(null); } setIsOpen(o); }}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Inspector Information</DialogTitle>
              <DialogDescription>
                Detailed inspector info and inspection history.
              </DialogDescription>
            </DialogHeader>
            {selected && (
              <div className="space-y-2 mt-2">
                <div><b>Name:</b> {selected.name}</div>
                <div><b>Email:</b> {selected.email}</div>
                <div><b>Status:</b> <span className={clsx("px-2 py-1 rounded text-xs font-semibold", STATUS_COLORS[selected.status])}>
                  {selected.status}
                </span></div>
                <div><b>Point:</b> {selected.point} <span className="text-yellow-400">★</span></div>
                <div><b>Phone:</b> {selected.phone}</div>
                <div><b>Address:</b> {selected.address}</div>
                <div><b>Tags:</b> {selected.tags.map(tag => (
                  <span key={tag} className="inline-block mr-1 bg-realestate-50 text-xs px-2 py-0.5 rounded">{tag}</span>
                ))}</div>
                <div><b>Notes:</b> <span className="text-gray-700">{selected.notes}</span></div>
                <div>
                  <b>Houses Inspected Before:</b>
                  <ul className="ml-4 mt-1 list-disc space-y-1 text-sm">
                    {selected.housesInspected.map(house => (
                      <li key={house.id}>
                        <span className="font-semibold">{house.address}</span> — <span className="text-gray-400">{house.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
};

export default Inspectors;
