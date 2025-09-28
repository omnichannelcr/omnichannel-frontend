import React from 'react';
import { 
  MdDashboard,
  MdPeople,
  MdVerified,
  MdDescription,
  MdCardGiftcard,
  MdFolder,
  MdAccountBalanceWallet,
  MdBarChart,
  MdNotifications,
  MdSettings,
  MdLogout,
  MdMenu,
  MdKeyboardArrowUp,
  MdMoreVert,
  MdTag,
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdSearch,
  MdMessage,
  MdPhone,
  MdVideocam,
  MdAttachFile,
  MdEmojiEmotions,
  MdSend
} from 'react-icons/md';
import { 
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTelegram
} from 'react-icons/fa';
import { 
  HiGlobe
} from 'react-icons/hi';

interface IconProps {
  className?: string;
  size?: number;
}

export const GridIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdDashboard size={size || 20} />
);

export const UsersIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdPeople size={size || 20} />
);

export const BadgeIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdVerified size={size || 20} />
);

export const FileTextIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdDescription size={size || 20} />
);

export const GiftIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdCardGiftcard size={size || 20} />
);

export const FolderIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdFolder size={size || 20} />
);

export const WalletIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdAccountBalanceWallet size={size || 20} />
);

export const BarChartIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdBarChart size={size || 20} />
);

export const BellIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdNotifications size={size || 20} />
);

export const SettingsIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdSettings size={size || 20} />
);

export const LogOutIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdLogout size={size || 20} />
);

export const MenuIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdMenu size={size || 20} />
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <MdKeyboardArrowUp size={size || 16} />
);

export const MoreVerticalIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <MdMoreVert size={size || 16} />
);

export const HashIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdTag size={size || 20} />
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdChevronLeft size={size || 20} />
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdChevronRight size={size || 20} />
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdKeyboardArrowDown size={size || 20} />
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdSearch size={size || 20} />
);

export const MessageCircleIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdMessage size={size || 20} />
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdPhone size={size || 20} />
);

export const VideoIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdVideocam size={size || 20} />
);

export const PaperclipIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdAttachFile size={size || 20} />
);

export const SmileIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdEmojiEmotions size={size || 20} />
);

export const SendIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <MdSend size={size || 20} />
);

export const WhatsappIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <FaWhatsapp size={size || 20} />
);

export const InstagramIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <FaInstagram size={size || 20} />
);

export const FacebookIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <FaFacebook size={size || 20} />
);

export const TelegramIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <FaTelegram size={size || 20} />
);

export const GlobeIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <HiGlobe size={size || 20} />
);

// Icon mapping function
export const getIcon = (iconName: string, className?: string, size?: number) => {
  const icons: Record<string, React.FC<IconProps>> = {
    grid: GridIcon,
    users: UsersIcon,
    badge: BadgeIcon,
    'file-text': FileTextIcon,
    gift: GiftIcon,
    folder: FolderIcon,
    wallet: WalletIcon,
    'bar-chart': BarChartIcon,
    bell: BellIcon,
    settings: SettingsIcon,
    'log-out': LogOutIcon,
    menu: MenuIcon,
    'chevron-up': ChevronUpIcon,
    'chevron-down': ChevronDownIcon,
    'more-vertical': MoreVerticalIcon,
    hash: HashIcon,
    'chevron-left': ChevronLeftIcon,
    'chevron-right': ChevronRightIcon,
    search: SearchIcon,
    'message-circle': MessageCircleIcon,
    phone: PhoneIcon,
    video: VideoIcon,
    paperclip: PaperclipIcon,
    smile: SmileIcon,
    send: SendIcon,
    whatsapp: WhatsappIcon,
    instagram: InstagramIcon,
    facebook: FacebookIcon,
    telegram: TelegramIcon,
    globe: GlobeIcon,
  };

  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent className={className} size={size} /> : null;
};

