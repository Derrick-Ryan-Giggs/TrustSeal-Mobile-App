import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface VerificationChecklistProps {
  permitVerified: boolean;
  idVerified: boolean;
  addressConfirmed: boolean;
  socialPresenceChecked: boolean;
  fieldVisitDone: boolean;
}

export const VerificationChecklist: React.FC<VerificationChecklistProps> = ({
  permitVerified,
  idVerified,
  addressConfirmed,
  socialPresenceChecked,
  fieldVisitDone,
}) => {
  const items = [
    { label: 'Business Permit Verified', done: permitVerified },
    { label: 'Owner ID Verified', done: idVerified },
    { label: 'Address Confirmed', done: addressConfirmed },
    { label: 'Social Presence Checked', done: socialPresenceChecked },
    { label: 'Field Visit Done', done: fieldVisitDone },
  ];

  return (
    <View style={styles.container}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.item}>
          <View
            style={[
              styles.checkbox,
              item.done && styles.checkboxDone,
            ]}
          >
            {item.done && <Text style={styles.checkText}>✔</Text>}
          </View>
          <Text
            style={[
              styles.label,
              item.done && styles.labelDone,
            ]}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    backgroundColor: theme.secondary,
    borderColor: theme.secondary,
  },
  checkText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    color: theme.textSecondary,
    fontWeight: '500',
  },
  labelDone: {
    color: theme.text,
  },
});
