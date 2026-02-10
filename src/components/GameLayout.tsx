import { useState, useEffect } from 'react';
import { ChevronLeft, Search, Plus, Loader2, Apple } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { HapticService } from '../lib/haptics';

interface GameLayoutProps {
    gameId: string;
    onBack: () => void;
    onDeposit: () => void;
}

export function GameLayout({ gameId, onBack, onDeposit }: GameLayoutProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [showQuickDeposit, setShowQuickDeposit] = useState(false);

    useEffect(() => {
        // Attempt to switch to landscape for games
        const setOrientation = async () => {
            try {
                await ScreenOrientation.lock({ orientation: 'landscape' });
            } catch (e) {
                console.log('Orientation lock not supported on this device/browser');
            }
        };

        setOrientation();

        // Revert to portrait on leave
        return () => {
            const resetOrientation = async () => {
                try {
                    await ScreenOrientation.lock({ orientation: 'portrait' });
                } catch (e) { }
            };
            resetOrientation();
        };
    }, []);

    const handleBack = () => {
        HapticService.lightImpact();
        onBack();
    };

    const toggleQuickDeposit = () => {
        HapticService.mediumImpact();
        setShowQuickDeposit(!showQuickDeposit);
    };

    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col overflow-hidden">
            {/* Game Header */}
            <header className="h-16 flex items-center justify-between px-6 bg-black/60 backdrop-blur-xl border-b border-white/5 relative z-[70]">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <Search className="text-zinc-600" size={20} />
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] font-display text-primary">{gameId}</h2>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Баланс</p>
                        <p className="text-md font-display font-black">31 021 ₴</p>
                    </div>
                    <button
                        onClick={toggleQuickDeposit}
                        className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all",
                            showQuickDeposit ? "bg-white text-black rotate-45" : "bg-accent text-white shadow-accent/20"
                        )}
                    >
                        <Plus size={20} strokeWidth={3} />
                    </button>
                </div>
            </header>

            {/* Quick Deposit Overlay */}
            <AnimatePresence>
                {showQuickDeposit && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        className="absolute top-16 left-0 right-0 z-[65] bg-surface/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
                    >
                        <div className="grid grid-cols-3 gap-3">
                            {[100, 500, 1000].map(amount => (
                                <button
                                    key={amount}
                                    onClick={() => { HapticService.lightImpact(); onDeposit(); }}
                                    className="bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-black hover:bg-primary hover:text-black transition-all"
                                >
                                    {amount} ₴
                                </button>
                            ))}
                        </div>
                        <button className="w-full bg-white text-black py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-wider text-xs">
                            <Apple size={18} fill="currentColor" />
                            <span>Quick Pay</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Game Content */}
            <div className="flex-1 relative bg-zinc-900">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-black">
                        <Loader2 className="animate-spin text-primary" size={48} />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 animate-pulse">Завантаження слоту...</p>
                    </div>
                )}

                {/* Mock Slot WebView / Iframe */}
                <iframe
                    src={`https://demo.belatragames.com/belatra/demo?id=wild_spin&lang=en`}
                    className="w-full h-full border-none"
                    onLoad={() => setIsLoading(false)}
                    title="Game WebView"
                />
            </div>
        </div>
    );
}
