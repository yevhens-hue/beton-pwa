import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const HapticService = {
    // Light feedback for button clicks, selections
    async lightImpact() {
        try {
            await Haptics.impact({ style: ImpactStyle.Light });
        } catch (e) {
            // Ignore if not on mobile
        }
    },

    // Medium feedback for transitions or important actions
    async mediumImpact() {
        try {
            await Haptics.impact({ style: ImpactStyle.Medium });
        } catch (e) {
        }
    },

    // Heavy feedback for wins, bonus unlocks
    async heavyImpact() {
        try {
            await Haptics.impact({ style: ImpactStyle.Heavy });
        } catch (e) {
        }
    },

    // Selection change vibration
    async selectionChange() {
        try {
            await Haptics.selectionStart();
            await Haptics.selectionChanged();
            await Haptics.selectionEnd();
        } catch (e) {
        }
    }
};
