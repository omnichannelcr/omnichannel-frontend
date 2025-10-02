export interface HomeIntegration {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const homeIntegrations: HomeIntegration[] = [
  { 
    id: 'whatsapp',
    name: 'WhatsApp', 
    icon: '/icons/whatsapp.svg', 
    color: 'bg-green-500' 
  },
  { 
    id: 'instagram',
    name: 'Instagram', 
    icon: '/icons/instagram.svg', 
    color: 'bg-gradient-to-br from-purple-500 to-pink-500' 
  },
  { 
    id: 'facebook',
    name: 'Facebook', 
    icon: '/icons/facebook.svg', 
    color: 'bg-blue-600' 
  },
  { 
    id: 'telegram',
    name: 'Telegram', 
    icon: '/icons/telegram.svg', 
    color: 'bg-blue-500' 
  }
];
