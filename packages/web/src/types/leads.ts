export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'lead';
  messageType: 'text' | 'image' | 'voice' | 'sticker' | 'link';
  isRead: boolean;
  isDelivered?: boolean;
}

export interface ChatLead {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
  status: 'active' | 'pending' | 'closed' | 'follow_up';
  lastMessage?: ChatMessage;
  unreadCount: number;
  lastActivity: Date;
  source: 'whatsapp' | 'instagram' | 'facebook' | 'telegram' | 'website';
  tags?: string[];
}

export interface Chat {
  id: string;
  lead: ChatLead;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
