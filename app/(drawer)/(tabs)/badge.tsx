import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { theme } from '../../../constants/theme';


export default function BadgeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🏅</Text>
          <Text style={styles.title}>Your Verified Badge</Text>
          <Text style={styles.subtitle}>Display your verification on social media</Text>
        </View>

        <Card style={styles.badgeCard}>
          <View style={styles.badgePreview}>
            <View style={styles.badgeContent}>
              <Badge verified={true} />
              <View style={styles.badgeInfo}>
                <Text style={styles.badgeBusinessName}>John&apos;s Boutique</Text>
                <View style={styles.badgeScore}>
                  <View style={styles.scoreCircle}>
                    <Text style={styles.scoreText}>92</Text>
                  </View>
                  <Text style={styles.scoreLabel}>Trust Score</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share Your Badge</Text>
          <View style={styles.shareButtons}>
            <Button
              title="Copy Link"
              onPress={() => {}}
              variant="outline"
              size="md"
            />
            <Button
              title="Share"
              onPress={() => {}}
              variant="primary"
              size="md"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Embed Badge</Text>
          <Card>
            <Text style={styles.codeLabel}>Embed code for your website:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.code} numberOfLines={3}>
                {'<iframe src="https://authentify.com/badge/john-boutique" />'}
              </Text>
            </View>
            <Button
              title="Copy Code"
              onPress={() => {}}
              variant="outline"
              size="sm"
              fullWidth
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badge Guidelines</Text>
          <Card>
            <View style={styles.guideline}>
              <Text style={styles.guidelineNumber}>1</Text>
              <View>
                <Text style={styles.guidelineTitle}>Display Prominently</Text>
                <Text style={styles.guidelineDesc}>Show your badge on your website and social profiles</Text>
              </View>
            </View>
            <View style={styles.guideline}>
              <Text style={styles.guidelineNumber}>2</Text>
              <View>
                <Text style={styles.guidelineTitle}>Link to Profile</Text>
                <Text style={styles.guidelineDesc}>Badge links to your public Authentify profile</Text>
              </View>
            </View>
            <View style={styles.guideline}>
              <Text style={styles.guidelineNumber}>3</Text>
              <View>
                <Text style={styles.guidelineTitle}>Stay Compliant</Text>
                <Text style={styles.guidelineDesc}>Maintain verification standards to keep your badge</Text>
              </View>
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
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  badgeCard: {
    marginBottom: theme.spacing.xl,
  },
  badgePreview: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  badgeContent: {
    gap: theme.spacing.md,
  },
  badgeInfo: {
    alignItems: 'center',
  },
  badgeBusinessName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
  },
  badgeScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 14,
  },
  scoreLabel: {
    fontSize: 11,
    color: theme.textSecondary,
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
  shareButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  codeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.text,
    marginBottom: theme.spacing.md,
  },
  codeBlock: {
    backgroundColor: theme.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: theme.spacing.md,
  },
  code: {
    fontSize: 10,
    color: theme.text,
    fontFamily: 'monospace',
  },
  guideline: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  guidelineNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.primary,
    width: 24,
  },
  guidelineTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.text,
  },
  guidelineDesc: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: theme.spacing.sm,
  },
});
