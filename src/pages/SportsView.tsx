import { useState } from 'react';
import { Trophy, Activity, Filter, Timer, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useBetSlip } from '../context/BetSlipContext';

function SportsView() {
    const [activeTab, setActiveTab] = useState<'live' | 'prematch'>('live');
    const { toggleBet, bets } = useBetSlip();

    const matches = [
        { id: '1', team1: 'Man City', team2: 'Arsenal', league: 'Premier League', score: '2 - 1', time: '42:15', odds: { '1': 1.85, 'X': 3.40, '2': 4.20 } },
        { id: '2', team1: 'Liverpool', team2: 'Chelsea', league: 'Premier League', score: '0 - 0', time: '12:00', odds: { '1': 2.10, 'X': 3.10, '2': 3.50 } },
        { id: '3', team1: 'Real Madrid', team2: 'Barcelona', league: 'La Liga', score: '1 - 1', time: '55:30', odds: { '1': 2.50, 'X': 3.20, '2': 2.80 } },
        { id: '4', team1: 'Bayern', team2: 'Dortmund', league: 'Bundesliga', score: '3 - 0', time: '78:45', odds: { '1': 1.15, 'X': 6.50, '2': 15.00 } },
        { id: '5', team1: 'PSG', team2: 'Marseille', league: 'Ligue 1', score: '0 - 1', time: '22:10', odds: { '1': 1.95, 'X': 3.60, '2': 3.80 } },
    ];

    const handleOddClick = (match: any, selection: '1' | 'X' | '2', odd: number) => {
        toggleBet({
            id: `${match.id}-${selection}-${activeTab}`,
            gameId: match.id,
            team1: match.team1,
            team2: match.team2,
            selection,
            odd
        });
    };

    const isSelected = (gameId: string, selection: string) => {
        return bets.some(b => b.gameId === gameId && b.selection === selection);
    }

    return (
        <div className="flex-1 overflow-hidden relative">
            {/* Header */}
            <header className="px-4 pt-6 pb-2 sticky top-0 z-10 bg-background/50 backdrop-blur-md">
                <h1 className="text-2xl font-bold mb-4 tracking-tight">Sports Betting</h1>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-surface rounded-xl relative border border-white/5">
                    <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-lg transition-transform duration-300 ease-out shadow-lg shadow-primary/20`}
                        style={{
                            transform: `translateX(${activeTab === 'live' ? '4px' : 'calc(100% + 4px)'})`
                        }}
                    />
                    <button
                        onClick={() => setActiveTab('live')}
                        className={cn(
                            "flex-1 py-2 text-sm font-bold z-10 transition-colors duration-200 text-center uppercase tracking-wider",
                            activeTab === 'live' ? "text-black" : "text-zinc-500 hover:text-white"
                        )}
                    >
                        Live
                    </button>
                    <button
                        onClick={() => setActiveTab('prematch')}
                        className={cn(
                            "flex-1 py-2 text-sm font-bold z-10 transition-colors duration-200 text-center uppercase tracking-wider",
                            activeTab === 'prematch' ? "text-black" : "text-zinc-500 hover:text-white"
                        )}
                    >
                        Prematch
                    </button>
                </div>
            </header>

            {/* Sports Icons */}
            <div className="px-4 py-3 overflow-x-auto no-scrollbar flex gap-4 border-b border-white/5 bg-background">
                {[
                    { icon: Trophy, name: "Football" },
                    { icon: Activity, name: "Basketball" },
                    { icon: Timer, name: "Tennis" },
                    { icon: Filter, name: "Hockey" },
                    { icon: Trophy, name: "Volleyball" },
                ].map((sport, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer group">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors border ${i === 0 ? 'bg-secondary text-white border-transparent' : 'bg-surface text-zinc-500 border-white/5 group-hover:bg-zinc-800'}`}>
                            <sport.icon size={20} />
                        </div>
                        <span className={`text-[10px] uppercase font-medium ${i === 0 ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{sport.name}</span>
                    </div>
                ))}
            </div>

            {/* Matches List */}
            <div className="px-4 py-4 space-y-4 pb-20 overflow-y-auto h-[calc(100vh-180px)] no-scrollbar">
                {matches.map((match) => (
                    <div key={match.id} className="bg-surface rounded-xl p-4 border border-white/5 hover:border-primary/20 transition-colors group">
                        <div className="flex justify-between items-center mb-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><Trophy size={12} className="text-secondary" /> {match.league}</span>
                            <span className="text-red-500 flex items-center gap-1"><span className="animate-pulse bg-red-500 w-1.5 h-1.5 rounded-full"></span> {match.time}</span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-1 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold uppercase">{match.team1.substring(0, 3)}</div>
                                <span className="font-bold text-sm">{match.team1}</span>
                            </div>
                            <div className="px-3 font-mono font-bold text-lg text-primary tracking-widest bg-black/20 rounded py-1">{match.score}</div>
                            <div className="flex-1 flex items-center gap-3 justify-end">
                                <span className="font-bold text-sm">{match.team2}</span>
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold uppercase">{match.team2.substring(0, 3)}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <OddsButton
                                label="1"
                                value={match.odds['1'].toFixed(2)}
                                active={isSelected(match.id, '1')}
                                onClick={() => handleOddClick(match, '1', match.odds['1'])}
                            />
                            <OddsButton
                                label="X"
                                value={match.odds['X'].toFixed(2)}
                                active={isSelected(match.id, 'X')}
                                onClick={() => handleOddClick(match, 'X', match.odds['X'])}
                            />
                            <OddsButton
                                label="2"
                                value={match.odds['2'].toFixed(2)}
                                active={isSelected(match.id, '2')}
                                onClick={() => handleOddClick(match, '2', match.odds['2'])}
                            />
                        </div>

                        {/* Additional Markets Hint */}
                        <div className="mt-3 flex justify-center">
                            <button className="text-[10px] text-zinc-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1">
                                +42 Markets <ChevronRight size={10} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OddsButton({ label, value, active, onClick }: { label: string, value: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 border",
                active
                    ? "bg-primary text-black border-primary shadow-[0_0_10px_-2px_rgba(212,255,0,0.5)] transform scale-[1.02]"
                    : "bg-surface/50 text-white border-white/5 hover:bg-white/5 hover:border-white/10"
            )}>
            <span className={cn("text-[10px] font-medium opacity-60 mb-0.5", active ? "text-black" : "text-zinc-400")}>{label}</span>
            <span className="font-bold text-sm tracking-tight">{value}</span>
        </button>
    );
}

export default SportsView;
