export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  status: 'active' | 'inactive' | 'prospect' | 'lead';
  priority: 'low' | 'medium' | 'high';
  source: 'website' | 'referral' | 'social' | 'email' | 'phone' | 'event';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastContact?: string;
  nextFollowUp?: string;
  totalValue: number;
  communicationChannels: CommunicationChannel[];
  notes: CustomerNote[];
  activities: CustomerActivity[];
  address?: CustomerAddress;
  socialProfiles?: SocialProfiles;
}

export interface CommunicationChannel {
  id: string;
  type: 'email' | 'phone' | 'whatsapp' | 'telegram' | 'instagram' | 'facebook';
  value: string;
  isPrimary: boolean;
  isVerified: boolean;
  lastUsed?: string;
}

export interface CustomerNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  type: 'general' | 'meeting' | 'call' | 'email' | 'task';
  isPrivate: boolean;
}

export interface CustomerActivity {
  id: string;
  type: 'email_sent' | 'email_received' | 'call_made' | 'call_received' | 'meeting' | 'note_added' | 'status_changed' | 'deal_created';
  title: string;
  description: string;
  timestamp: string;
  performedBy: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface SocialProfiles {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface CustomerFilters {
  search: string;
  status: string;
  priority: string;
  source: string;
  tags: string[];
}

export interface CustomerStats {
  total: number;
  active: number;
  prospects: number;
  leads: number;
  totalValue: number;
  averageValue: number;
}
