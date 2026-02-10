import { useState } from 'react';
import { CreditCard, ChevronRight, Settings, History, HelpCircle, LogOut } from 'lucide-react';
import { DepositModal } from '../components/DepositModal';

function ProfileView({ isDepositOpen, setIsDepositOpen }: { isDepositOpen: boolean, setIsDepositOpen: (o: boolean) => void }) {
    const [balance] = useState(12450.00);

    return (
        <div className="flex-1 overflow-y-auto no-scrollbar relative min-h-screen">
            <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />


            {/* Profile Header */}
            <header className="p-8 pb-32 bg-gradient-to-b from-secondary to-background border-b border-white/5 relative bg-secondary/20">
                <div className="absolute inset-x-0 bottom-0 top-0 opacity-10 blur-xl bg-purple-500 rounded-full w-full h-full mix-blend-plus-lighter"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-lime-300 p-1 mb-4 shadow-xl shadow-lime-500/20">
                        <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-lime-500" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>JD</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-1 tracking-tight">John Doe</h1>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium opacity-60">ID: 87391024</div>
                </div>
            </header>

            {/* Balance Card */}
            <div className="px-4 -mt-24 relative z-20">
                <div className="bg-surface border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl bg-opacity-80">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-2 flex items-center gap-2">
                                <CreditCard size={12} />
                                Main Wallet
                            </div>
                            <div className="text-3xl font-bold tracking-tight">{balance.toLocaleString('uk-UA', { minimumFractionDigits: 2 })} <span className="text-lg text-secondary font-medium">UAH</span></div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsDepositOpen(true)}
                            className="flex-1 bg-primary text-black font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm transition-all hover:bg-lime-400 hover:shadow-lg hover:shadow-lime-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Deposit
                        </button>
                        <button className="flex-1 bg-background border border-white/10 hover:bg-white/5 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm transition-all active:scale-[0.98]">
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="px-4 mt-8 pb-24 space-y-4">
                <div className="bg-surface/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
                    <MenuItem icon={History} label="Transaction History" />
                    <div className="bg-white/5 h-[1px] mx-4 my-1 opacity-20"></div>
                    <MenuItem icon={Settings} label="Account Settings" />
                    <div className="bg-white/5 h-[1px] mx-4 my-1 opacity-20"></div>
                    <MenuItem icon={HelpCircle} label="Support & Help" />
                </div>

                <button className="w-full flex items-center justify-center gap-2 text-red-500 font-medium py-4 px-4 rounded-xl hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20">
                    <LogOut size={18} />
                    <span>Log Out</span>
                </button>
            </div>

            {/* Version Info */}
            <div className="text-center text-[10px] text-zinc-600 pb-8 uppercase tracking-widest font-mono">
                Version 1.0.2 (Build 42)
            </div>
        </div>
    );
}

function MenuItem({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors border border-white/5 group-hover:border-primary/20">
                    <Icon size={20} />
                </div>
                <span className="font-medium">{label}</span>
            </div>
            <ChevronRight size={18} className="text-zinc-600 group-hover:text-white transition-colors" />
        </button>
    );
}

export default ProfileView;
