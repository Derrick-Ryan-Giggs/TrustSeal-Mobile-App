import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { theme } from '../../constants/theme';
import {
    getLinkPreview,
    checkSiteSafety,
    checkSanctions,
    getUiAvatar,
    searchWikiData,
    getWorldTime,
    getNextPublicHolidays,
    getDiceBearAvatar,
    getClearbitLogoUrl,
    getIpLocation,
    geocodeAddress
} from '../../utils/api';

interface ApiStatus {
    id: string;
    name: string;
    endpoint: string;
    status: 'online' | 'offline' | 'loading';
    latency?: number;
    usage: string;
}

export default function SystemStatusScreen() {
    const [statuses, setStatuses] = useState<ApiStatus[]>([
        { id: 'nominatim', name: 'OpenStreetMap (Nominatim)', endpoint: 'nominatim.openstreetmap.org', status: 'loading', usage: 'Geocoding & Address Picker' },
        { id: 'ipapi', name: 'IP-API', endpoint: 'ip-api.com', status: 'loading', usage: 'Login Location Detection' },
        { id: 'opencorporates', name: 'OpenCorporates', endpoint: 'api.opencorporates.com', status: 'loading', usage: 'Business Entity Verification' },
        { id: 'microlink', name: 'Microlink', endpoint: 'api.microlink.io', status: 'loading', usage: 'Website Previews' },
        { id: 'dicebear', name: 'DiceBear', endpoint: 'api.dicebear.com', status: 'loading', usage: 'User Avatars' },
        { id: 'clearbit', name: 'Clearbit', endpoint: 'logo.clearbit.com', status: 'loading', usage: 'Business Logos' },
        { id: 'wikimedia', name: 'WikiData', endpoint: 'query.wikidata.org', status: 'loading', usage: 'Business Data Enrichment' },
        { id: 'worldtime', name: 'WorldTimeAPI', endpoint: 'worldtimeapi.org', status: 'loading', usage: 'Audit Timestamps' },
        { id: 'nager', name: 'Nager.Date', endpoint: 'date.nager.at', status: 'loading', usage: 'Public Holiday Workflows' },
        { id: 'hibp', name: 'Have I Been Pwned', endpoint: 'api.pwnedpasswords.com', status: 'loading', usage: 'Password Security Check' },
    ]);
    const [refreshing, setRefreshing] = useState(false);

    const checkHealth = async () => {
        const updateStatus = (id: string, status: 'online' | 'offline', latency: number) => {
            setStatuses(prev => prev.map(s => s.id === id ? { ...s, status, latency } : s));
        };

        const ping = async (id: string, promise: Promise<any>) => {
            const start = Date.now();
            try {
                await promise;
                updateStatus(id, 'online', Date.now() - start);
            } catch {
                updateStatus(id, 'offline', 0);
            }
        };

        await Promise.all([
            ping('nominatim', geocodeAddress('Nairobi')),
            ping('ipapi', getIpLocation()),
            ping('opencorporates', checkSanctions('Tesla')),
            ping('microlink', getLinkPreview('https://google.com')),
            ping('dicebear', fetch('https://api.dicebear.com/9.x/initials/svg?seed=test')),
            ping('clearbit', fetch('https://logo.clearbit.com/google.com')),
            ping('wikimedia', searchWikiData('Tesla')),
            ping('worldtime', getWorldTime()),
            ping('nager', getNextPublicHolidays('KE')),
            ping('hibp', fetch('https://api.pwnedpasswords.com/range/21BD1')),
        ]);
        setRefreshing(false);
    };

    useEffect(() => {
        checkHealth();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        setStatuses(prev => prev.map(s => ({ ...s, status: 'loading', latency: undefined })));
        checkHealth();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>System Status</Text>
                    <Text style={styles.subtitle}>Real-time API Integration Health</Text>
                </View>

                {statuses.map((api) => (
                    <Card key={api.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.row}>
                                <Text style={styles.apiName}>{api.name}</Text>
                                {api.status === 'loading' && <Text style={styles.loading}>Checking...</Text>}
                                {api.status === 'online' && (
                                    <View style={styles.badgeSuccess}>
                                        <MaterialCommunityIcons name="check-circle" size={14} color="white" />
                                        <Text style={styles.badgeText}>ONLINE</Text>
                                    </View>
                                )}
                                {api.status === 'offline' && (
                                    <View style={styles.badgeError}>
                                        <MaterialCommunityIcons name="alert-circle" size={14} color="white" />
                                        <Text style={styles.badgeText}>OFFLINE</Text>
                                    </View>
                                )}
                            </View>
                            {api.latency && <Text style={styles.latency}>{api.latency}ms</Text>}
                        </View>
                        <Text style={styles.endpoint}>{api.endpoint}</Text>
                        <View style={styles.usageContainer}>
                            <MaterialCommunityIcons name="code-tags" size={14} color={theme.textSecondary} />
                            <Text style={styles.usage}>{api.usage}</Text>
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.surface,
    },
    content: {
        padding: theme.spacing.lg,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: theme.text,
    },
    subtitle: {
        fontSize: 14,
        color: theme.textSecondary,
        marginTop: 4,
    },
    card: {
        marginBottom: theme.spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    apiName: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.text,
    },
    endpoint: {
        fontSize: 12,
        color: theme.textTertiary,
        fontFamily: 'monospace',
        marginBottom: 8,
    },
    usageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: theme.background,
        padding: 8,
        borderRadius: 6,
    },
    usage: {
        fontSize: 12,
        color: theme.textSecondary,
    },
    loading: {
        fontSize: 12,
        color: theme.textSecondary,
        fontStyle: 'italic',
    },
    latency: {
        fontSize: 12,
        color: theme.success,
        fontWeight: '600',
    },
    badgeSuccess: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: theme.success,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeError: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: theme.error,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: 'white',
    },
});
