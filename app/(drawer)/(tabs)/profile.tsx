import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../../store/authStore';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { theme } from '../../../constants/theme';


export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/splash');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          {user?.avatar && (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          )}
          <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔒</Text>
              <Text style={styles.settingText}>Change Password</Text>
            </TouchableOpacity>
          </Card>

          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={styles.settingText}>Notifications</Text>
            </TouchableOpacity>
          </Card>

          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>⚙️</Text>
              <Text style={styles.settingText}>Settings</Text>
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Card>
            <View style={styles.aboutItem}>
              <Text style={styles.aboutLabel}>App Version</Text>
              <Text style={styles.aboutValue}>1.0.0</Text>
            </View>
            <View style={[styles.aboutItem, styles.aboutItemLast]}>
              <Text style={styles.aboutLabel}>Terms of Service</Text>
              <Text style={styles.aboutValue}>View</Text>
            </View>
          </Card>
        </View>

        <View style={styles.dangerZone}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            size="lg"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  email: {
    fontSize: 13,
    color: theme.textSecondary,
    marginBottom: theme.spacing.md,
  },
  badge: {
    backgroundColor: theme.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
  },
  badgeText: {
    color: theme.white,
    fontWeight: '600',
    fontSize: 12,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.md,
  },
  settingCard: {
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  aboutItemLast: {
    borderBottomWidth: 0,
  },
  aboutLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.text,
  },
  aboutValue: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  dangerZone: {
    marginTop: theme.spacing.xl,
  },
});
