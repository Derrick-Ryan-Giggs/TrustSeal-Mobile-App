import { Share } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const shareContent = async (message: string, title: string = 'Share from Authentify') => {
    try {
        const result = await Share.share({
            message,
            title,
        });
        return result;
    } catch (error) {
        console.error('Error sharing content:', error);
        throw error;
    }
};

export const generateAndSharePDF = async (htmlContent: string) => {
    try {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
        console.error('Error generating/sharing PDF:', error);
        throw error;
    }
};
