import { ArrowRight, Bell, Menu, Trophy, Activity } from 'lucide-react';

function HomeView() {

    return (
        <div className="flex-1">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-background/50 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
                <Menu className="w-6 h-6 text-white" />
                <div className="flex items-center gap-3">
                    <div className="bg-surface px-3 py-1.5 rounded-full flex items-center gap-3 border border-white/10">
                        <div className="text-right leading-tight">
                            <div className="font-bold text-sm tracking-wide">0.00 ₴</div>
                            <div className="text-[10px] text-zinc-400 font-medium uppercase">Real Balance</div>
                        </div>
                        <button className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-lime-400 transition-colors">
                            <span className="font-bold text-lg">+</span>
                        </button>
                    </div>
                    <Bell className="w-6 h-6 text-white" />
                </div>
            </header>

            {/* Search Bar */}
            <div className="px-4 py-3">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Seach for games..."
                        className="w-full bg-surface border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <svg className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            {/* Promotion Banners Carousel */}
            <div className="relative group">
                <div
                    className="flex overflow-x-auto gap-4 px-4 py-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
                >
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex-shrink-0 w-80 h-40 bg-gradient-to-br from-secondary/80 to-surface rounded-2xl p-5 relative overflow-hidden snap-center border border-white/5 shadow-lg group-hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute inset-0 bg-black/20 z-0"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold italic uppercase tracking-wider text-white drop-shadow-md">Welcome Bonus</h3>
                                    <p className="text-sm text-zinc-200 mt-1 max-w-[80%]">Get up to 200% on your first deposit + 50 FS</p>
                                </div>
                                <button className="bg-primary hover:bg-lime-400 text-black text-xs font-bold py-2 px-4 rounded-lg uppercase tracking-wider transition-colors shadow-lg shadow-lime-500/20">
                                    Claim Now
                                </button>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -right-4 -bottom-4 opacity-20">
                                <Trophy size={100} className="text-white transform rotate-12" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="mt-6 px-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {['All', 'Slots', 'Live Casino', 'Table Games', 'Crash Games'].map((cat, i) => (
                        <button
                            key={cat}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${i === 0 ? 'bg-primary text-black border-transparent shadow-[0_0_15px_-3px_rgba(212,255,0,0.3)]' : 'bg-surface text-zinc-400 border-white/5 hover:bg-white/5 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Games Grid */}
            <div className="mt-4 px-4 pb-20">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Popular Games</h2>
                    <button className="text-xs text-primary font-medium hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((game) => (
                        <div key={game} className="group relative aspect-[3/2] rounded-xl overflow-hidden bg-surface border border-white/5 cursor-pointer hover:border-primary/50 transition-colors">
                            <div className="w-full h-full bg-zinc-800 animate-pulse group-hover:animate-none group-hover:bg-zinc-700 transition-colors flex items-center justify-center">
                                <Activity className="opacity-20 w-8 h-8 group-hover:text-primary group-hover:opacity-100 transition-all duration-300" />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                <div className="text-sm font-bold truncate group-hover:text-primary transition-colors">Game Title {game}</div>
                                <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Provider</div>
                            </div>

                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 backdrop-blur-[1px]">
                                <div className="bg-primary text-black rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-200">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeView;
