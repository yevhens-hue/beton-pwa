import { ChevronLeft, Trophy, Crown, Briefcase as Chest, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function BonusView() {
    const steps = [
        { label: '1-й депозит', active: true, completed: true },
        { label: '2-й депозит', active: false, completed: false },
        { label: '3-й депозит', active: false, completed: false },
        { label: '5-й депозит', active: false, completed: false },
    ];

    return (
        <div className="flex-1 bg-background text-white min-h-screen font-sans">
            {/* Background Dice Decoration */}
            <div className="fixed top-20 -left-10 opacity-20 animate-float">
                <div className="w-24 h-24 bg-primary rotate-12 rounded-xl"></div>
            </div>
            <div className="fixed bottom-40 -right-10 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-32 h-32 bg-primary -rotate-45 rounded-2xl"></div>
            </div>

            {/* Header */}
            <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 z-30 bg-background/80 backdrop-blur-md">
                <button className="text-zinc-500 hover:text-white transition-colors">
                    <ChevronLeft size={28} />
                </button>
                <h1 className="text-xs font-black uppercase tracking-[0.2em]">Вітальний пакет</h1>
                <div className="w-7"></div>
            </header>

            <div className="px-6 pt-4 pb-32">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter leading-none mb-1">
                        TROPHIES FOR
                    </h2>
                    <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter leading-none text-primary">
                        ACTION-TAKERS
                    </h2>
                </div>

                {/* Main Promo Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-[40px] overflow-hidden bg-surface border border-white/5 mb-8 shadow-2xl"
                >
                    <div className="aspect-[4/5] relative">
                        <img
                            src="https://images.unsplash.com/photo-1614028674026-a65e31ce045d?w=800&q=80"
                            className="w-full h-full object-cover grayscale-[0.5] opacity-40 blur-[2px]"
                            alt="Treasure"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>

                        {/* 3D Asset Mockup (Floating Treasure Chest) */}
                        <div className="absolute inset-0 flex items-center justify-center p-10">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
                                <div className="relative z-10 p-8 rounded-[40px] bg-gradient-to-br from-zinc-800 to-black border border-white/5 shadow-2xl rotate-3 transform group-hover:rotate-0 transition-transform duration-700">
                                    <div className="flex flex-col items-center">
                                        <LayoutGrid className="text-primary mb-4" size={48} />
                                        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl mb-4 text-[10px] font-black uppercase tracking-wider border border-white/5">
                                            БОНУСИ ДЛЯ НОВАЧКІВ
                                        </div>
                                        <div className="text-primary-lime font-black text-center text-xs tracking-[0.3em] font-display">BETON</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Offer Text */}
                        <div className="absolute bottom-8 left-0 right-0 px-8 text-center bg-surface/80 backdrop-blur-md py-6">
                            <h3 className="text-2xl font-display font-black tracking-tighter mb-2">250 000 ₴ + 500 ФС</h3>
                            <p className="text-[11px] text-zinc-400 font-medium leading-relaxed mb-6">
                                Бери максимум у Вітальному паку – покажи свій характер! А за відіграш не парся – ми забетонували наднизькі вейджери.
                            </p>
                            <button className="w-full bg-accent text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-[0_8px_24px_rgba(99,102,241,0.4)] active:scale-95 transition-all">
                                Внести депозит
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Deposit Progress Steps */}
                <div className="space-y-6 mb-8">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center">Твої бонуси за депозит:</p>

                    <div className="flex justify-between items-center px-4 relative">
                        {/* Connection Line */}
                        <div className="absolute top-5 left-10 right-10 h-0.5 bg-zinc-800">
                            <div className="h-full bg-primary w-1/4 shadow-[0_0_10px_#E2FF00]"></div>
                        </div>

                        {steps.map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                                    step.active
                                        ? "bg-primary text-black shadow-[0_4px_15px_rgba(226,255,0,0.5)] scale-110"
                                        : step.completed
                                            ? "bg-zinc-800 text-primary border border-primary/20"
                                            : "bg-surface border border-white/5 text-zinc-600"
                                )}>
                                    {step.completed && !step.active ? <Crown size={18} /> : <Zap size={18} />}
                                </div>
                                <span className={cn(
                                    "text-[8px] font-black uppercase tracking-tighter text-center",
                                    step.active ? "text-primary" : "text-zinc-600"
                                )}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Small Promo Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface/50 border border-white/10 rounded-[32px] p-6 text-center">
                        <p className="text-[8px] text-zinc-500 font-bold mb-1 uppercase">Депозит від 100 ₴</p>
                        <p className="text-md font-display font-black mb-4 tracking-tighter">100% + 100 ФС</p>
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/5">
                            <Chest className="text-primary" />
                        </div>
                    </div>
                    <div className="bg-surface/50 border border-white/10 rounded-[32px] p-6 text-center opacity-50 grayscale">
                        <p className="text-[8px] text-zinc-500 font-bold mb-1 uppercase">Депозит від 200 ₴</p>
                        <p className="text-md font-display font-black mb-4 tracking-tighter">125% + 150 ФС</p>
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                            <Trophy className="text-zinc-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LayoutGrid(props: any) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
    );
}
