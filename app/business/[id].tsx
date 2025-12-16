import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { shareContent } from '../../utils/sharing';
import { Card } from '../../components/Card';
import { TrustScore } from '../../components/TrustScore';
import { VerificationChecklist } from '../../components/VerificationChecklist';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Badge } from '../../components/Badge';
import { theme } from '../../constants/theme';
import { useBusinessStore } from '../../store/businessStore';
import { useReviewStore } from '../../store/reviewStore';
import { getDiceBearAvatar, getClearbitLogoUrl, getQrCodeUrl, getLinkPreview } from '../../utils/api';


export default function BusinessProfileScreen() {
  const { id } = useLocalSearchParams();
  const getBusiness = useBusinessStore((state) => state.getBusiness);
  const getVerification = useBusinessStore((state) => state.getVerification);
  const getBusinessReviews = useReviewStore((state) => state.getBusinessReviews);
  const getAverageRating = useReviewStore((state) => state.getAverageRating);
  const submitReview = useReviewStore((state) => state.submitReview);

  const business = getBusiness(id as string);
  const verification = getVerification(id as string);
  const reviews = getBusinessReviews(id as string);
  const avgRating = getAverageRating(id as string);

  const [linkPreview, setLinkPreview] = useState<any>(null);

  useEffect(() => {
    if (business?.website) {
      getLinkPreview(business.website).then(setLinkPreview);
    }
  }, [business?.website]);


  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Report Modal State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportNotes, setReportNotes] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  const reportReasons = ['Fake Business', 'Scam Activity', 'Inaccurate Information', 'Impersonation', 'Other'];

  const handleShareProfile = () => {
    if (business) {
      shareContent(
        `Check out ${business.name} on Authentify! Verified Status: ${business.verifiedBadge ? 'Verified' : 'Unverified'}. https://authentify.app/business/${business.id}`,
        `Share ${business.name}`
      );
    }
  };

  const handleSubmitReport = async () => {
    if (!reportReason) {
      Alert.alert('Required', 'Please select a reason for reporting.');
      return;
    }
    setSubmittingReport(true);
    // Simulate API call
    setTimeout(() => {
      setSubmittingReport(false);
      setShowReportModal(false);
      setReportReason('');
      setReportNotes('');
      Alert.alert('Report Submitted', 'Thank you. Our team will review this business shortly.');
    }, 1500);
  };

  if (!business) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Business not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSubmitReview = async () => {
    if (!reviewComment.trim()) {
      alert('Please write a review');
      return;
    }
    setSubmittingReview(true);
    try {
      await submitReview(business.id, 'user_1', 'Current User', reviewRating, reviewComment);
      setReviewComment('');
      setReviewRating(5);
      setShowReviewForm(false);
      alert('Review submitted successfully!');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.headerCard}>
          <View style={styles.headerContent}>
            <Image
              source={
                business.logo
                  ? { uri: business.logo }
                  : business.website
                    ? { uri: getClearbitLogoUrl(business.website) }
                    : { uri: getDiceBearAvatar(business.name) }
              }
              style={styles.logo}
            />
            <View style={styles.nameSection}>
              <View style={styles.nameRow}>
                <Text style={styles.businessName}>{business.name}</Text>
                <Badge verified={business.verifiedBadge} />
              </View>
              <Text style={styles.category}>{business.category}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.trustSection}>
          <TrustScore score={business.credibilityScore} size="lg" />
        </View>

        {verification && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Verification Details</Text>
            <Card>
              <VerificationChecklist
                permitVerified={verification.permitVerified}
                idVerified={verification.idVerified}
                addressConfirmed={verification.addressConfirmed}
                socialPresenceChecked={verification.socialPresenceChecked}
                fieldVisitDone={verification.fieldVisitDone}
              />
            </Card>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          <Card>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker" size={18} color={theme.primary} style={{ marginTop: 2 }} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{business.address}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="phone" size={18} color={theme.primary} style={{ marginTop: 2 }} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{business.phone}</Text>
              </View>
            </View>
            {business.website && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="web" size={18} color={theme.primary} style={{ marginTop: 2 }} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Website</Text>
                  <Text style={styles.infoValue}>{business.website}</Text>
                  {linkPreview && linkPreview.image && (
                    <TouchableOpacity onPress={() => {/* In a real app, open Linking usually with WebBrowser */ }} style={{ marginTop: 8 }}>
                      <Image source={{ uri: linkPreview.image.url }} style={{ width: '100%', height: 120, borderRadius: 8 }} resizeMode="cover" />
                      <Text style={{ fontSize: 11, color: theme.textSecondary, marginTop: 4 }}>{linkPreview.title}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Card>
            <Text style={styles.description}>
              {business.description || 'No description available'}
            </Text>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>
              Reviews & Ratings ({reviews.length})
            </Text>
            <View style={styles.ratingBadge}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialCommunityIcons name="star" size={14} color={theme.white} />
                <Text style={styles.ratingText}>{avgRating.toFixed(1)}</Text>
              </View>
            </View>
          </View>

          {!showReviewForm && (
            <Button
              title="Write a Review"
              onPress={() => setShowReviewForm(true)}
              variant="outline"
              size="md"
              fullWidth
            />
          )}

          {showReviewForm && (
            <Card style={styles.reviewForm}>
              <Text style={styles.reviewFormTitle}>Share Your Experience</Text>

              <View style={styles.ratingSelector}>
                <Text style={styles.ratingLabel}>Rating:</Text>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setReviewRating(star)}
                    >
                      <Text style={[
                        styles.star,
                        star <= reviewRating && styles.starSelected,
                      ]}>
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Input
                label="Your Review"
                placeholder="Share your experience with this business..."
                value={reviewComment}
                onChangeText={setReviewComment}
                multiline
                numberOfLines={4}
              />

              <View style={styles.reviewActions}>
                <Button
                  title="Cancel"
                  onPress={() => setShowReviewForm(false)}
                  variant="outline"
                  size="md"
                />
                <Button
                  title="Submit"
                  onPress={handleSubmitReview}
                  variant="primary"
                  size="md"
                  loading={submittingReview}
                />
              </View>
            </Card>
          )}

          <View style={styles.reviewsList}>
            {reviews.map((review) => (
              <Card key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader_}>
                  <View>
                    <Text style={styles.reviewAuthor}>{review.userName}</Text>
                    <Text style={styles.reviewDate}>{review.createdAt}</Text>
                  </View>
                  <Text style={styles.reviewRating}>★ {review.rating}</Text>
                </View>
                <Text style={styles.reviewText}>{review.comment}</Text>
              </Card>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.actions}>
            <Button
              title="Share Profile"
              onPress={handleShareProfile}
              variant="outline"
              size="md"
              icon={<MaterialCommunityIcons name="share-variant" size={18} color={theme.primary} />}
            />
            <Button
              title="Report Suspicious Activity"
              onPress={() => setShowReportModal(true)}
              variant="outline"
              size="md"
              icon={<MaterialCommunityIcons name="alert-circle" size={18} color={theme.primary} />}
            />
          </View>
        </View>

        {/* Report Modal */}
        <Modal
          visible={showReportModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowReportModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Report Business</Text>
              <Text style={styles.modalSubtitle}>Why are you reporting this business?</Text>

              <View style={styles.reasonList}>
                {reportReasons.map((reason) => (
                  <TouchableOpacity
                    key={reason}
                    style={[styles.reasonItem, reportReason === reason && styles.reasonItemActive]}
                    onPress={() => setReportReason(reason)}
                  >
                    <Text style={[styles.reasonText, reportReason === reason && styles.reasonTextActive]}>{reason}</Text>
                    {reportReason === reason && <MaterialCommunityIcons name="check" size={16} color={theme.primary} />}
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.notesInput}
                placeholder="Additional details (optional)..."
                value={reportNotes}
                onChangeText={setReportNotes}
                multiline
                numberOfLines={3}
              />

              <View style={styles.modalActions}>
                <Button
                  title="Cancel"
                  onPress={() => setShowReportModal(false)}
                  variant="ghost"
                  size="md"
                />
                <Button
                  title="Submit Report"
                  onPress={handleSubmitReport}
                  variant="primary"
                  size="md"
                  loading={submittingReport}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scan to Verify</Text>
          <Card style={styles.qrCard}>
            <Image
              source={{ uri: getQrCodeUrl(`https://authentify.app/business/${business.id}`) }}
              style={styles.qrCode}
            />
            <Text style={styles.qrText}>Scan to view verified profile</Text>
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  headerCard: {
    marginBottom: theme.spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
  },
  nameSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  trustSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  infoIcon: {
    fontSize: 18,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 13,
    color: theme.text,
    marginTop: theme.spacing.sm,
  },
  description: {
    fontSize: 13,
    color: theme.text,
    lineHeight: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  ratingBadge: {
    backgroundColor: theme.warning,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.white,
  },
  reviewForm: {
    marginBottom: theme.spacing.md,
  },
  reviewFormTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.md,
  },
  ratingSelector: {
    marginBottom: theme.spacing.md,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  stars: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  star: {
    fontSize: 28,
    color: theme.textTertiary,
  },
  starSelected: {
    color: theme.warning,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  reviewsList: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  reviewCard: {
    overflow: 'hidden',
  },
  reviewHeader_: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  reviewAuthor: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.text,
  },
  reviewDate: {
    fontSize: 11,
    color: theme.textSecondary,
    marginTop: 2,
  },
  reviewRating: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.warning,
  },
  reviewText: {
    fontSize: 12,
    color: theme.text,
    lineHeight: 18,
  },
  actions: {
    gap: theme.spacing.md,
  },
  qrCard: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing.md,
  },
  qrText: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  modalSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  reasonList: {
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  reasonItemActive: {
    borderColor: theme.primary,
    backgroundColor: theme.surface,
  },
  reasonText: {
    fontSize: 14,
    color: theme.text,
  },
  reasonTextActive: {
    color: theme.primary,
    fontWeight: '600',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: theme.spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
  },
});
