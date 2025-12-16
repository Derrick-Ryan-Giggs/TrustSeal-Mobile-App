import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { theme } from '../../constants/theme';


export default function ReportsScreen() {
  const reports = [
    {
      id: '1',
      business: "Mwangi's Electronics",
      date: '2 weeks ago',
      status: 'verified',
      score: 92,
    },
    {
      id: '2',
      business: 'Mama Mboga Fresh',
      date: '1 month ago',
      status: 'verified',
      score: 85,
    },
    {
      id: '3',
      business: 'Online Duka',
      date: '2 months ago',
      status: 'pending',
      score: null,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="file-document" size={36} color={theme.text} style={{ marginBottom: theme.spacing.md }} />
          <Text style={styles.title}>My Verification Reports</Text>
          <Text style={styles.subtitle}>
            Track all the businesses you've verified
          </Text>
        </View>

        <View style={styles.reportsList}>
          {reports.map((report) => (
            <Card key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View>
                  <Text style={styles.reportBusiness}>{report.business}</Text>
                  <Text style={styles.reportDate}>{report.date}</Text>
                </View>
                <Badge status={report.status as any} />
              </View>

              {report.score && (
                <View style={styles.reportScore}>
                  <View
                    style={[
                      styles.scoreCircle,
                      {
                        backgroundColor:
                          report.score >= 75
                            ? theme.trustHigh
                            : report.score >= 50
                              ? theme.trustMedium
                              : theme.trustLow,
                      },
                    ]}
                  >
                    <Text style={styles.scoreText}>{report.score}</Text>
                  </View>
                  <View style={styles.scoreInfo}>
                    <Text style={styles.scoreLabel}>Trust Score</Text>
                    <Text style={styles.scoreDesc}>Verified and trustworthy</Text>
                  </View>
                </View>
              )}

              {!report.score && (
                <View style={styles.pendingInfo}>
                  <Text style={styles.pendingTitle}>Verification In Progress</Text>
                  <Text style={styles.pendingDesc}>
                    We're currently reviewing this business. Check back soon for results.
                  </Text>
                </View>
              )}
            </Card>
          ))}
        </View>

        {reports.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📄</Text>
            <Text style={styles.emptyStateTitle}>No reports yet</Text>
            <Text style={styles.emptyStateDesc}>
              Start by verifying a business to see reports here
            </Text>
          </View>
        )}
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
    marginBottom: theme.spacing.xxl,
  },
  headerIcon: {
    fontSize: 36,
    marginBottom: theme.spacing.md,
  },
  emptyIcon: {
    fontSize: 48,
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
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  reportsList: {
    gap: theme.spacing.md,
  },
  reportCard: {
    overflow: 'hidden',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  reportBusiness: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
  },
  reportDate: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  reportScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  scoreCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 18,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.text,
  },
  scoreDesc: {
    fontSize: 11,
    color: theme.textSecondary,
    marginTop: 2,
  },
  pendingInfo: {
    backgroundColor: theme.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.warning,
  },
  pendingTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.text,
  },
  pendingDesc: {
    fontSize: 11,
    color: theme.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  emptyStateDesc: {
    fontSize: 13,
    color: theme.textSecondary,
  },
});
