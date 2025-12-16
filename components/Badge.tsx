import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../constants/theme';

interface BadgeProps {
  verified?: boolean;
  status?: 'verified' | 'pending' | 'rejected' | 'unverified';
}

export const Badge: React.FC<BadgeProps> = ({ verified, status }) => {
  if (!verified && !status) return null;

  const getBadgeStyle = () => {
    if (verified) {
      return { bgColor: '#E6F7F1', color: theme.secondary, label: 'Verified' };
    }
    const statuses: Record<string, any> = {
      verified: { bgColor: '#E6F7F1', color: theme.secondary, label: 'Verified' },
      pending: { bgColor: '#FFF3E0', color: theme.warning, label: 'Pending' },
      rejected: { bgColor: '#FFEBEE', color: theme.error, label: 'Rejected' },
      unverified: { bgColor: '#F5F6FA', color: theme.textSecondary, label: 'Unverified' },
    };
    return statuses[status || 'unverified'] || { bgColor: '#F5F6FA', color: theme.textSecondary, label: 'Unverified' };
  };

  const badge = getBadgeStyle();
  if (!badge) return null;

  return (
    <View style={[styles.badge, { backgroundColor: badge.bgColor }]}>
      {(verified || status === 'verified') && (
        <MaterialCommunityIcons name="check" size={10} color={badge.color} />
      )}
      <Text style={[styles.text, { color: badge.color }]}>{badge.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 10,
    fontWeight: '700',
  },
});
