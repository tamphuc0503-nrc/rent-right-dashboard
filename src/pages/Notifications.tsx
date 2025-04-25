
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { MessagesSquare, Mail } from 'lucide-react';

type Notification = {
  id: string;
  type: 'sms' | 'email';
  content: string;
  clientName: string;
  clientEmail: string;
  date: string;
};

const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'sms',
    content: 'Your inspection is scheduled for tomorrow at 2 PM',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    date: '2024-04-25',
  },
  {
    id: '2',
    type: 'email',
    content: 'Inspection report has been completed',
    clientName: 'Jane Smith',
    clientEmail: 'jane@example.com',
    date: '2024-04-24',
  },
];

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    content: '',
    clientName: '',
    clientEmail: '',
    fromDate: '',
    toDate: '',
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = dummyNotifications.filter(notification => {
    return (
      notification.content.toLowerCase().includes(filter.content.toLowerCase()) &&
      notification.clientName.toLowerCase().includes(filter.clientName.toLowerCase()) &&
      notification.clientEmail.toLowerCase().includes(filter.clientEmail.toLowerCase()) &&
      (!filter.fromDate || notification.date >= filter.fromDate) &&
      (!filter.toDate || notification.date <= filter.toDate)
    );
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <Input
              placeholder="Filter by content"
              value={filter.content}
              onChange={(e) => setFilter(prev => ({ ...prev, content: e.target.value }))}
            />
            <Input
              placeholder="Filter by client name"
              value={filter.clientName}
              onChange={(e) => setFilter(prev => ({ ...prev, clientName: e.target.value }))}
            />
            <Input
              placeholder="Filter by client email"
              value={filter.clientEmail}
              onChange={(e) => setFilter(prev => ({ ...prev, clientEmail: e.target.value }))}
            />
            <Input
              type="date"
              placeholder="From date"
              value={filter.fromDate}
              onChange={(e) => setFilter(prev => ({ ...prev, fromDate: e.target.value }))}
            />
            <Input
              type="date"
              placeholder="To date"
              value={filter.toDate}
              onChange={(e) => setFilter(prev => ({ ...prev, toDate: e.target.value }))}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Client Email</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-6 w-6" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : (
                filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      {notification.type === 'sms' ? (
                        <MessagesSquare className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Mail className="h-5 w-5 text-green-500" />
                      )}
                    </TableCell>
                    <TableCell>{notification.content}</TableCell>
                    <TableCell>{notification.clientName}</TableCell>
                    <TableCell>{notification.clientEmail}</TableCell>
                    <TableCell>{notification.date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
