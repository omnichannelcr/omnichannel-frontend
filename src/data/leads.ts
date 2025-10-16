import { Chat, ChatLead, ChatMessage } from '@/types/leads';
import { generateAvatar } from '@/utils/avatars';

// Mock messages for different chats
const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hi! I\'m interested in your services. Can you tell me more about pricing?',
    timestamp: new Date('2024-12-01T10:30:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: true,
  },
  {
    id: '2',
    content: 'Of course! I\'d be happy to help you with pricing information. What specific services are you interested in?',
    timestamp: new Date('2024-12-01T10:32:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
  {
    id: '3',
    content: 'I\'m looking at your premium package. Do you offer any discounts for annual subscriptions?',
    timestamp: new Date('2024-12-01T14:15:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: true,
  },
  {
    id: '4',
    content: 'Yes, we offer 20% off for annual subscriptions! Let me send you the details.',
    timestamp: new Date('2024-12-01T14:17:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
];

const urgentMessages: ChatMessage[] = [
  {
    id: '5',
    content: 'URGENT: I need help with my account immediately!',
    timestamp: new Date('2024-12-01T16:45:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: false,
  },
  {
    id: '6',
    content: 'I understand this is urgent. What seems to be the problem?',
    timestamp: new Date('2024-12-01T16:46:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
];

// Instagram-specific messages (often shorter, more visual)
const instagramMessages: ChatMessage[] = [
  {
    id: '13',
    content: 'Hey! Love your products! 💕 When is the next sale?',
    timestamp: new Date('2024-12-01T17:20:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: false,
  },
  {
    id: '14',
    content: 'Thank you! 😊 We have a Black Friday sale starting next week!',
    timestamp: new Date('2024-12-01T17:22:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
];

// Facebook Messenger messages (often longer, more business-focused)
const facebookMessages: ChatMessage[] = [
  {
    id: '15',
    content: 'Hi, I saw your Facebook ad about the marketing automation tools. I run a small business and would like to know more about how this could help us scale our operations.',
    timestamp: new Date('2024-12-01T11:15:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: true,
  },
  {
    id: '16',
    content: 'Hello! I\'d be happy to help you understand how our automation tools can benefit your business. What type of business do you run and what\'s your current customer base size?',
    timestamp: new Date('2024-12-01T11:17:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
];

// Telegram messages (often technical, developer-focused)
const telegramMessages: ChatMessage[] = [
  {
    id: '17',
    content: 'Hello! I\'m interested in your API integration. Do you have webhook support?',
    timestamp: new Date('2024-12-01T15:45:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: false,
  },
  {
    id: '18',
    content: 'Yes! We have comprehensive webhook support. I can send you our API documentation.',
    timestamp: new Date('2024-12-01T15:47:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
];

// Website contact form messages
const websiteMessages: ChatMessage[] = [
  {
    id: '19',
    content: 'Hi, I filled out your contact form yesterday. I\'m looking for a solution for my e-commerce store. Can you help me understand your pricing?',
    timestamp: new Date('2024-12-01T10:20:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: true,
  },
  {
    id: '20',
    content: 'Absolutely! Thank you for reaching out. I\'d love to help you find the right solution for your e-commerce store. What\'s your monthly order volume?',
    timestamp: new Date('2024-12-01T10:22:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
];

const followUpMessages: ChatMessage[] = [
  {
    id: '7',
    content: 'Thanks for the demo yesterday. I\'m still thinking about it.',
    timestamp: new Date('2024-12-01T09:20:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: true,
  },
  {
    id: '8',
    content: 'No problem! Take your time. I\'m here if you have any questions.',
    timestamp: new Date('2024-12-01T09:22:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
];

const closedMessages: ChatMessage[] = [
  {
    id: '9',
    content: 'Perfect! I\'ll take the premium package. When can we start?',
    timestamp: new Date('2024-11-30T15:30:00'),
    sender: 'lead',
    messageType: 'text',
    isRead: true,
  },
  {
    id: '10',
    content: 'Excellent choice! We can start next Monday. I\'ll send you the contract.',
    timestamp: new Date('2024-11-30T15:32:00'),
    sender: 'user',
    messageType: 'text',
    isRead: true,
  },
];

// Mock leads data from different integrations
export const mockLeads: ChatLead[] = [
  // WhatsApp Business leads
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: generateAvatar('Sarah Johnson'),
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    status: 'active',
    unreadCount: 0,
    lastActivity: new Date('2024-12-01T14:17:00'),
    source: 'whatsapp',
    tags: ['premium', 'enterprise'],
    lastMessage: sampleMessages[3],
  },
  {
    id: '6',
    name: 'Ahmed Hassan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 789-0123',
    email: 'ahmed.hassan@email.com',
    status: 'pending',
    unreadCount: 0,
    lastActivity: new Date('2024-12-01T08:45:00'),
    source: 'whatsapp',
    tags: ['technical', 'integration'],
  },
  
  // Instagram leads
  {
    id: '2',
    name: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 987-6543',
    email: 'mike.rodriguez@email.com',
    status: 'pending',
    unreadCount: 2,
    lastActivity: new Date('2024-12-01T16:46:00'),
    source: 'instagram',
    tags: ['urgent', 'support'],
    lastMessage: urgentMessages[1],
  },
  {
    id: '7',
    name: 'Maria Garcia',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 246-8135',
    email: 'maria.garcia@email.com',
    status: 'follow_up',
    unreadCount: 3,
    lastActivity: new Date('2024-12-01T17:20:00'),
    source: 'instagram',
    tags: ['enterprise', 'custom'],
  },
  {
    id: '9',
    name: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 111-2222',
    email: 'sophie.martin@email.com',
    status: 'active',
    unreadCount: 1,
    lastActivity: new Date('2024-12-01T13:30:00'),
    source: 'instagram',
    tags: ['influencer', 'partnership'],
  },
  
  // Facebook Messenger leads
  {
    id: '3',
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 456-7890',
    email: 'emily.chen@email.com',
    status: 'follow_up',
    unreadCount: 0,
    lastActivity: new Date('2024-12-01T09:22:00'),
    source: 'facebook',
    tags: ['demo', 'considering'],
    lastMessage: followUpMessages[1],
  },
  {
    id: '8',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 135-7924',
    email: 'john.smith@email.com',
    status: 'closed',
    unreadCount: 0,
    lastActivity: new Date('2024-11-29T11:30:00'),
    source: 'facebook',
    tags: ['completed', 'satisfied'],
  },
  {
    id: '10',
    name: 'Robert Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 333-4444',
    email: 'robert.kim@email.com',
    status: 'active',
    unreadCount: 0,
    lastActivity: new Date('2024-12-01T11:15:00'),
    source: 'facebook',
    tags: ['small-business', 'local'],
  },
  
  // Telegram leads
  {
    id: '4',
    name: 'David Wilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 321-0987',
    email: 'david.wilson@email.com',
    status: 'closed',
    unreadCount: 0,
    lastActivity: new Date('2024-11-30T15:32:00'),
    source: 'telegram',
    tags: ['signed', 'premium'],
    lastMessage: closedMessages[1],
  },
  {
    id: '11',
    name: 'Anna Petrov',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 555-6666',
    email: 'anna.petrov@email.com',
    status: 'pending',
    unreadCount: 2,
    lastActivity: new Date('2024-12-01T15:45:00'),
    source: 'telegram',
    tags: ['international', 'developer'],
  },
  
  // Website leads
  {
    id: '5',
    name: 'Lisa Thompson',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 654-3210',
    email: 'lisa.thompson@email.com',
    status: 'active',
    unreadCount: 1,
    lastActivity: new Date('2024-12-01T12:15:00'),
    source: 'website',
    tags: ['new', 'basic'],
  },
  {
    id: '12',
    name: 'Carlos Mendez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    phone: '+1 (555) 777-8888',
    email: 'carlos.mendez@email.com',
    status: 'follow_up',
    unreadCount: 0,
    lastActivity: new Date('2024-12-01T10:20:00'),
    source: 'website',
    tags: ['contact-form', 'pricing-inquiry'],
  },
];

// Mock chats with full message history from different integrations
export const mockChats: Chat[] = [
  // WhatsApp Business chats
  {
    id: '1',
    lead: mockLeads[0], // Sarah Johnson
    messages: sampleMessages,
    createdAt: new Date('2024-12-01T10:30:00'),
    updatedAt: new Date('2024-12-01T14:17:00'),
  },
  {
    id: '6',
    lead: mockLeads[1], // Ahmed Hassan
    messages: urgentMessages,
    createdAt: new Date('2024-12-01T16:45:00'),
    updatedAt: new Date('2024-12-01T16:46:00'),
  },
  
  // Instagram chats
  {
    id: '2',
    lead: mockLeads[2], // Mike Rodriguez
    messages: urgentMessages,
    createdAt: new Date('2024-12-01T16:45:00'),
    updatedAt: new Date('2024-12-01T16:46:00'),
  },
  {
    id: '7',
    lead: mockLeads[3], // Maria Garcia
    messages: instagramMessages,
    createdAt: new Date('2024-12-01T17:20:00'),
    updatedAt: new Date('2024-12-01T17:22:00'),
  },
  {
    id: '9',
    lead: mockLeads[4], // Sophie Martin
    messages: instagramMessages,
    createdAt: new Date('2024-12-01T17:20:00'),
    updatedAt: new Date('2024-12-01T17:22:00'),
  },
  
  // Facebook Messenger chats
  {
    id: '3',
    lead: mockLeads[5], // Emily Chen
    messages: followUpMessages,
    createdAt: new Date('2024-12-01T09:20:00'),
    updatedAt: new Date('2024-12-01T09:22:00'),
  },
  {
    id: '8',
    lead: mockLeads[6], // John Smith
    messages: closedMessages,
    createdAt: new Date('2024-11-30T15:30:00'),
    updatedAt: new Date('2024-11-30T15:32:00'),
  },
  {
    id: '10',
    lead: mockLeads[7], // Robert Kim
    messages: facebookMessages,
    createdAt: new Date('2024-12-01T11:15:00'),
    updatedAt: new Date('2024-12-01T11:17:00'),
  },
  
  // Telegram chats
  {
    id: '4',
    lead: mockLeads[8], // David Wilson
    messages: closedMessages,
    createdAt: new Date('2024-11-30T15:30:00'),
    updatedAt: new Date('2024-11-30T15:32:00'),
  },
  {
    id: '11',
    lead: mockLeads[9], // Anna Petrov
    messages: telegramMessages,
    createdAt: new Date('2024-12-01T15:45:00'),
    updatedAt: new Date('2024-12-01T15:47:00'),
  },
  
  // Website chats
  {
    id: '5',
    lead: mockLeads[10], // Lisa Thompson
    messages: websiteMessages,
    createdAt: new Date('2024-12-01T10:20:00'),
    updatedAt: new Date('2024-12-01T10:22:00'),
  },
  {
    id: '12',
    lead: mockLeads[11], // Carlos Mendez
    messages: websiteMessages,
    createdAt: new Date('2024-12-01T10:20:00'),
    updatedAt: new Date('2024-12-01T10:22:00'),
  },
];

// Helper functions
export const getChatById = (id: string): Chat | undefined => {
  return mockChats.find(chat => chat.id === id);
};

export const getLeadsByStatus = (status: ChatLead['status']): ChatLead[] => {
  return mockLeads.filter(lead => lead.status === status);
};

export const getUnreadCount = (): number => {
  return mockLeads.reduce((total, lead) => total + lead.unreadCount, 0);
};
