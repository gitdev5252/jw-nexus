import { NavigationItem } from "./types";

export const navigationItems : NavigationItem[] = [
  { id: 'apps', icon: '/images/icons/square.svg', label: 'Apps' },
  { id: 'calendar', icon: '/images/icons/calendar.svg', label: 'Calendar' },
  { id: 'video', icon: '/images/icons/video.svg', label: 'Video Call' },
  { id: 'chat', icon: '/images/icons/chat.svg', label: 'Chat' },
  // { id: 'profile', icon: '/images/icons/profile.svg', label: 'Profile' },
  { id: 'settings', icon: '/images/icons/settings.svg', label: 'Settings' },
];
export const callDetailsOptions : NavigationItem[] = [
  { id: 'participants', icon: '/images/icons/participants.svg', label: 'Participants' },
  { id: 'chat', icon: '/images/icons/chat.svg', label: 'Chat' },
  { id: 'transcript', icon: '/images/icons/language.svg', label: 'Transcript' },
];
