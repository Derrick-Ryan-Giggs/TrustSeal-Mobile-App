import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { theme } from '../../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'business' | 'admin'>('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password, selectedRole);
      router.replace('/(drawer)/home');
    } catch (err) {
      setError('Invalid credentials. Try customer@test.com');
    } finally {
      setLoading(false);
    }
  };

  const roles: Array<'customer' | 'business' | 'admin'> = ['customer', 'business', 'admin'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your Authentify account</Text>
        </View>

        <View style={styles.roleSelector}>
          <Text style={styles.roleLabel}>Select Role</Text>
          <View style={styles.roles}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.roleButton,
                  selectedRole === role && styles.roleButtonActive,
                ]}
                onPress={() => setSelectedRole(role)}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === role && styles.roleButtonTextActive,
                  ]}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>

        <View style={styles.divider} />

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Demo Accounts:</Text>
          <Text style={styles.infoText}>Customer: customer@test.com / pass</Text>
          <Text style={styles.infoText}>Business: business@test.com / pass</Text>
          <Text style={styles.infoText}>Admin: admin@test.com / pass</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Login"
          onPress={handleLogin}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        />
        <View style={{ marginBottom: theme.spacing.sm }}>
          <Button
            title="Continue as Guest"
            onPress={() => {
              const { guestMode } = useAuthStore.getState();
              guestMode();
              router.replace('/(drawer)/home');
            }}
            variant="outline"
            size="md"
            fullWidth
          />
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xxxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  roleSelector: {
    marginBottom: theme.spacing.xl,
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.text,
    marginBottom: theme.spacing.md,
  },
  roles: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  roleButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  roleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  roleButtonTextActive: {
    color: theme.white,
  },
  form: {
    marginBottom: theme.spacing.xl,
  },
  error: {
    color: theme.error,
    fontSize: 12,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: theme.spacing.xl,
  },
  info: {
    backgroundColor: theme.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.text,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: 11,
    color: theme.textSecondary,
    fontFamily: 'monospace',
    marginBottom: theme.spacing.sm,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  backText: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: theme.spacing.md,
  },
});
