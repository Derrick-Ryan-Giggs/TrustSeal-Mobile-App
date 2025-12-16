import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

interface TabBarIconProps {
  name: string;
  color: string;
  size?: number;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, size = 24 }) => {
  const iconMap: Record<string, any> = {
    home: 'home',
    search: 'search',
    list: 'list',
    'file-text': 'description',
    person: 'person',
    award: 'star',
    'trending-up': 'trending-up',
    'check-square': 'check-circle',
    group: 'group',
    'verified-user': 'verified-user',
    'card-membership': 'card-membership',
    'store-directory': 'business',
    profile: 'account-circle',
    progress: 'trending-up',
    assignment: 'assessment',
    dashboard: 'admin-panel-settings',
    admin: 'admin-panel-settings',
    agents: 'supervisor-account',
    'edit-document': 'note-add',
    edit: 'edit',
    business: 'business',
    verifications: 'verified-user',
    verify: 'fact-check',
    reports: 'assessment',
    'admin-panel-settings': 'admin-panel-settings',
    'supervisor-account': 'supervisor-account',
    'note-add': 'note-add',
    'account-circle': 'account-circle',
    'fact-check': 'fact-check',
  };

  return <MaterialIcons name={iconMap[name] || 'home'} size={size} color={color} />;
};
