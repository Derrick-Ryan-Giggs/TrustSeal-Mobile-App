import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { theme } from '../../constants/theme';
import { verificationStages } from '../../mocks/mockData';

export default function VerificationsScreen() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const verifications = [
    {
      id: '1',
      business: 'Juma Electronics',
      status: 'pending',
      stage: 'field_verification',
      progress: 75,
    },
    {
      id: '2',
      business: 'City Market Stalls',
      status: 'approved',
      stage: 'final_approval',
      progress: 100,
    },
    {
      id: '3',
      business: 'Tech Hub Nairobi',
      status: 'pending',
      stage: 'documents_review',
      progress: 25,
    },
  ];

  const filtered = verifications.filter((v) => {
    if (filter === 'all') return true;
    return v.status === (filter as any);
  });

  const getStageLabel = (key: string) => {
    return verificationStages.find((s) => s.key === key)?.name || key;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>All Verifications</Text>
        </View>

        <View style={styles.filters}>
          {['all', 'pending', 'approved'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterBtn,
                filter === f && styles.filterBtnActive,
              ]}
              onPress={() => setFilter(f as any)}
            >
              <Text
                style={[
                  styles.filterBtnText,
                  filter === f && styles.filterBtnTextActive,
                ]}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.list}>
          {filtered.map((verification) => (
            <Card key={verification.id} style={styles.verificationCard}>
              <View style={styles.header_}>
                <View>
                  <Text style={styles.businessName}>{verification.business}</Text>
                  <Text style={styles.stage}>{getStageLabel(verification.stage)}</Text>
                </View>
                <Badge status={verification.status as 'pending' | 'verified' | 'rejected' | 'unverified'} />
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${verification.progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{verification.progress}%</Text>
              </View>

              <TouchableOpacity style={styles.actionBtn}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <Text style={styles.actionBtnText}>Review Details</Text>
                  <MaterialCommunityIcons name="chevron-right" size={16} color={theme.primary} />
                </View>
              </TouchableOpacity>
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
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.text,
  },
  filters: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  filterBtn: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.border,
  },
  filterBtnActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  filterBtnTextActive: {
    color: theme.white,
  },
  list: {
    gap: theme.spacing.md,
  },
  verificationCard: {
    overflow: 'hidden',
  },
  header_: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  businessName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
  },
  stage: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    flex: 1,
    height: 6,
    backgroundColor: theme.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.secondary,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
    minWidth: 32,
  },
  actionBtn: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.primary,
  },
});
