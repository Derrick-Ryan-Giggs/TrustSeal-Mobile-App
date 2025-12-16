import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { theme } from '../constants/theme';

interface DrawerItem {
  id: string;
  label: string;
  icon: string;
  section: string;
  requiresAdmin?: boolean;
}

const DRAWER_ITEMS: DrawerItem[] = [
  { id: 'home', label: 'Home', icon: 'home', section: 'Main' },
  { id: 'directory', label: 'Directory', icon: 'view-list', section: 'Main' },
  { id: 'verify', label: 'Verify Business', icon: 'shield-check', section: 'Main' },
  { id: 'reports', label: 'My Reports', icon: 'file-document', section: 'Main' },

  { id: 'admin', label: 'Admin Dashboard', icon: 'view-dashboard', section: 'Admin', requiresAdmin: true },
  { id: 'agents', label: 'Agents', icon: 'account-group', section: 'Admin', requiresAdmin: true },
  { id: 'verifications', label: 'Verifications', icon: 'file-search', section: 'Admin', requiresAdmin: true },
  { id: 'system-status', label: 'System Status', icon: 'server-network', section: 'Admin', requiresAdmin: true },
];

interface DrawerContentProps {
  navigation: any;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'admin';

  const filteredItems = DRAWER_ITEMS.filter((item) => {
    if (item.requiresAdmin && !isAdmin) return false;
    return true;
  });

  const sections = Array.from(new Set(filteredItems.map((item) => item.section)));

  const handleNavigate = (screenId: string) => {
    const screenMap: Record<string, string> = {
      home: 'home',
      directory: 'directory',
      verify: 'verify',
      reports: 'reports',
      admin: 'admin',
      agents: 'agents',
      verifications: 'verifications',
      'system-status': 'system-status',
    };

    navigation.navigate(screenMap[screenId] || '(tabs)');
    navigation.closeDrawer();
  };

  const logout = () => {
    useAuthStore.setState({ user: null, isAuthenticated: false });
    navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account-circle" size={48} color={theme.primary} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={1}>
            {user?.name || 'User'}
          </Text>
          <Text style={styles.userRole}>
            {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sections.map((section, sectionIndex) => {
          const sectionItems = filteredItems.filter((item) => item.section === section);
          return (
            <View key={`section-${sectionIndex}`} style={styles.section}>
              <Text style={styles.sectionHeader}>{section}</Text>
              {sectionItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleNavigate(item.id)}
                  accessibilityLabel={item.label}
                  accessibilityRole="button"
                  accessibilityHint={`Navigate to ${item.label}`}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={20}
                    color={theme.textSecondary}
                    style={styles.itemIcon}
                  />
                  <Text style={styles.itemLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          accessibilityLabel="Logout"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="logout" size={18} color={theme.text} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.background,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  content: {
    flex: 1,
    paddingVertical: 8,
  },
  section: {
    marginBottom: 4,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.textTertiary,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingVertical: 12,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginHorizontal: 8,
    borderRadius: 6,
  },
  itemIcon: {
    width: 20,
    textAlign: 'center',
  },
  itemLabel: {
    fontSize: 15,
    color: theme.text,
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 10,
  },
  logoutText: {
    fontSize: 15,
    color: theme.text,
    fontWeight: '500',
  },
});
