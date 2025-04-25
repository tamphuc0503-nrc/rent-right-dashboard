import {
  BarChart3,
  Users,
  Building,
  UserCircle,
  Settings,
  ClipboardList,
  Calendar,
  Bell,
} from 'lucide-react';
import { SidebarItem } from '@/types/sidebar';

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    path: '/dashboard',
  },
  {
    title: 'Orders',
    icon: ClipboardList,
    path: '/orders',
  },
  {
    title: 'Calendar',
    icon: Calendar,
    path: '/calendar',
    subItems: [
      { title: 'Scheduler', path: '/calendar/scheduling' },
      { title: 'My Upcoming Orders', path: '/calendar/upcoming/orders' },
      { title: 'Map of Upcoming Orders', path: '/calendar/map' },
    ],
  },
  {
    title: 'Inspectors',
    icon: UserCircle,
    path: '/inspectors',
  },
  {
    title: 'Companies',
    icon: Building,
    path: '/companies',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
    subItems: [
      { title: 'General Settings', path: '/settings/general' },
      { title: 'Change Password', path: '/settings/password' },
      { title: 'Notifications', path: '/settings/notifications' },
      { title: 'DocuSign Keys', path: '/settings/docusign' },
      { title: 'Custom Fields', path: '/settings/custom-fields' },
    ],
  },
  {
    title: 'My Notifications',
    icon: Bell,
    path: '/notifications',
  },
];
