import { Drawer } from "expo-router/drawer";
import { DrawerContent } from '../../components/DrawerContent';
import { theme } from '../../constants/theme';

export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                swipeEnabled: true,
                drawerActiveTintColor: theme.primary,
                drawerInactiveTintColor: theme.textSecondary,
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="home"
                options={{
                    headerShown: true,
                    headerTitle: "Home",
                }}
            />

            <Drawer.Screen
                name="directory"
                options={{
                    headerShown: true,
                    headerTitle: "Directory",
                }}
            />

            <Drawer.Screen
                name="verify"
                options={{
                    headerShown: true,
                    headerTitle: "Verify Business",
                }}
            />

            <Drawer.Screen
                name="reports"
                options={{
                    headerShown: true,
                    headerTitle: "Reports",
                }}
            />

            <Drawer.Screen
                name="system-status"
                options={{
                    headerShown: true,
                    headerTitle: "System Status",
                }}
            />

            <Drawer.Screen
                name="admin"
                options={{
                    headerShown: true,
                    headerTitle: "Admin Dashboard",
                }}
            />

            <Drawer.Screen
                name="agents"
                options={{
                    headerShown: true,
                    headerTitle: "Agents",
                }}
            />

            <Drawer.Screen
                name="verifications"
                options={{
                    headerShown: true,
                    headerTitle: "Verifications",
                }}
            />
        </Drawer>
    );
}
