import { Home, LayoutGrid, User, Menu, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavBarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function BottomNavBar({ activeTab, setActiveTab }: BottomNavBarProps) {
    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'bonuses', icon: Trophy, label: 'Bonuses' },
        // Center button is handled separately
        { id: 'sports', icon: LayoutGrid, label: 'Sports' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-xl border border-white/5 rounded-[32px] px-2 py-2 flex items-center justify-between gap-1 pointer-events-auto shadow-2xl relative w-full max-w-sm">

                {/* First two tabs */}
                <div className="flex flex-1 justify-around">
                    {tabs.slice(0, 2).map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "p-4 rounded-2xl transition-all duration-300",
                                activeTab === tab.id ? "text-primary bg-white/5" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                        </button>
                    ))}
                </div>

                {/* Center Main Menu Button */}
                <div className="relative -top-2">
                    <button
                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black shadow-[0_8px_20px_-4px_rgba(226,255,0,0.5)] active:scale-95 transition-all"
                        onClick={() => setActiveTab('home')}
                    >
                        <Menu size={32} strokeWidth={3} />
                    </button>
                </div>

                {/* Last two tabs */}
                <div className="flex flex-1 justify-around">
                    {tabs.slice(2).map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "p-4 rounded-2xl transition-all duration-300",
                                activeTab === tab.id ? "text-primary bg-white/5" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
