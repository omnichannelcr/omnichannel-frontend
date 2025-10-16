export interface Integration {
    id: string;
    name: string;
    image?: string;
    description: string;
    status: 'connected' | 'disconnected';
    color: string;
    href: string;
  }