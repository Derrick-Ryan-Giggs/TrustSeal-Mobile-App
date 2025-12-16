import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { theme } from '../../constants/theme';


export default function AgentsScreen() {
  const agents = [
    {
      id: '1',
      name: 'Agent Otieno',
      email: 'otieno@authentify.com',
      status: 'active',
      verifications: 45,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
    {
      id: '2',
      name: 'Agent Wanjiku',
      email: 'wanjiku@authentify.com',
      status: 'active',
      verifications: 38,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
    {
      id: '3',
      name: 'Agent Kimani',
      email: 'kimani@authentify.com',
      status: 'active',
      verifications: 52,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="account-group" size={36} color={theme.text} style={{ marginBottom: theme.spacing.md }} />
          <Text style={styles.title}>Field Agents</Text>
          <Text style={styles.subtitle}>{agents.length} active agents</Text>
        </View>

        <View style={styles.list}>
          {agents.map((agent) => (
            <Card key={agent.id} style={styles.agentCard}>
              <View style={styles.agentHeader}>
                <Image source={{ uri: agent.avatar }} style={styles.avatar} />
                <View style={styles.agentInfo}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <Text style={styles.agentEmail}>{agent.email}</Text>
                </View>
                <Badge status="verified" />
              </View>

              <View style={styles.agentStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Verifications</Text>
                  <Text style={styles.statValue}>{agent.verifications}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Status</Text>
                  <Text style={[styles.statValue, styles.activeStatus]}>Active</Text>
                </View>
              </View>
            </Card>
          ))}
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
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  headerIcon: {
    fontSize: 36,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  list: {
    gap: theme.spacing.md,
  },
  agentCard: {
    overflow: 'hidden',
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
  },
  agentEmail: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  agentStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
    marginTop: theme.spacing.sm,
  },
  activeStatus: {
    color: theme.secondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: theme.border,
  },
});
