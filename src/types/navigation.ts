export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  children?: NavItem[];
  active?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export interface NavigationProps {
  user: UserProfile;
  items: NavItem[];
}

