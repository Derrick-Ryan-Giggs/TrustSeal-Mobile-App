import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Card } from '../../../components/Card';
import { ProgressBar } from '../../../components/ProgressBar';
import { VerificationChecklist } from '../../../components/VerificationChecklist';
import { theme } from '../../../constants/theme';


export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>⏱️</Text>
          <Text style={styles.title}>Verification Progress</Text>
        </View>

        <Card style={styles.progressCard}>
          <ProgressBar progress={75} label="Current Stage: Field Verification" />
          <View style={styles.timeInfo}>
            <Text style={styles.timeLabel}>Estimated time remaining:</Text>
            <Text style={styles.timeValue}>3-5 days</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Stages</Text>
          <Card>
            <VerificationChecklist
              permitVerified={true}
              idVerified={true}
              addressConfirmed={true}
              socialPresenceChecked={true}
              fieldVisitDone={false}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Stage Details</Text>
          <Card>
            <View style={styles.stageDetail}>
              <View style={styles.stageBadge}>
                <Text style={styles.stageBadgeText}>3</Text>
              </View>
              <View style={styles.stageInfo}>
                <Text style={styles.stageName}>Field Verification</Text>
                <Text style={styles.stageDesc}>
                  Our team is conducting an on-site inspection to verify business operations.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          <Card>
            <View style={styles.timeline}>
              {[
                { done: true, label: 'Documents Reviewed', date: 'Jan 15, 2024' },
                { done: true, label: 'Address Confirmed', date: 'Jan 16, 2024' },
                { done: false, label: 'Field Visit In Progress', date: 'Jan 18-20, 2024' },
                { done: false, label: 'Final Report Released', date: 'Jan 21, 2024' },
              ].map((item, idx) => (
                <View key={idx}>
                  <View style={styles.timelineRow}>
                    <View
                      style={[
                        styles.timelineMarker,
                        item.done && styles.timelineMarkerDone,
                      ]}
                    >
                      {item.done && <Text style={styles.checkmark}>✔</Text>}
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineLabel}>{item.label}</Text>
                      <Text style={styles.timelineDate}>{item.date}</Text>
                    </View>
                  </View>
                  {idx < 3 && <View style={styles.timelineLine} />}
                </View>
              ))}
            </View>
          </Card>
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
  },
  progressCard: {
    marginBottom: theme.spacing.xl,
  },
  timeInfo: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  timeLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.secondary,
    marginTop: theme.spacing.sm,
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
  stageDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  stageBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageBadgeText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 18,
  },
  stageInfo: {
    flex: 1,
  },
  stageName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  stageDesc: {
    fontSize: 12,
    color: theme.textSecondary,
    lineHeight: 18,
  },
  timeline: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  timelineMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  timelineMarkerDone: {
    backgroundColor: theme.secondary,
    borderColor: theme.secondary,
  },
  checkmark: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 14,
  },
  timelineContent: {
    flex: 1,
    paddingVertical: theme.spacing.md,
  },
  timelineLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.text,
  },
  timelineDate: {
    fontSize: 11,
    color: theme.textSecondary,
    marginTop: 2,
  },
  timelineLine: {
    width: 2,
    height: 20,
    backgroundColor: theme.border,
    marginLeft: 15,
  },
});
