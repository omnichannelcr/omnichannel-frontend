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
  FaTelegram,
  FaBrain
} from 'react-icons/fa';
import { 
  HiGlobe
} from 'react-icons/hi';

interface IconProps {
  className?: string;
  size?: number;
}


export const GridIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdDashboard size={size || 20} />
  </div>
);

export const UsersIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdPeople size={size || 20} />
  </div>
);

export const BadgeIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdVerified size={size || 20} />
  </div>
);

export const FileTextIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdDescription size={size || 20} />
  </div>
);

export const GiftIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdCardGiftcard size={size || 20} />
  </div>
);

export const FolderIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdFolder size={size || 20} />
  </div>
);

export const WalletIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdAccountBalanceWallet size={size || 20} />
  </div>
);

export const BarChartIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdBarChart size={size || 20} />
  </div>
);

export const BellIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdNotifications size={size || 20} />
  </div>
);

export const SettingsIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdSettings size={size || 20} />
  </div>
);

export const LogOutIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdLogout size={size || 20} />
  </div>
);

export const MenuIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdMenu size={size || 20} />
  </div>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <div className={className}>
    <MdKeyboardArrowUp size={size || 20} />
  </div>
);

export const MoreVerticalIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <div className={className}>
    <MdMoreVert size={size || 20} />
  </div>
);

export const HashIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdTag size={size || 20} />
  </div>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdChevronLeft size={size || 20} />
  </div>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdChevronRight size={size || 20} />
  </div>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdKeyboardArrowDown size={size || 20} />
  </div>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdSearch size={size || 20} />
  </div>
);

export const MessageCircleIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdMessage size={size || 20} />
  </div>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdPhone size={size || 20} />
  </div>
);

export const VideoIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdVideocam size={size || 20} />
  </div>
);

export const PaperclipIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdAttachFile size={size || 20} />
  </div>
);

export const SmileIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdEmojiEmotions size={size || 20} />
  </div>
);

export const SendIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <MdSend size={size || 20} />
  </div>
);

export const WhatsappIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaWhatsapp size={size || 20} />
  </div>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaInstagram size={size || 20} />
  </div>
);

export const FacebookIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaFacebook size={size || 20} />
  </div>
);

export const TelegramIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaTelegram size={size || 20} />
  </div>
);

export const GlobeIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <HiGlobe size={size || 20} />
  </div>
);

export const BrainIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaBrain size={size || 20} />
  </div>
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
    brain: BrainIcon,
  };

  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent className={className} size={size || 20} /> : null;
};