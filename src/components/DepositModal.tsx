import { X, CreditCard, Wallet, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface DepositModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
    const [amount, setAmount] = useState<string>('500');
    const [method, setMethod] = useState<'card' | 'crypto'>('card');

    const presets = ['100', '200', '500', '1000', '2000'];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[51] bg-surface rounded-t-3xl border-t border-white/10 overflow-hidden max-w-md mx-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold tracking-tight">Deposit Funds</h2>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 pb-10">
                            {/* Methods */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setMethod('card')}
                                    className={cn(
                                        "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                                        method === 'card'
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-background border-white/5 text-zinc-400 hover:bg-white/5"
                                    )}
                                >
                                    <CreditCard size={24} />
                                    <span className="text-sm font-bold">Bank Card</span>
                                </button>
                                <button
                                    onClick={() => setMethod('crypto')}
                                    className={cn(
                                        "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                                        method === 'crypto'
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-background border-white/5 text-zinc-400 hover:bg-white/5"
                                    )}
                                >
                                    <Wallet size={24} />
                                    <span className="text-sm font-bold">Crypto</span>
                                </button>
                            </div>

                            {/* Amount Input */}
                            <div className="space-y-3">
                                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Amount (UAH)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-background border border-white/10 rounded-xl py-4 pl-4 pr-16 text-2xl font-bold text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">UAH</span>
                                </div>

                                {/* Presets */}
                                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                    {presets.map(preset => (
                                        <button
                                            key={preset}
                                            onClick={() => setAmount(preset)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-sm font-bold border transition-colors",
                                                amount === preset
                                                    ? "bg-white text-black border-white"
                                                    : "bg-background border-white/10 text-zinc-400 hover:bg-white/5"
                                            )}
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-primary hover:bg-lime-400 text-black font-bold py-4 rounded-xl uppercase tracking-wider text-sm transition-all shadow-lg shadow-lime-500/20 active:scale-[0.98] flex items-center justify-center gap-2">
                                <span>Top Up {amount || '0'} UAH</span>
                                <ArrowRight size={20} />
                            </button>

                            <p className="text-center text-[10px] text-zinc-500 max-w-[80%] mx-auto">
                                By processing this transaction you agree to our Terms & Conditions and gambling regulations.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
