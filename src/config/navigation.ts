
import {
  BarChart3,
  Users,
  Building,
  UserCircle,
  Settings,
  ClipboardList,
  Calendar,
  Clock4
} from 'lucide-react';
import { SidebarItem } from '@/types/sidebar';

// Dummy recents data, these can be replaced with real logic later
const recentOrderIds = [
  { title: "ORD-10005", path: "/orders" },
  { title: "ORD-10043", path: "/orders" },
  { title: "ORD-10122", path: "/orders" },
  { title: "ORD-10237", path: "/orders" },
  { title: "ORD-10300", path: "/orders" },
];

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    path: '/dashboard',
  },
  {
    title: 'Recents',
    icon: Clock4,
    path: '',
    subItems: recentOrderIds,
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
      { title: 'DocuSign Keys', path: '/settings/docusign' },
      { title: 'Custom Fields', path: '/settings/custom-fields' },
      { title: 'Templates', path: '/settings/templates' },
    ],
  },
];
