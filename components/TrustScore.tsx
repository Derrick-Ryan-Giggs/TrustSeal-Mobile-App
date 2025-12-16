import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface TrustScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export const TrustScore: React.FC<TrustScoreProps> = ({ score, size = 'md' }) => {
  const getColor = () => {
    if (score >= 75) return theme.trustHigh;
    if (score >= 50) return theme.trustMedium;
    return theme.trustLow;
  };

  const getLabel = () => {
    if (score >= 75) return 'High Trust';
    if (score >= 50) return 'Moderate Trust';
    return 'Low Trust';
  };

  const getSizes = () => {
    const sizes = {
      sm: { circle: 60, text: 20, label: 10 },
      md: { circle: 100, text: 32, label: 12 },
      lg: { circle: 140, text: 48, label: 14 },
    };
    return sizes[size];
  };

  const sizes = getSizes();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          {
            width: sizes.circle,
            height: sizes.circle,
            borderRadius: sizes.circle / 2,
            backgroundColor: getColor(),
          },
        ]}
      >
        <Text style={[styles.scoreText, { fontSize: sizes.text }]}>{score}</Text>
      </View>
      <Text style={[styles.label, { fontSize: sizes.label }]}>{getLabel()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  scoreText: {
    color: theme.white,
    fontWeight: '800',
  },
  label: {
    color: theme.textSecondary,
    fontWeight: '600',
  },
});
