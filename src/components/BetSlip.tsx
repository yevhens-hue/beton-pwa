import { useRef } from 'react';
import { X, ChevronDown, Trash2 } from 'lucide-react';
import { useBetSlip } from '../context/BetSlipContext';

import { motion, AnimatePresence } from 'framer-motion';

export function BetSlip() {
    const { bets, removeBet, clearBets, isOpen, setIsOpen } = useBetSlip();
    const inputRef = useRef<HTMLInputElement>(null);

    const calculateTotalOdds = () => {
        return bets.reduce((acc, bet) => acc * bet.odd, 1).toFixed(2);
    };

    const calculatePotentialWin = (amount: number) => {
        return (amount * parseFloat(calculateTotalOdds())).toFixed(2);
    };

    return (
        <AnimatePresence>
            {isOpen && bets.length > 0 && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-20 left-4 right-4 z-50 bg-surface border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[60vh]"
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between p-4 bg-secondary/10 border-b border-white/5 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold text-sm">
                                {bets.length}
                            </div>
                            <span className="font-bold text-sm uppercase tracking-wide">Bet Slip</span>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <ChevronDown size={20} />
                        </button>
                    </div>

                    {/* Bets List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[250px] no-scrollbar">
                        {bets.map((bet) => (
                            <div key={bet.id} className="relative bg-background/50 rounded-xl p-3 border border-white/5 pr-10">
                                <button
                                    onClick={() => removeBet(bet.id)}
                                    className="absolute top-3 right-3 text-zinc-500 hover:text-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>

                                <div className="flex items-center gap-2 mb-1 text-[10px] text-zinc-400 font-mono uppercase">
                                    <span>{bet.gameId.includes('Pre') ? 'Prematch' : 'Live'}</span>
                                    <span>•</span>
                                    <span>Football</span>
                                </div>

                                <div className="font-bold text-sm mb-1">{bet.team1} vs {bet.team2}</div>

                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-400">Selection: <span className="text-white font-bold">{bet.selection}</span></span>
                                    <span className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded text-sm">{bet.odd.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer - Wager & Place Bet */}
                    <div className="p-4 bg-background border-t border-white/5 space-y-3">
                        <div className="flex justify-between items-center text-xs text-zinc-400">
                            <span>Total Odds:</span>
                            <span className="text-primary font-bold text-sm">{calculateTotalOdds()}</span>
                        </div>

                        <div className="relative">
                            <span className="absolute left-3 top-3 text-zinc-500 text-xs font-bold">UAH</span>
                            <input
                                ref={inputRef}
                                type="number"
                                placeholder="Stake amount"
                                className="w-full bg-surface border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white font-bold text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-zinc-600 placeholder:font-normal"
                            />
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase font-medium">
                            <span>Potential Return:</span>
                            <span className="text-white">{calculatePotentialWin(100)} UAH</span>
                        </div>

                        <div className="grid grid-cols-[auto_1fr] gap-3 pt-2">
                            <button
                                onClick={clearBets}
                                className="p-3 rounded-xl bg-surface hover:bg-red-500/10 text-zinc-400 hover:text-red-500 border border-white/5 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                            <button className="bg-primary hover:bg-lime-400 text-black font-bold py-3 px-4 rounded-xl uppercase tracking-wider text-sm transition-all shadow-lg shadow-lime-500/10 active:scale-[0.98]">
                                Place Bet
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
