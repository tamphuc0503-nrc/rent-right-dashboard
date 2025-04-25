
import {
  BarChart3,
  Users,
  UserCircle,
  Settings,
  ClipboardList,
  Calendar,
  Clock4,
  Mail,
} from 'lucide-react';
import { SidebarItem } from '@/types/sidebar';
import { getRecentOrderIds } from '@/utils/recentOrders';

const DUMMY_RECENTS = [
  { title: "ORD-10005", path: "/orders/ORD-10005" },
  { title: "ORD-10043", path: "/orders/ORD-10043" },
  { title: "ORD-10122", path: "/orders/ORD-10122" },
  { title: "ORD-10237", path: "/orders/ORD-10237" },
  { title: "ORD-10300", path: "/orders/ORD-10300" },
];

function getRecentsSubItems() {
  const ids = getRecentOrderIds();
  const seen = new Set();
  const ordered =
    ids.length > 0
      ? ids
          .map((id) => DUMMY_RECENTS.find((rec) => rec.title === id) || { title: id, path: `/orders/${id}` })
          .filter((item) => {
            if (seen.has(item.title)) return false;
            seen.add(item.title);
            return true;
          })
      : [];
  const fullList = [...ordered];
  for (let item of DUMMY_RECENTS) {
    if (fullList.length >= 5) break;
    if (!seen.has(item.title)) {
      fullList.push(item);
      seen.add(item.title);
    }
  }
  return fullList.slice(0, 5);
}

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
    subItems: getRecentsSubItems(),
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
    title: 'My Messages',
    icon: Mail,
    path: '/messages',
  },
  {
    title: "Externals",
    icon: Users,
    path: "",
    subItems: [
      // Removed Companies
      { title: "Clients", path: "/clients" },
      { title: "Agents", path: "/agents" },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
    subItems: [
      { title: 'General', path: '/settings/general' },
      { title: 'Change Password', path: '/settings/password' },
      { title: 'DocuSign Keys', path: '/settings/docusign' },
      { title: 'Custom Fields', path: '/settings/custom-fields' },
      { title: 'Templates', path: '/settings/templates' },
    ],
  },
];
