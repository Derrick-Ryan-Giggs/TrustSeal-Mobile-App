import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { ProgressBar } from '../../../components/ProgressBar';
import { theme } from '../../../constants/theme';
import { shareContent } from '../../../utils/sharing';
import { getQrCodeUrl } from '../../../utils/api';

import { useAuthStore } from '../../../store/authStore';

export default function BusinessDashboardScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const businessId = user?.id || "123";
  const businessName = user?.name || "My Business";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Karibu, {user?.name?.split(' ')[0] || 'Partner'}!</Text>
          <Text style={styles.subtitle}>Business Owner Dashboard</Text>
        </View>

        <Card style={styles.statusCard}>
          <View style={styles.statusContent}>
            <View>
              <Text style={styles.statusLabel}>Verification Status</Text>
              <Text style={styles.statusBadge}>In Review</Text>
            </View>
            <Badge status="pending" />
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <Button
              title="Apply for Verification"
              onPress={() => router.push('/(drawer)/verify')}
              variant="primary"
              size="md"
              fullWidth
              icon={<MaterialCommunityIcons name="shield-check" size={18} color={theme.white} />}
            />
            <Button
              title="View My Badge"
              onPress={() => setShowBadgeModal(true)}
              variant="secondary"
              size="md"
              fullWidth
              icon={<MaterialCommunityIcons name="sticker-check-outline" size={18} color={theme.white} />}
            />
          </View>
        </View>

        {/* Badge Modal */}
        <Modal
          visible={showBadgeModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowBadgeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowBadgeModal(false)}
              >
                <MaterialCommunityIcons name="close" size={24} color={theme.text} />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Your Verified Badge</Text>

              <View style={styles.badgeContainer}>
                <MaterialCommunityIcons name="shield-check" size={64} color={theme.primary} />
                <Text style={styles.badgeText}>Verified Business</Text>
                <Text style={styles.badgeBusiness}>{businessName}</Text>
                <Image
                  source={{ uri: getQrCodeUrl(`https://authentify.app/verify/${businessId}`) }}
                  style={styles.qrCode}
                />
              </View>

              <Button
                title="Share Badge"
                onPress={() => shareContent(`I am a Verified Business on Authentify! Check my credentials: https://authentify.app/verify/${businessId}`)}
                variant="primary"
                size="lg"
                fullWidth
                icon={<MaterialCommunityIcons name="share-variant" size={20} color={theme.white} />}
              />
            </View>
          </View>
        </Modal>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Progress</Text>
          <Card>
            <ProgressBar progress={50} label="Overall Progress" />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Info</Text>
          <Card>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Business Name</Text>
              <Text style={styles.infoValue}>Juma's Electronics</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>Retail</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>+254 712 345 678</Text>
            </View>
            <View style={[styles.infoRow, styles.infoRowLast]}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue} numberOfLines={2}>Kimathi St, Nairobi, Kenya</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card>
            <View style={styles.activity}>
              <MaterialCommunityIcons name="file-document" size={20} color={theme.text} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Documents Submitted</Text>
                <Text style={styles.activityTime}>2 days ago</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView >
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
  statusCard: {
    marginBottom: theme.spacing.xl,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  statusBadge: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
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
  actionsGrid: {
    gap: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.text,
  },
  activityTime: {
    fontSize: 11,
    color: theme.textSecondary,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.text,
    marginBottom: theme.spacing.xl,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.surface,
    borderWidth: 2,
    borderColor: theme.primary,
    width: '100%',
  },
  badgeText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.primary,
    marginTop: theme.spacing.md,
  },
  badgeBusiness: {
    fontSize: 14,
    color: theme.text,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  qrCode: {
    width: 120,
    height: 120,
  }
});
