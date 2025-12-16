import { Stack } from 'expo-router';

export default function ReportLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Verification Report' }} />
    </Stack>
  );
}
