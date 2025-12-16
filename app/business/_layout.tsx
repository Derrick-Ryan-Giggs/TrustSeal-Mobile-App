import { Stack } from 'expo-router';

export default function BusinessLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Business Profile' }} />
    </Stack>
  );
}
