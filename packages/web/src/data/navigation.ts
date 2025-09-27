import { NavItem } from '@/types/navigation';

export const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'grid',
    href: '/dashboard'
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: 'users',
    href: '/customers',
    active: true,
    // children: [
    //   {
    //     id: 'badges',
    //     label: 'Badges',
    //     icon: 'badge',
    //     href: '/customers/badges',
    //     active: true
    //   },
    //   {
    //     id: 'logs',
    //     label: 'Customers Logs',
    //     icon: 'file-text',
    //     href: '/customers/logs'
    //   },
    //   {
    //     id: 'vouchers',
    //     label: 'Gift Vouchers',
    //     icon: 'gift',
    //     href: '/customers/vouchers'
    //   }
    // ]
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: 'folder',
    href: '/leads'
  },
  {
    id: 'Integrations',
    label: 'Integrations',
    icon: 'wallet',
    href: '/integrations'
  },

];

export const bottomNavItems: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    href: '/settings'
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: 'log-out',
    href: '/logout'
  }
];

