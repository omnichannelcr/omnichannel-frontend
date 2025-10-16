export interface PublicNavItem {
  id: string;
  labelKey: string;
  href: string;
}

export const publicNavigationItems: PublicNavItem[] = [
  {
    id: 'features',
    labelKey: 'publicNavigation.features',
    href: '#features'
  },
  {
    id: 'integrations',
    labelKey: 'publicNavigation.integrations',
    href: '#integrations'
  },
  {
    id: 'pricing',
    labelKey: 'publicNavigation.pricing',
    href: '#pricing'
  },
  {
    id: 'about',
    labelKey: 'publicNavigation.about',
    href: '#about'
  }
];

export const authItems = {
  login: {
    labelKey: 'publicNavigation.login',
    href: '/login'
  },
  signup: {
    labelKey: 'publicNavigation.getStarted',
    href: '/signup'
  }
};
