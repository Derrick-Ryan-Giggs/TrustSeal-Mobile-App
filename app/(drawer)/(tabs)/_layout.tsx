import React from 'react';
import { TabBarIcon } from '../../../components/TabBarIcon';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';

export default function TabLayout() {
  const user = useAuthStore((state) => state.user);

  const getScreens = () => {
    if (user?.role === 'business') {
      return [
        { name: 'business', title: 'Dashboard', icon: 'business' },
        { name: 'apply', title: 'Apply', icon: 'note-add' },
        { name: 'progress', title: 'Progress', icon: 'trending-up' },
        { name: 'badge', title: 'Badge', icon: 'card-membership' },
        { name: 'profile', title: 'Profile', icon: 'account-circle' },
      ];
    }

    return [
      { name: 'business', title: 'Dashboard', icon: 'business' },
      { name: 'apply', title: 'Apply', icon: 'note-add' },
      { name: 'progress', title: 'Progress', icon: 'trending-up' },
      { name: 'badge', title: 'Badge', icon: 'card-membership' },
      { name: 'profile', title: 'Profile', icon: 'account-circle' },
    ];
  };

  const screens = getScreens();

  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarStyle: {
          borderTopColor: theme.border,
          backgroundColor: theme.white,
        },
        headerStyle: {
          backgroundColor: theme.white,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
          color: theme.text,
        },
        headerShadowVisible: false,
        headerLeft: ({ tintColor }) => (
          <TouchableOpacity
            onPress={() => {
              const navState = navigation.getState();
              const drawerNav = navState?.routes?.[0]?.state?.routes?.[0];
              (navigation as any).toggleDrawer?.();
            }}
            style={{ paddingLeft: 16 }}
            accessibilityLabel="Open navigation menu"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="menu" size={24} color={tintColor || theme.text} />
          </TouchableOpacity>
        ),
      })}
    >
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color }) => <TabBarIcon name={screen.icon as any} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
