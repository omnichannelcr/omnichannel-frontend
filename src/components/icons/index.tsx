import React from 'react';
import {
  FaBrain,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaUsers,
  FaChartBar,
  FaWallet,
  FaSearch,
  FaPaperclip,
  FaSmile,
  FaPaperPlane,
  FaPhone,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaEllipsisV,
  FaCheckCircle,
  FaHashtag,
  FaGlobe,
  FaComments,
  FaBars,
  FaTh,
  FaFolder,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

interface IconProps {
  className?: string;
  size?: number;
}

// Icon Components
export const BrainIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaBrain size={size || 20} />
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

export const WhatsappIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaWhatsapp size={size || 20} />
  </div>
);

export const UsersIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaUsers size={size || 20} />
  </div>
);

export const BarChartIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaChartBar size={size || 20} />
  </div>
);

export const WalletIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaWallet size={size || 20} />
  </div>
);

export const MessageCircleIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaComments size={size || 20} />
  </div>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaSearch size={size || 20} />
  </div>
);

export const PaperclipIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaPaperclip size={size || 20} />
  </div>
);

export const SmileIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaSmile size={size || 20} />
  </div>
);

export const SendIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaPaperPlane size={size || 20} />
  </div>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaPhone size={size || 20} />
  </div>
);

export const CloseIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaTimes size={size || 20} />
  </div>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaChevronLeft size={size || 20} />
  </div>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaChevronRight size={size || 20} />
  </div>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaChevronUp size={size || 20} />
  </div>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaChevronDown size={size || 20} />
  </div>
);

export const MenuIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaBars size={size || 20} />
  </div>
);

export const MoreVerticalIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaEllipsisV size={size || 20} />
  </div>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaCheckCircle size={size || 20} />
  </div>
);

export const HashIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaHashtag size={size || 20} />
  </div>
);

export const GlobeIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaGlobe size={size || 20} />
  </div>
);

export const GridIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaTh size={size || 20} />
  </div>
);

export const FolderIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaFolder size={size || 20} />
  </div>
);

export const SettingsIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaCog size={size || 20} />
  </div>
);

export const LogOutIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <div className={className}>
    <FaSignOutAlt size={size || 20} />
  </div>
);

// Main getIcon function
export const getIcon = (iconName: string, className?: string, size?: number) => {
  const icons: Record<string, React.FC<IconProps>> = {
    brain: BrainIcon,
    instagram: InstagramIcon,
    facebook: FacebookIcon,
    telegram: TelegramIcon,
    whatsapp: WhatsappIcon,
    users: UsersIcon,
    'bar-chart': BarChartIcon,
    wallet: WalletIcon,
    'message-circle': MessageCircleIcon,
    search: SearchIcon,
    paperclip: PaperclipIcon,
    smile: SmileIcon,
    send: SendIcon,
    phone: PhoneIcon,
    close: CloseIcon,
    'chevron-left': ChevronLeftIcon,
    'chevron-right': ChevronRightIcon,
    'chevron-up': ChevronUpIcon,
    'chevron-down': ChevronDownIcon,
    menu: MenuIcon,
    'more-vertical': MoreVerticalIcon,
    'check-circle': CheckCircleIcon,
    hash: HashIcon,
    globe: GlobeIcon,
    grid: GridIcon,
    folder: FolderIcon,
    settings: SettingsIcon,
    'log-out': LogOutIcon,
  };

  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent className={className} size={size} /> : null;
};
