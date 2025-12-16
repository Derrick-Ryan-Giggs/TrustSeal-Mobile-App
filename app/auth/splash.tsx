import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';
import { theme } from '../../constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { restoreToken } = useAuthStore();

  useEffect(() => {
    setTimeout(() => {
      restoreToken();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>✓</Text>
          </View>
        </View>
        <Text style={styles.title}>Authentify</Text>
        <Text style={styles.tagline}>Verify Before You Trust</Text>
        <Text style={styles.description}>
          Restore trust in online business. Verify credentials of shops and support genuine businesses.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Login"
          onPress={() => router.push('/auth/login')}
          variant="primary"
          size="lg"
          fullWidth
        />
        <Button
          title="Sign Up"
          onPress={() => router.push('/auth/signup')}
          variant="outline"
          size="lg"
          fullWidth
        />
        <Button
          title="Continue as Guest"
          onPress={() => {
            useAuthStore.setState({ loading: false });
            router.replace('/(drawer)/home');
          }}
          variant="ghost"
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 80,
    paddingBottom: 60,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: theme.spacing.xxxl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    color: theme.white,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.primary,
    marginBottom: theme.spacing.xl,
  },
  description: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 280,
  },
  actions: {
    gap: theme.spacing.md,
  },
});
