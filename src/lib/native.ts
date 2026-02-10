import { Geolocation } from '@capacitor/geolocation';
import { NativeBiometric } from 'capacitor-native-biometric';

export const NativeService = {
    // Check if User is in Ukraine
    async checkGeolocation() {
        try {
            const coordinates = await Geolocation.getCurrentPosition();
            const { latitude, longitude } = coordinates.coords;

            // Basic check for Ukraine bounding box (approximate)
            // Lat: 44.4 to 52.4, Lon: 22.1 to 40.2
            const isInUkraine = latitude >= 44.4 && latitude <= 52.4 &&
                longitude >= 22.1 && longitude <= 40.2;

            return isInUkraine;
        } catch (e) {
            console.error('Geolocation failed', e);
            return true; // Fallback for dev
        }
    },

    // FaceID / TouchID Auth
    async authenticateBiometric() {
        try {
            const result = await NativeBiometric.isAvailable();
            if (!result.isAvailable) return false;

            await NativeBiometric.verifyIdentity({
                reason: "Увійдіть в BETON за допомогою FaceID",
                title: "Біометрична авторизація",
                subtitle: "Підтвердіть вашу особу",
                description: "Це потрібно для безпечного входу"
            });
            return true;
        } catch (e) {
            console.error('Biometric auth failed', e);
            return false;
        }
    },

    // Open Diia app for signature
    async openDiia() {
        try {
            // In a real app, we would use Browser plugin or a custom scheme
            console.log('Opening Diia.Signature...');
            // window.location.href = 'diia://...';
            return true;
        } catch (e) {
            console.error('Failed to open Diia', e);
            return false;
        }
    }
};
