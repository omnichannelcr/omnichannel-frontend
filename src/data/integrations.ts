import { Integration } from "@/types/integrations";

export const integrations: Integration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    image: '/icons/whatsapp.svg',
    description: 'Connect your WhatsApp Business account',
    status: 'disconnected',
    color: 'bg-green-500',
    href: '/integrations/whatsapp'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    image: '/icons/instagram.svg',
    description: 'Manage Instagram direct messages',
    status: 'disconnected',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    href: '/integrations/instagram'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    image: '/icons/facebook.svg',
    description: 'Connect Facebook Messenger',
    status: 'disconnected',
    color: 'bg-blue-600',
    href: '/integrations/facebook'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    image: '/icons/telegram.svg',
    description: 'Integrate Telegram bot',
    status: 'disconnected',
    color: 'bg-blue-500',
    href: '/integrations/telegram'
  }
];