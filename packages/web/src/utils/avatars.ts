/**
 * Utility functions for generating consistent avatar URLs
 */

/**
 * Generate a consistent color based on a name
 * @param name - The name to generate color for
 * @returns The color hex code and Tailwind classes
 */
const getNameColor = (name: string) => {
  const colors = [
    { hex: '3b82f6', border: 'border-blue-500', text: 'text-blue-500' },
    { hex: '10b981', border: 'border-emerald-500', text: 'text-emerald-500' },
    { hex: 'f59e0b', border: 'border-amber-500', text: 'text-amber-500' },
    { hex: 'ef4444', border: 'border-red-500', text: 'text-red-500' },
    { hex: '8b5cf6', border: 'border-violet-500', text: 'text-violet-500' },
    { hex: 'f97316', border: 'border-orange-500', text: 'text-orange-500' },
    { hex: '06b6d4', border: 'border-cyan-500', text: 'text-cyan-500' },
    { hex: 'ec4899', border: 'border-pink-500', text: 'text-pink-500' }
  ];
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[colorIndex];
};

/**
 * Generate a Dicebear avatar URL based on a name with white background and colored text
 * @param name - The name to generate the avatar for
 * @returns The avatar URL
 */
export const generateAvatar = (name: string): string => {
  const encodedName = encodeURIComponent(name);
  const color = getNameColor(name);
  
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}&backgroundColor=ffffff&textColor=${color.hex}`;
};

/**
 * Get the border class for an avatar based on the name
 * @param name - The name to generate border class for
 * @returns The Tailwind border class
 */
export const getAvatarBorderClass = (name: string): string => {
  const color = getNameColor(name);
  return `border-2 ${color.border}`;
};
