import { NavItem } from '@/types/navigation';

export const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'dashboard',
    icon: 'grid',
    href: '/dashboard'
  },
  {
    id: 'customers',
    label: 'customers',
    icon: 'users',
    href: '/dashboard/customers',
    // children: [
    //   {
    //     id: 'badges',
    //     label: 'badges',
    //     icon: 'badge',
    //     href: '/customers/badges',
    //     active: true
    //   },
    //   {
    //     id: 'logs',
    //     label: 'logs',
    //     icon: 'file-text',
    //     href: '/customers/logs'
    //   },
    //   {
    //     id: 'vouchers',
    //     label: 'vouchers',
    //     icon: 'gift',
    //     href: '/customers/vouchers'
    //   }
    // ]
  },
  {
    id: 'leads',
    label: 'leads',
    icon: 'folder',
    href: '/dashboard/leads'
  },
  {
    id: 'pipeline',
    label: 'pipeline',
    icon: 'bar-chart',
    href: '/dashboard/pipeline'
  },
  {
    id: 'integrations',
    label: 'integrations',
    icon: 'wallet',
    href: '/dashboard/integrations'
  },
];

export const bottomNavItems: NavItem[] = [
  {
    id: 'settings',
    label: 'settings',
    icon: 'settings',
    href: '/dashboard/settings'
  },
  {
    id: 'logout',
    label: 'logout',
    icon: 'log-out',
    href: '/logout'
  }
];

