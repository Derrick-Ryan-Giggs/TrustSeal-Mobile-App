import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Input } from '../../components/Input';
import { theme } from '../../constants/theme';
import { useBusinessStore } from '../../store/businessStore';
import { useReviewStore } from '../../store/reviewStore';
import { getDiceBearAvatar, getClearbitLogoUrl } from '../../utils/api';

export default function DirectoryScreen() {
  const router = useRouter();
  const businesses = useBusinessStore((state) => state.businesses);
  const getAverageRating = useReviewStore((state) => state.getAverageRating);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const verifiedBusinesses = businesses.filter((b) => b.status === 'verified');

  const filteredBusinesses = verifiedBusinesses.filter((b) => {
    const matchesSearch =
      !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(verifiedBusinesses.map((b) => b.category)));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Verified Directory</Text>
          <Text style={styles.subtitle}>
            Browse {verifiedBusinesses.length} verified and trusted businesses
          </Text>
        </View>

        <Input
          placeholder="Search businesses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.categories}>
          <TouchableOpacity
            style={[styles.categoryChip, !selectedCategory && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.categoryChipText,
                !selectedCategory && styles.categoryChipTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>{filteredBusinesses.length} businesses found</Text>
        </View>

        <View style={styles.businessesList}>
          {filteredBusinesses.map((business) => {
            const avgRating = getAverageRating(business.id);
            const logoSource = business.logo
              ? { uri: business.logo }
              : business.website
                ? { uri: getClearbitLogoUrl(business.website) }
                : { uri: getDiceBearAvatar(business.name) };

            return (
              <TouchableOpacity
                key={business.id}
                onPress={() => router.push(`/business/${business.id}`)}
                activeOpacity={0.7}
              >
                <Card style={styles.businessCard}>
                  <View style={styles.businessHeader}>
                    <Image source={logoSource} style={styles.logo} />
                    <View style={styles.businessNameSection}>
                      <View style={styles.nameRow}>
                        <Text style={styles.businessName}>{business.name}</Text>
                        <Badge verified={true} />
                      </View>
                      <Text style={styles.category}>{business.category}</Text>
                    </View>
                  </View>

                  <View style={styles.businessDetails}>
                    <View style={styles.scoreSection}>
                      <View
                        style={[
                          styles.scoreCircle,
                          {
                            backgroundColor:
                              business.credibilityScore >= 75
                                ? theme.trustHigh
                                : business.credibilityScore >= 50
                                  ? theme.trustMedium
                                  : theme.trustLow,
                          },
                        ]}
                      >
                        <Text style={styles.scoreValue}>{business.credibilityScore}</Text>
                      </View>
                      <View style={styles.scoreLabel}>
                        <Text style={styles.scoreTitle}>Trust Score</Text>
                      </View>
                    </View>

                    <View style={styles.ratingSection}>
                      <Text style={styles.ratingLabel}>Rating</Text>
                      <View style={styles.rating}>
                        <MaterialCommunityIcons name="star" size={12} color={theme.white} />
                        <Text style={styles.ratingStars}> {avgRating.toFixed(1)}</Text>
                      </View>
                    </View>

                    <View style={styles.addressSection}>
                      <Text style={styles.addressLabel}>Location</Text>
                      <Text style={styles.address} numberOfLines={2}>
                        {business.address}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.footer}>
                    <View>
                      <MaterialCommunityIcons name="chevron-right" size={20} color={theme.textTertiary} />
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredBusinesses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No businesses found</Text>
            <Text style={styles.emptyStateDesc}>
              Try adjusting your search or filters
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
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 13,
    color: theme.textSecondary,
    lineHeight: 20,
  },
  categories: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginVertical: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.white,
  },
  categoryChipActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  categoryChipTextActive: {
    color: theme.white,
  },
  resultsInfo: {
    marginBottom: theme.spacing.md,
  },
  resultsText: {
    fontSize: 12,
    color: theme.textTertiary,
  },
  businessesList: {
    gap: theme.spacing.md,
  },
  businessCard: {
    overflow: 'hidden',
  },
  businessHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.md,
    backgroundColor: theme.surface,
  },
  businessNameSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  businessName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  businessDetails: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  scoreSection: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  scoreValue: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 16,
  },
  scoreLabel: {
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 10,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  ratingSection: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingLabel: {
    fontSize: 10,
    color: theme.textSecondary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  rating: {
    backgroundColor: theme.warning,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  ratingStars: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.white,
  },
  addressSection: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 10,
    color: theme.textSecondary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  address: {
    fontSize: 11,
    color: theme.text,
    lineHeight: 16,
  },
  footer: {
    alignItems: 'flex-end',
  },
  chevron: {
    fontSize: 20,
    color: theme.textTertiary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  emptyStateDesc: {
    fontSize: 13,
    color: theme.textSecondary,
  },
});
