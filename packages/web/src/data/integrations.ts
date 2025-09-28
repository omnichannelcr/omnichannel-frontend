import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";  
import { Integration } from "@/types/integrations";

export const integrations: Integration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: FaWhatsapp,
    image: '/icons/whatsapp.svg',
    description: 'Connect your WhatsApp Business account',
    status: 'disconnected',
    color: 'bg-green-500',
    href: '/integrations/whatsapp'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: FaInstagram,
    image: '/icons/instagram.svg',
    description: 'Manage Instagram direct messages',
    status: 'disconnected',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    href: '/integrations/instagram'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FaFacebook,
    image: '/icons/facebook.svg',
    description: 'Connect Facebook Messenger',
    status: 'disconnected',
    color: 'bg-blue-600',
    href: '/integrations/facebook'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: FaTelegram,
    image: '/icons/telegram.svg',
    description: 'Integrate Telegram bot',
    status: 'disconnected',
    color: 'bg-blue-500',
    href: '/integrations/telegram'
  }
];
