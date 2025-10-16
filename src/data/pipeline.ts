import { PipelineStage, PipelineLead, PipelineMetrics } from '@/types/pipeline';
import { generateAvatar } from '@/utils/avatars';

// Mock pipeline leads data
const mockPipelineLeads: PipelineLead[] = [
  // New leads
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: generateAvatar('Sarah Johnson'),
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    source: 'website',
    status: 'new',
    priority: 'high',
    value: 5000,
    assignedTo: {
      id: 'agent1',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    lastActivity: new Date('2024-12-01T14:30:00'),
    createdAt: new Date('2024-12-01T10:00:00'),
    tags: ['enterprise', 'premium'],
    unreadCount: 2,
    leadScore: 85,
    conversationCount: 3,
    lastMessage: {
      content: 'I\'m interested in your enterprise package. Can we schedule a demo?',
      timestamp: new Date('2024-12-01T14:30:00'),
      sender: 'lead'
    }
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    email: 'mike.rodriguez@email.com',
    phone: '+1 (555) 987-6543',
    company: 'StartupXYZ',
    source: 'instagram',
    status: 'new',
    priority: 'normal',
    value: 2000,
    lastActivity: new Date('2024-12-01T16:45:00'),
    createdAt: new Date('2024-12-01T16:45:00'),
    tags: ['startup', 'social-media'],
    unreadCount: 1,
    leadScore: 65,
    conversationCount: 1,
    lastMessage: {
      content: 'Hey! Love your products! When is the next sale?',
      timestamp: new Date('2024-12-01T16:45:00'),
      sender: 'lead'
    }
  },
  {
    id: '3',
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    email: 'emily.chen@email.com',
    phone: '+1 (555) 456-7890',
    company: 'Marketing Pro',
    source: 'facebook',
    status: 'new',
    priority: 'normal',
    value: 3000,
    lastActivity: new Date('2024-12-01T11:15:00'),
    createdAt: new Date('2024-12-01T11:15:00'),
    tags: ['marketing', 'small-business'],
    unreadCount: 0,
    leadScore: 70,
    conversationCount: 2,
    lastMessage: {
      content: 'I saw your Facebook ad. I run a small business and would like to know more.',
      timestamp: new Date('2024-12-01T11:15:00'),
      sender: 'lead'
    }
  },

  // Qualified leads
  {
    id: '4',
    name: 'David Wilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    email: 'david.wilson@email.com',
    phone: '+1 (555) 321-0987',
    company: 'Enterprise Solutions',
    source: 'telegram',
    status: 'qualified',
    priority: 'high',
    value: 15000,
    assignedTo: {
      id: 'agent2',
      name: 'Jane Doe',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    lastActivity: new Date('2024-12-01T15:45:00'),
    createdAt: new Date('2024-11-30T09:00:00'),
    tags: ['enterprise', 'technical', 'api'],
    unreadCount: 0,
    leadScore: 90,
    conversationCount: 8,
    estimatedCloseDate: new Date('2024-12-15T00:00:00'),
    lastMessage: {
      content: 'Yes! We have comprehensive webhook support. I can send you our API documentation.',
      timestamp: new Date('2024-12-01T15:45:00'),
      sender: 'user'
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    email: 'lisa.thompson@email.com',
    phone: '+1 (555) 654-3210',
    company: 'E-commerce Plus',
    source: 'website',
    status: 'qualified',
    priority: 'normal',
    value: 8000,
    assignedTo: {
      id: 'agent1',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    lastActivity: new Date('2024-12-01T12:15:00'),
    createdAt: new Date('2024-11-29T14:00:00'),
    tags: ['e-commerce', 'integration'],
    unreadCount: 1,
    leadScore: 75,
    conversationCount: 5,
    estimatedCloseDate: new Date('2024-12-20T00:00:00'),
    lastMessage: {
      content: 'What\'s your monthly order volume?',
      timestamp: new Date('2024-12-01T12:15:00'),
      sender: 'user'
    }
  },

  // Proposal stage
  {
    id: '6',
    name: 'Robert Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    email: 'robert.kim@email.com',
    phone: '+1 (555) 135-7924',
    company: 'Local Business Co.',
    source: 'facebook',
    status: 'proposal',
    priority: 'high',
    value: 4000,
    assignedTo: {
      id: 'agent2',
      name: 'Jane Doe',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    lastActivity: new Date('2024-12-01T11:17:00'),
    createdAt: new Date('2024-11-28T10:00:00'),
    tags: ['local-business', 'small-business'],
    unreadCount: 0,
    leadScore: 80,
    conversationCount: 6,
    estimatedCloseDate: new Date('2024-12-10T00:00:00'),
    lastMessage: {
      content: 'What type of business do you run and what\'s your current customer base size?',
      timestamp: new Date('2024-12-01T11:17:00'),
      sender: 'user'
    }
  },

  // Negotiation stage
  {
    id: '7',
    name: 'Anna Petrov',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    email: 'anna.petrov@email.com',
    phone: '+1 (555) 555-6666',
    company: 'International Corp',
    source: 'telegram',
    status: 'negotiation',
    priority: 'urgent',
    value: 25000,
    assignedTo: {
      id: 'agent3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    lastActivity: new Date('2024-12-01T15:47:00'),
    createdAt: new Date('2024-11-25T08:00:00'),
    tags: ['international', 'enterprise', 'developer'],
    unreadCount: 0,
    leadScore: 95,
    conversationCount: 12,
    estimatedCloseDate: new Date('2024-12-05T00:00:00'),
    lastMessage: {
      content: 'Yes! We have comprehensive webhook support. I can send you our API documentation.',
      timestamp: new Date('2024-12-01T15:47:00'),
      sender: 'user'
    }
  },

  // Closed Won
  {
    id: '8',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    email: 'john.smith@email.com',
    phone: '+1 (555) 135-7924',
    company: 'Success Corp',
    source: 'facebook',
    status: 'closed_won',
    priority: 'normal',
    value: 12000,
    assignedTo: {
      id: 'agent1',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    lastActivity: new Date('2024-11-30T15:32:00'),
    createdAt: new Date('2024-11-20T09:00:00'),
    tags: ['completed', 'satisfied'],
    unreadCount: 0,
    leadScore: 100,
    conversationCount: 15,
    lastMessage: {
      content: 'Excellent choice! We can start next Monday. I\'ll send you the contract.',
      timestamp: new Date('2024-11-30T15:32:00'),
      sender: 'user'
    }
  },

  // Closed Lost
  {
    id: '9',
    name: 'Carlos Mendez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    email: 'carlos.mendez@email.com',
    phone: '+1 (555) 777-8888',
    company: 'Budget Solutions',
    source: 'website',
    status: 'closed_lost',
    priority: 'low',
    value: 3000,
    assignedTo: {
      id: 'agent2',
      name: 'Jane Doe',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    lastActivity: new Date('2024-11-28T14:00:00'),
    createdAt: new Date('2024-11-15T11:00:00'),
    tags: ['budget-constraints', 'timing'],
    unreadCount: 0,
    leadScore: 40,
    conversationCount: 4,
    lastMessage: {
      content: 'Thanks for the demo yesterday. I\'m still thinking about it.',
      timestamp: new Date('2024-11-28T14:00:00'),
      sender: 'lead'
    }
  }
];

// Pipeline stages configuration
// Function to create pipeline stages with translations
export const createPipelineStages = (t: (key: string) => string): PipelineStage[] => [
  {
    id: 'new',
    name: t('stages.new'),
    description: t('stages.newDescription'),
    color: 'bg-blue-100 border-blue-300',
    order: 1,
    leads: mockPipelineLeads.filter(lead => lead.status === 'new')
  },
  {
    id: 'qualified',
    name: t('stages.qualified'),
    description: t('stages.qualifiedDescription'),
    color: 'bg-yellow-100 border-yellow-300',
    order: 2,
    leads: mockPipelineLeads.filter(lead => lead.status === 'qualified')
  },
  {
    id: 'proposal',
    name: t('stages.proposal'),
    description: t('stages.proposalDescription'),
    color: 'bg-purple-100 border-purple-300',
    order: 3,
    leads: mockPipelineLeads.filter(lead => lead.status === 'proposal')
  },
  {
    id: 'negotiation',
    name: t('stages.negotiation'),
    description: t('stages.negotiationDescription'),
    color: 'bg-orange-100 border-orange-300',
    order: 4,
    leads: mockPipelineLeads.filter(lead => lead.status === 'negotiation')
  },
  {
    id: 'closed_won',
    name: t('stages.closed_won'),
    description: t('stages.closed_wonDescription'),
    color: 'bg-green-100 border-green-300',
    order: 5,
    leads: mockPipelineLeads.filter(lead => lead.status === 'closed_won')
  },
  {
    id: 'closed_lost',
    name: t('stages.closed_lost'),
    description: t('stages.closed_lostDescription'),
    color: 'bg-red-100 border-red-300',
    order: 6,
    leads: mockPipelineLeads.filter(lead => lead.status === 'closed_lost')
  }
];

// Keep the original export for backward compatibility (will be removed later)
export const pipelineStages: PipelineStage[] = [
  {
    id: 'new',
    name: 'New Leads',
    description: 'Recently captured leads',
    color: 'bg-blue-100 border-blue-300',
    order: 1,
    leads: mockPipelineLeads.filter(lead => lead.status === 'new')
  },
  {
    id: 'qualified',
    name: 'Qualified',
    description: 'Leads that have been qualified',
    color: 'bg-yellow-100 border-yellow-300',
    order: 2,
    leads: mockPipelineLeads.filter(lead => lead.status === 'qualified')
  },
  {
    id: 'proposal',
    name: 'Proposal',
    description: 'Proposals sent to leads',
    color: 'bg-purple-100 border-purple-300',
    order: 3,
    leads: mockPipelineLeads.filter(lead => lead.status === 'proposal')
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    description: 'In negotiation phase',
    color: 'bg-orange-100 border-orange-300',
    order: 4,
    leads: mockPipelineLeads.filter(lead => lead.status === 'negotiation')
  },
  {
    id: 'closed_won',
    name: 'Closed Won',
    description: 'Successfully converted',
    color: 'bg-green-100 border-green-300',
    order: 5,
    leads: mockPipelineLeads.filter(lead => lead.status === 'closed_won')
  },
  {
    id: 'closed_lost',
    name: 'Closed Lost',
    description: 'Did not convert',
    color: 'bg-red-100 border-red-300',
    order: 6,
    leads: mockPipelineLeads.filter(lead => lead.status === 'closed_lost')
  }
];

// Pipeline metrics
export const pipelineMetrics: PipelineMetrics = {
  totalLeads: mockPipelineLeads.length,
  conversionRate: 11.1, // 1 closed won out of 9 total
  averageDealValue: 8500,
  averageSalesCycle: 12, // days
  leadsByStage: {
    new: 3,
    qualified: 2,
    proposal: 1,
    negotiation: 1,
    closed_won: 1,
    closed_lost: 1
  },
  leadsBySource: {
    website: 3,
    facebook: 3,
    telegram: 2,
    instagram: 1
  },
  monthlyRevenue: 12000,
  weeklyTrend: [
    { week: 'Week 1', leads: 15, conversions: 2 },
    { week: 'Week 2', leads: 22, conversions: 3 },
    { week: 'Week 3', leads: 18, conversions: 1 },
    { week: 'Week 4', leads: 25, conversions: 4 }
  ]
};

// Helper functions
export const getLeadById = (id: string): PipelineLead | undefined => {
  return mockPipelineLeads.find(lead => lead.id === id);
};

export const getLeadsByStage = (stageId: string): PipelineLead[] => {
  return mockPipelineLeads.filter(lead => lead.status === stageId);
};

export const getTotalPipelineValue = (): number => {
  return mockPipelineLeads
    .filter(lead => !['closed_lost'].includes(lead.status))
    .reduce((total, lead) => total + (lead.value || 0), 0);
};

export const getActiveLeadsCount = (): number => {
  return mockPipelineLeads.filter(lead => !['closed_won', 'closed_lost'].includes(lead.status)).length;
};
