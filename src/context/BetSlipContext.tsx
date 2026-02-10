import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Bet {
    id: string;
    gameId: string;
    team1: string;
    team2: string;
    selection: '1' | 'X' | '2';
    odd: number;
}

interface BetSlipContextType {
    bets: Bet[];
    addBet: (bet: Bet) => void;
    removeBet: (id: string) => void;
    toggleBet: (bet: Bet) => void;
    clearBets: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export function BetSlipProvider({ children }: { children: ReactNode }) {
    const [bets, setBets] = useState<Bet[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addBet = (bet: Bet) => {
        // Remove if exists
        const existing = bets.find(b => b.gameId === bet.gameId);
        if (existing) {
            if (existing.selection === bet.selection) {
                removeBet(existing.id);
                return;
            }
            // Change selection if clicking another option
            setBets(prev => prev.map(b => b.gameId === bet.gameId ? bet : b));
        } else {
            setBets(prev => [...prev, bet]);
            setIsOpen(true);
        }
    };

    const removeBet = (id: string) => {
        setBets(prev => prev.filter(b => b.id !== id));
        if (bets.length <= 1) setIsOpen(false);
    };

    const toggleBet = (bet: Bet) => {
        addBet(bet);
    };

    const clearBets = () => {
        setBets([]);
        setIsOpen(false);
    };

    return (
        <BetSlipContext.Provider value={{ bets, addBet, removeBet, toggleBet, clearBets, isOpen, setIsOpen }}>
            {children}
        </BetSlipContext.Provider>
    );
}

export function useBetSlip() {
    const context = useContext(BetSlipContext);
    if (context === undefined) {
        throw new Error('useBetSlip must be used within a BetSlipProvider');
    }
    return context;
}
