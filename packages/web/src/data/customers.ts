import { Customer, CustomerStats } from '@/types/customers';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    position: 'Marketing Director',
    status: 'active',
    priority: 'high',
    source: 'website',
    tags: ['enterprise', 'marketing', 'decision-maker'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-12-01T14:20:00Z',
    lastContact: '2024-11-28T16:45:00Z',
    nextFollowUp: '2024-12-05T09:00:00Z',
    totalValue: 45000,
    communicationChannels: [
      {
        id: 'ch1',
        type: 'email',
        value: 'sarah.johnson@techcorp.com',
        isPrimary: true,
        isVerified: true,
        lastUsed: '2024-11-28T16:45:00Z'
      },
      {
        id: 'ch2',
        type: 'phone',
        value: '+1 (555) 123-4567',
        isPrimary: false,
        isVerified: true,
        lastUsed: '2024-11-25T11:30:00Z'
      },
      {
        id: 'ch3',
        type: 'whatsapp',
        value: '+1 (555) 123-4567',
        isPrimary: false,
        isVerified: true,
        lastUsed: '2024-11-20T08:15:00Z'
      }
    ],
    notes: [
      {
        id: 'n1',
        content: 'Interested in enterprise package. Needs approval from CFO.',
        createdAt: '2024-11-28T16:50:00Z',
        createdBy: 'John Smith',
        type: 'meeting',
        isPrivate: false
      },
      {
        id: 'n2',
        content: 'Follow up on pricing proposal sent last week.',
        createdAt: '2024-11-21T14:30:00Z',
        createdBy: 'John Smith',
        type: 'task',
        isPrivate: false
      }
    ],
    activities: [
      {
        id: 'a1',
        type: 'email_sent',
        title: 'Proposal Sent',
        description: 'Enterprise package proposal sent for review',
        timestamp: '2024-11-28T16:45:00Z',
        performedBy: 'John Smith'
      },
      {
        id: 'a2',
        type: 'meeting',
        title: 'Discovery Call',
        description: '45-minute discovery call to understand requirements',
        timestamp: '2024-11-25T11:30:00Z',
        performedBy: 'John Smith'
      }
    ],
    address: {
      street: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zipCode: '94105'
    },
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahj_marketing'
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@startup.io',
    phone: '+1 (555) 987-6543',
    company: 'StartupIO',
    position: 'CEO',
    status: 'prospect',
    priority: 'medium',
    source: 'referral',
    tags: ['startup', 'ceo', 'tech'],
    createdAt: '2024-02-10T08:15:00Z',
    updatedAt: '2024-11-30T10:45:00Z',
    lastContact: '2024-11-26T13:20:00Z',
    nextFollowUp: '2024-12-03T15:00:00Z',
    totalValue: 12000,
    communicationChannels: [
      {
        id: 'ch4',
        type: 'email',
        value: 'michael.chen@startup.io',
        isPrimary: true,
        isVerified: true,
        lastUsed: '2024-11-26T13:20:00Z'
      },
      {
        id: 'ch5',
        type: 'telegram',
        value: '@michaelchen',
        isPrimary: false,
        isVerified: true,
        lastUsed: '2024-11-24T09:45:00Z'
      }
    ],
    notes: [
      {
        id: 'n3',
        content: 'Very interested in our AI features. Budget approved for Q1.',
        createdAt: '2024-11-26T13:25:00Z',
        createdBy: 'Jane Doe',
        type: 'call',
        isPrivate: false
      }
    ],
    activities: [
      {
        id: 'a3',
        type: 'call_made',
        title: 'Follow-up Call',
        description: 'Discussed implementation timeline and budget',
        timestamp: '2024-11-26T13:20:00Z',
        performedBy: 'Jane Doe'
      }
    ],
    address: {
      street: '456 Innovation Blvd',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      zipCode: '73301'
    }
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@consulting.com',
    phone: '+1 (555) 456-7890',
    company: 'Rodriguez Consulting',
    position: 'Senior Consultant',
    status: 'lead',
    priority: 'low',
    source: 'social',
    tags: ['consulting', 'small-business'],
    createdAt: '2024-03-22T12:00:00Z',
    updatedAt: '2024-11-29T09:30:00Z',
    lastContact: '2024-11-22T14:15:00Z',
    totalValue: 8500,
    communicationChannels: [
      {
        id: 'ch6',
        type: 'email',
        value: 'emma.rodriguez@consulting.com',
        isPrimary: true,
        isVerified: true,
        lastUsed: '2024-11-22T14:15:00Z'
      },
      {
        id: 'ch7',
        type: 'instagram',
        value: '@emmarod_consulting',
        isPrimary: false,
        isVerified: false,
        lastUsed: '2024-11-18T16:30:00Z'
      }
    ],
    notes: [
      {
        id: 'n4',
        content: 'Needs basic package for small team. Price sensitive.',
        createdAt: '2024-11-22T14:20:00Z',
        createdBy: 'Mike Wilson',
        type: 'email',
        isPrivate: false
      }
    ],
    activities: [
      {
        id: 'a4',
        type: 'email_received',
        title: 'Inquiry Received',
        description: 'Asked about pricing for small team package',
        timestamp: '2024-11-22T14:15:00Z',
        performedBy: 'System'
      }
    ],
    address: {
      street: '789 Consultant Way',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33101'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@enterprise.com',
    phone: '+1 (555) 321-0987',
    company: 'Enterprise Corp',
    position: 'VP of Operations',
    status: 'active',
    priority: 'high',
    source: 'event',
    tags: ['enterprise', 'operations', 'long-term'],
    createdAt: '2024-01-08T14:45:00Z',
    updatedAt: '2024-12-01T11:15:00Z',
    lastContact: '2024-11-30T10:00:00Z',
    nextFollowUp: '2024-12-07T14:00:00Z',
    totalValue: 75000,
    communicationChannels: [
      {
        id: 'ch8',
        type: 'email',
        value: 'david.kim@enterprise.com',
        isPrimary: true,
        isVerified: true,
        lastUsed: '2024-11-30T10:00:00Z'
      },
      {
        id: 'ch9',
        type: 'phone',
        value: '+1 (555) 321-0987',
        isPrimary: false,
        isVerified: true,
        lastUsed: '2024-11-28T15:30:00Z'
      }
    ],
    notes: [
      {
        id: 'n5',
        content: 'Expanding to 3 new locations. Needs scalable solution.',
        createdAt: '2024-11-30T10:05:00Z',
        createdBy: 'Sarah Wilson',
        type: 'meeting',
        isPrivate: false
      }
    ],
    activities: [
      {
        id: 'a5',
        type: 'deal_created',
        title: 'New Deal Created',
        description: 'Enterprise expansion deal for $75k',
        timestamp: '2024-11-30T10:00:00Z',
        performedBy: 'Sarah Wilson'
      }
    ],
    address: {
      street: '321 Corporate Plaza',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa@freelancer.com',
    phone: '+1 (555) 654-3210',
    company: 'Freelance Designer',
    position: 'Creative Director',
    status: 'inactive',
    priority: 'low',
    source: 'website',
    tags: ['freelancer', 'design', 'creative'],
    createdAt: '2024-04-15T16:20:00Z',
    updatedAt: '2024-10-15T12:30:00Z',
    lastContact: '2024-09-20T11:45:00Z',
    totalValue: 2500,
    communicationChannels: [
      {
        id: 'ch10',
        type: 'email',
        value: 'lisa@freelancer.com',
        isPrimary: true,
        isVerified: true,
        lastUsed: '2024-09-20T11:45:00Z'
      },
      {
        id: 'ch11',
        type: 'instagram',
        value: '@lisadesigns',
        isPrimary: false,
        isVerified: true,
        lastUsed: '2024-09-15T14:20:00Z'
      }
    ],
    notes: [
      {
        id: 'n6',
        content: 'Lost interest after pricing discussion. May re-engage later.',
        createdAt: '2024-09-20T11:50:00Z',
        createdBy: 'Tom Brown',
        type: 'general',
        isPrivate: false
      }
    ],
    activities: [
      {
        id: 'a6',
        type: 'status_changed',
        title: 'Status Changed',
        description: 'Changed from prospect to inactive',
        timestamp: '2024-10-15T12:30:00Z',
        performedBy: 'Tom Brown'
      }
    ],
    address: {
      street: '654 Creative St',
      city: 'Portland',
      state: 'OR',
      country: 'USA',
      zipCode: '97201'
    }
  }
];

export const customerStats: CustomerStats = {
  total: mockCustomers.length,
  active: mockCustomers.filter(c => c.status === 'active').length,
  prospects: mockCustomers.filter(c => c.status === 'prospect').length,
  leads: mockCustomers.filter(c => c.status === 'lead').length,
  totalValue: mockCustomers.reduce((sum, c) => sum + c.totalValue, 0),
  averageValue: mockCustomers.reduce((sum, c) => sum + c.totalValue, 0) / mockCustomers.length
};

export const getCustomersByStatus = (status: string) => {
  if (status === 'all') return mockCustomers;
  return mockCustomers.filter(customer => customer.status === status);
};

export const searchCustomers = (query: string) => {
  if (!query.trim()) return mockCustomers;
  
  const searchTerm = query.toLowerCase();
  return mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm) ||
    customer.company?.toLowerCase().includes(searchTerm) ||
    customer.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getCustomerById = (id: string) => {
  return mockCustomers.find(customer => customer.id === id);
};
