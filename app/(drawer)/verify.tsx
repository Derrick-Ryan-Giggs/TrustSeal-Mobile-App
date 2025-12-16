import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { theme } from '../../constants/theme';
import { geocodeAddress, getClearbitLogoUrl, searchOpenCorporates, getIpLocation } from '../../utils/api';
import * as DocumentPicker from 'expo-document-picker';


export default function VerifyScreen() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingLocation, setCheckingLocation] = useState(false);
  const [locationResult, setLocationResult] = useState<{ lat: number; lon: number; display_name: string } | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ country: string; countryCode: string } | null>(null);
  const [checkingCorp, setCheckingCorp] = useState(false);
  const [companyFound, setCompanyFound] = useState<{ name: string; jurisdiction_code: string } | null>(null);
  const [documents, setDocuments] = useState<{ name: string; size: number | undefined; uri: string }[]>([]);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setDocuments([...documents, { name: asset.name, size: asset.size, uri: asset.uri }]);
      }
    } catch (err) {
      console.log('Document picker error:', err);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  useEffect(() => {
    // Detect user location on mount
    getIpLocation().then(loc => {
      if (loc) setUserLocation(loc);
    });
  }, []);

  useEffect(() => {
    if (website && website.includes('.')) {
      setLogoPreview(getClearbitLogoUrl(website));
    } else {
      setLogoPreview(null);
    }
  }, [website]);

  const handleCheckLocation = async () => {
    if (!address) return;
    setCheckingLocation(true);
    const result = await geocodeAddress(address);
    setLocationResult(result);
    setCheckingLocation(false);
  };

  const handleCheckRegistration = async () => {
    if (!businessName) return;
    setCheckingCorp(true);
    setCompanyFound(null);
    const results = await searchOpenCorporates(businessName);
    if (results && results.length > 0) {
      setCompanyFound({
        name: results[0].company.name,
        jurisdiction_code: results[0].company.jurisdiction_code,
      });
    } else {
      alert('No official registration found with this name.');
    }
    setCheckingCorp(false);
  };

  const handleSubmit = async () => {
    if (!businessName) {
      alert('Please enter a business name');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/report/[id]',
        params: { id: 'search_' + Date.now() },
      });
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="magnify" size={36} color={theme.text} style={{ marginBottom: theme.spacing.md }} />
          <Text style={styles.title}>Verify a Business</Text>
          <Text style={styles.subtitle}>
            Search for any online shop to check its credibility and legitimacy.
          </Text>
        </View>

        <Card style={styles.formCard}>
          <View style={styles.formHeader}>
            {userLocation && (
              <View style={styles.locationBadge}>
                <Text style={styles.locationBadgeText}>Verifying from {userLocation.country} {userLocation.countryCode === 'US' ? '(US)' : '(Global)'}</Text>
              </View>
            )}
            {logoPreview && (
              <Image source={{ uri: logoPreview }} style={styles.logoPreview} />
            )}
          </View>

          <View>
            <Input
              label="Business Name or Handle"
              placeholder="e.g., Smith's Electronics or @smithselectronics"
              value={businessName}
              onChangeText={setBusinessName}
            />
            {businessName.length > 3 && (
              <View style={styles.registrationCheck}>
                <Button
                  title={checkingCorp ? "Checking Registration..." : "Check Official Registration"}
                  onPress={handleCheckRegistration}
                  variant="ghost"
                  size="sm"
                  disabled={checkingCorp}
                />
                {companyFound && (
                  <View style={styles.companyResult}>
                    <Text style={styles.companyResultText}>
                      <MaterialCommunityIcons name="bank" size={14} color="#137333" /> Found: {companyFound.name} ({companyFound.jurisdiction_code.toUpperCase()})
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          <Input
            label="Phone Number (Optional)"
            placeholder="e.g., +1-800-123-4567"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Input
            label="Website (Optional)"
            placeholder="e.g., https://smithselectronics.com"
            value={website}
            onChangeText={setWebsite}
            autoCapitalize="none"
          />

          <View>
            <Input
              label="Physical Address"
              placeholder="e.g., Westlands, Nairobi"
              value={address}
              onChangeText={setAddress}
            />
            {address ? (
              <View style={styles.locationCheckContainer}>
                <Button
                  title={checkingLocation ? "Checking..." : "Check Location"}
                  onPress={handleCheckLocation}
                  size="sm"
                  variant="outline"
                  disabled={checkingLocation}
                />
                {locationResult && (
                  <View style={styles.locationResult}>
                    <Text style={styles.locationText}>
                      <MaterialCommunityIcons name="check-circle" size={14} color={theme.success} /> Found: {locationResult.lat.toFixed(4)}, {locationResult.lon.toFixed(4)}
                    </Text>
                  </View>
                )}
              </View>
            ) : null}
          </View>
          <Input
            label="Why are you verifying? (Optional)"
            placeholder="I want to make a purchase and need to verify..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <View style={{ marginBottom: theme.spacing.xl }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text, marginBottom: theme.spacing.sm }}>
              Supporting Documents (Business Permit, ID, etc.)
            </Text>
            {documents.map((doc, index) => (
              <View key={index} style={styles.documentItem}>
                <MaterialCommunityIcons name={doc.name.endsWith('.pdf') ? 'file-pdf-box' : 'file-image'} size={24} color={theme.primary} />
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.documentName} numberOfLines={1}>{doc.name}</Text>
                  <Text style={styles.documentSize}>{doc.size ? (doc.size / 1024).toFixed(0) + ' KB' : 'Unknown size'}</Text>
                </View>
                <TouchableOpacity onPress={() => removeDocument(index)}>
                  <MaterialCommunityIcons name="close-circle" size={20} color={theme.error} />
                </TouchableOpacity>
              </View>
            ))}
            <Button
              title="Upload Document"
              onPress={handlePickDocument}
              variant="outline"
              size="md"
              icon={<MaterialCommunityIcons name="cloud-upload" size={18} color={theme.primary} />}
            />
          </View>

          <Button
            title="Submit for Verification"
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          />
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Check</Text>
          <View style={styles.checkList}>
            {[
              'Business Permit & Registration',
              'Owner Identity Verification',
              'Physical Address Confirmation',
              'Social Media Presence',
              'Field Visit & Photos',
              'Customer Reviews & Ratings',
            ].map((item, idx) => (
              <View key={idx} style={styles.checkItem}>
                <View style={styles.checkmark}>
                  <MaterialCommunityIcons name="check" size={16} color={theme.white} />
                </View>
                <Text style={styles.checkText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Timeline</Text>
          <Card>
            <View style={styles.timeline}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineNumber}>
                  <Text style={styles.timelineNumberText}>1</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Document Review</Text>
                  <Text style={styles.timelineDesc}>1-2 days</Text>
                </View>
              </View>
              <View style={styles.timelineDivider} />
              <View style={styles.timelineItem}>
                <View style={styles.timelineNumber}>
                  <Text style={styles.timelineNumberText}>2</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Address Verification</Text>
                  <Text style={styles.timelineDesc}>1-2 days</Text>
                </View>
              </View>
              <View style={styles.timelineDivider} />
              <View style={styles.timelineItem}>
                <View style={styles.timelineNumber}>
                  <Text style={styles.timelineNumberText}>3</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Field Verification</Text>
                  <Text style={styles.timelineDesc}>2-5 days</Text>
                </View>
              </View>
              <View style={styles.timelineDivider} />
              <View style={styles.timelineItem}>
                <View style={styles.timelineNumber}>
                  <Text style={styles.timelineNumberText}>4</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Final Report</Text>
                  <Text style={styles.timelineDesc}>Published same day</Text>
                </View>
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
    marginBottom: theme.spacing.xxl,
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
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },

  formCard: {
    marginBottom: theme.spacing.xl,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  locationBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    backgroundColor: theme.surface,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 4,
  },
  locationBadgeText: {
    fontSize: 10,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  logoPreview: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.md,
    backgroundColor: theme.surface,
    marginBottom: theme.spacing.sm,
  },
  registrationCheck: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
    paddingLeft: 4,
    marginTop: -theme.spacing.sm,
  },
  companyResult: {
    marginTop: 4,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    backgroundColor: '#E6F4EA',
    borderRadius: theme.radius.sm,
  },
  companyResultText: {
    fontSize: 11,
    color: '#137333',
    fontWeight: '600',
  },
  locationCheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginTop: -theme.spacing.sm,
  },
  locationResult: {
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    color: theme.success,
    fontWeight: '600',
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
  checkList: {
    gap: theme.spacing.md,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 14,
  },
  checkText: {
    fontSize: 13,
    color: theme.text,
    fontWeight: '500',
  },
  timeline: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  timelineNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  timelineNumberText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 14,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.text,
  },
  timelineDesc: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  timelineDivider: {
    height: 1,
    backgroundColor: theme.border,
    marginLeft: 15,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.background,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.border,
  },
  documentName: {
    fontSize: 13,
    color: theme.text,
    fontWeight: '500',
  },
  documentSize: {
    fontSize: 11,
    color: theme.textSecondary,
  }
});
