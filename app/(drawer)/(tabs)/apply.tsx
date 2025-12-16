import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { theme } from '../../../constants/theme';

export default function ApplyScreen() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Apply for Verification</Text>
          <Text style={styles.subtitle}>Step {step} of 4</Text>
        </View>

        <Card>
          {step === 1 && (
            <View>
              <Text style={styles.stepTitle}>Business Information</Text>
              <Input
                label="Business Name"
                placeholder="Enter your business name"
                value={businessName}
                onChangeText={setBusinessName}
              />
              <Input
                label="Business Phone"
                placeholder="Enter your business phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.stepTitle}>Address Verification</Text>
              <Input
                label="Physical Address"
                placeholder="Enter your business address"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
              />
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.stepTitle}>Document Upload</Text>
              <Text style={styles.stepDesc}>
                Please upload your business permit and owner ID for verification.
              </Text>
              <Button
                title="Upload Documents"
                onPress={() => {}}
                variant="outline"
                size="md"
                fullWidth
              />
            </View>
          )}

          {step === 4 && (
            <View>
              <Text style={styles.stepTitle}>Verification Method</Text>
              <Text style={styles.stepDesc}>
                Choose how you'd like to complete the verification process.
              </Text>
              <Button
                title="Schedule Field Visit"
                onPress={() => {}}
                variant="primary"
                size="md"
                fullWidth
              />
              <Button
                title="Schedule Video Call"
                onPress={() => {}}
                variant="secondary"
                size="md"
                fullWidth
              />
            </View>
          )}

          <View style={styles.navigation}>
            <Button
              title="Back"
              onPress={() => setStep(Math.max(1, step - 1))}
              variant="outline"
              size="md"
              disabled={step === 1}
            />
            <Button
              title={step === 4 ? 'Submit' : 'Next'}
              onPress={() => setStep(Math.min(4, step + 1))}
              variant="primary"
              size="md"
            />
          </View>
        </Card>
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
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.md,
  },
  stepDesc: {
    fontSize: 13,
    color: theme.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  navigation: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
});
