import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { theme } from '../../constants/theme';

import { useAuthStore } from '../../store/authStore';

import { getIpLocation, getNextPublicHolidays } from '../../utils/api';
import { useEffect, useState } from 'react';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [location, setLocation] = useState<string>('Detecting...');
  const [nextHoliday, setNextHoliday] = useState<string>('Checking...');

  useEffect(() => {
    getIpLocation().then(loc => {
      if (loc) setLocation(`${loc.country} (${loc.query})`);
    });
    getNextPublicHolidays('KE').then(holidays => {
      if (holidays && holidays.length > 0) {
        const next = holidays.find((h: any) => new Date(h.date) > new Date());
        if (next) setNextHoliday(`${next.localName} (${next.date})`);
        else setNextHoliday('No upcoming holidays');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Karibu, {user?.name?.split(' ')[0] || 'Admin'}!</Text>
          <Text style={styles.subtitle}>System Online • {location}</Text>
        </View>

        <View style={styles.statsGrid}>
          {[
            { label: 'Next Holiday', value: nextHoliday, icon: 'calendar-clock' },
            { label: 'Active Agents', value: '12', icon: 'account-group' },
            { label: 'Pending Reviews', value: '28', icon: 'chart-bar' },
          ].map((stat, idx) => (
            <Card key={idx} style={styles.statCard}>
              <MaterialCommunityIcons name={stat.icon as any} size={24} color={theme.primary} style={{ marginBottom: theme.spacing.md }} />
              <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Integration</Text>
          <TouchableOpacity onPress={() => router.push('./system-status')}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <MaterialCommunityIcons name="server-network" size={24} color={theme.success} />
                  <View>
                    <Text style={{ fontWeight: '700', color: theme.text }}>System Status</Text>
                    <Text style={{ color: theme.textSecondary, fontSize: 12 }}>All APIs Online</Text>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.textSecondary} />
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Verifications</Text>
          {[1, 2, 3].map((item) => (
            <Card key={item} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemTitle}>Business #{item}</Text>
                  <Text style={styles.itemSubtitle}>Submitted 2 days ago</Text>
                </View>
                <Badge status="pending" />
              </View>
              <TouchableOpacity style={styles.reviewButton}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={styles.reviewButtonText}>Review</Text>
                  <MaterialCommunityIcons name="chevron-right" size={16} color={theme.primary} />
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>



        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Approvals</Text>
          {[1, 2].map((item) => (
            <Card key={item} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemTitle}>Verified Business #{item}</Text>
                  <Text style={styles.itemSubtitle}>Approved 1 day ago</Text>
                </View>
                <Badge verified={true} />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
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
  header: {
    marginBottom: theme.spacing.xl,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.text,
  },
  subtitle: {
    fontSize: 13,
    color: theme.textSecondary,
    marginTop: theme.spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.text,
    marginTop: theme.spacing.md,
  },
  statLabel: {
    fontSize: 11,
    color: theme.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.md,
  },
  itemCard: {
    marginBottom: theme.spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
  },
  itemSubtitle: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  reviewButton: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  reviewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.primary,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.md,
  },
});
