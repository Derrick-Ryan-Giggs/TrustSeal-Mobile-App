import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { theme } from '../../constants/theme';
import { topVerifiedBusinesses, trendingReviews } from '../../mocks/mockData';


export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated && user?.id !== 'guest') {
      router.replace('/auth/splash');
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {user?.name && user.name !== 'Guest User' ? `Karibu, ${user.name.split(' ')[0]}!` : 'Karibu!'}
            </Text>
            <Text style={styles.subtitle}>Verify businesses with confidence</Text>
          </View>
          {user?.avatar && (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          )}
        </View>

        <View style={styles.quickActions}>
          <Button
            title="Verify a Shop"
            onPress={() => router.push('/verify')}
            variant="primary"
            size="md"
            fullWidth
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Verified Businesses</Text>
            <TouchableOpacity onPress={() => router.push('/directory')}>
              <View>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.primary} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.businessCards}>
            {topVerifiedBusinesses.map((business) => (
              <TouchableOpacity
                key={business.id}
                onPress={() => router.push(`/business/${business.id}`)}
                activeOpacity={0.7}
              >
                <Card style={styles.businessCard}>
                  <View style={styles.businessContent}>
                    <Image
                      source={{ uri: business.logo }}
                      style={styles.businessLogo}
                    />
                    <View style={styles.businessInfo}>
                      <Text style={styles.businessName}>{business.name}</Text>
                      <Text style={styles.businessCategory}>{business.category}</Text>
                      <View style={styles.businessMeta}>
                        <View style={styles.scoreContainer}>
                          <Text style={styles.scoreText}>{business.score}</Text>
                          <Text style={styles.scoreLabel}>Trust</Text>
                        </View>
                        <Text style={styles.reviews}>{business.reviews} reviews</Text>
                      </View>
                    </View>
                    <Badge verified={true} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Reviews</Text>
            <MaterialCommunityIcons name="trending-up" size={20} color={theme.text} />
          </View>

          {trendingReviews.map((review) => (
            <Card key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View>
                  <Text style={styles.reviewBusiness}>{review.business}</Text>
                  <Text style={styles.reviewAuthor}>by {review.author}</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.rating}>★ {review.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewExcerpt} numberOfLines={2}>
                {review.excerpt}
              </Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </Card>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Card style={styles.infoCard}>
            <Text style={styles.infoTitle}>How Authentify Works</Text>
            <View style={styles.infoItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Search or Submit</Text>
                <Text style={styles.stepDesc}>Find any online shop or submit for verification</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Get Verification</Text>
                <Text style={styles.stepDesc}>We verify documents, location, and legitimacy</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Trust Score</Text>
                <Text style={styles.stepDesc}>See detailed credibility reports and reviews</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  arrow: {
    fontSize: 20,
    color: theme.primary,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: theme.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  loadingText: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: theme.spacing.xs,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  quickActions: {
    marginBottom: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
  },
  businessCards: {
    gap: theme.spacing.md,
  },
  businessCard: {
    overflow: 'hidden',
  },
  businessContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  businessLogo: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.md,
    backgroundColor: theme.surface,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
  },
  businessCategory: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  businessMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.secondary,
  },
  scoreLabel: {
    fontSize: 10,
    color: theme.textSecondary,
  },
  reviews: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  reviewCard: {
    marginBottom: theme.spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  reviewBusiness: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.text,
  },
  reviewAuthor: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  ratingBadge: {
    backgroundColor: theme.warning,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.white,
  },
  reviewExcerpt: {
    fontSize: 12,
    color: theme.text,
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  reviewDate: {
    fontSize: 11,
    color: theme.textTertiary,
  },
  infoSection: {
    marginBottom: theme.spacing.xl,
  },
  infoCard: {
    overflow: 'hidden',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.white,
  },
  trendingIcon: {
    fontSize: 18,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.text,
  },
  stepDesc: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
});
