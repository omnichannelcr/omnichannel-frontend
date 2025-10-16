export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  color: string;
  order: number;
  leads: PipelineLead[];
}

export interface PipelineLead {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
  company?: string;
  source: 'whatsapp' | 'instagram' | 'facebook' | 'telegram' | 'website' | 'email' | 'phone';
  status: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  value?: number;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastActivity: Date;
  createdAt: Date;
  tags: string[];
  unreadCount: number;
  estimatedCloseDate?: Date;
  leadScore: number;
  conversationCount: number;
  lastMessage?: {
    content: string;
    timestamp: Date;
    sender: 'user' | 'lead';
  };
}

export interface PipelineMetrics {
  totalLeads: number;
  conversionRate: number;
  averageDealValue: number;
  averageSalesCycle: number;
  leadsByStage: {
    [stageId: string]: number;
  };
  leadsBySource: {
    [source: string]: number;
  };
  monthlyRevenue: number;
  weeklyTrend: {
    week: string;
    leads: number;
    conversions: number;
  }[];
}

export interface PipelineFilters {
  source?: string[];
  priority?: string[];
  assignedTo?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
}
