import { useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';

interface DeepLinkHandlerProps {
    onGameOpen: (gameId: string) => void;
    onDepositOpen: () => void;
    onNavigate: (tab: string) => void;
}

export function DeepLinkHandler({ onGameOpen, onDepositOpen, onNavigate }: DeepLinkHandlerProps) {
    useEffect(() => {
        // Listen for deep link events when app is opened via URL
        CapApp.addListener('appUrlOpen', (event: { url: string }) => {
            console.log('App opened with URL:', event.url);

            const url = new URL(event.url);

            // Handle referral code (query param)
            const params = new URLSearchParams(url.search);
            const refCode = params.get('refcode');
            if (refCode) {
                localStorage.setItem('beton_ref_code', refCode);
                console.log('Referral code saved:', refCode);
            }

            if (event.url.includes('deposit')) {
                onDepositOpen();
            } else if (event.url.includes('game')) {
                const gameId = url.pathname.replace('/', '');
                if (gameId) onGameOpen(gameId);
            } else if (event.url.includes('sports')) {
                onNavigate('sports');
            } else if (event.url.includes('profile')) {
                onNavigate('profile');
            }
        });

        // Handle the initial URL if app was launched by one
        const checkInitialUrl = async () => {
            const { url } = await CapApp.getLaunchUrl() || { url: null };
            if (url) {
                // We could manually trigger the logic here if needed
                // but often the listener handles it too.
            }
        };

        checkInitialUrl();

        return () => {
            CapApp.removeAllListeners();
        };
    }, [onGameOpen, onDepositOpen, onNavigate]);

    return null; // This is a logic-only component
}
