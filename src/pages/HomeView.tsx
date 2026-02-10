import { useState } from 'react';
import { Search, Bell, Plus, LayoutGrid, Layers, Globe, Star, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

export default function HomeView() {
    const [activeCategory, setActiveCategory] = useState('СЛОТИ');

    const categories = [
        { name: 'СЛОТИ', icon: LayoutGrid },
        { name: 'КОЛЕКЦІЇ', icon: Layers },
        { name: 'ПРОВАЙДЕРИ', icon: Globe },
    ];

    const subCategories = [
        { name: 'Усі слоти', icon: LayoutGrid },
        { name: 'Топ слоти', icon: Star },
        { name: 'Новинки', icon: Bell },
        { name: 'Улюблені', icon: Heart },
    ];

    const recommendedGames = [
        { title: 'Wild Spin', image: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=600&fit=crop', badge: 'Top', isNew: true },
        { title: 'Trojan Mysteries', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop', badge: 'Top', isNew: true },
        { title: 'Tyrannosaurus Rocks', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=600&fit=crop', badge: 'Top', isNew: true },
        { title: 'Wild Spin 2', image: 'https://images.unsplash.com/photo-1541339907198-e08756eaa539?w=400&h=600&fit=crop', badge: 'Top', isNew: true },
        { title: 'Trojan 2', image: 'https://images.unsplash.com/photo-1596838132731-dd96756c1031?w=400&h=600&fit=crop', badge: 'Top', isNew: true },
        { title: 'Tyranno 2', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop', badge: 'Top', isNew: true },
    ];

    return (
        <div className="flex-1 bg-background text-white min-h-screen">
            {/* Header */}
            <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 z-30 bg-background/80 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-zinc-400">
                        <Bell size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-zinc-400">
                        <Search size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Баланс</p>
                        <p className="text-lg font-display font-black tracking-tight">31 021 ₴</p>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_4px_12px_rgba(99,102,241,0.4)]">
                        <Plus size={24} />
                    </button>
                </div>
            </header>

            {/* Hero Promo Slider Placeholder */}
            <div className="px-4 mb-8">
                <div className="relative h-48 rounded-[32px] overflow-hidden bg-gradient-to-br from-zinc-800 to-black border border-white/5 shadow-2xl group">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    <div className="absolute top-6 left-8 z-10">
                        <div className="bg-primary/20 backdrop-blur-md border border-primary/20 rounded-full px-3 py-1 flex items-center gap-2 mb-2 w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                            <span className="text-[10px] text-primary font-black uppercase tracking-widest">ВІТАЛЬНИЙ ПАКЕТ</span>
                        </div>
                        <h2 className="text-2xl font-display font-black uppercase leading-none tracking-tighter">
                            260 000 ГРН<br />
                            <span className="text-primary">+ 400 ФС</span>
                        </h2>
                        <button className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-black uppercase px-6 py-2.5 rounded-full border border-white/10 transition-colors">
                            Детальніше
                        </button>
                    </div>
                    {/* Visual dice element would go here */}
                    <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/20 blur-[80px] rounded-full"></div>
                </div>
            </div>

            {/* Main Categories */}
            <div className="px-6 mb-6 overflow-x-auto no-scrollbar flex gap-2">
                {categories.map(cat => (
                    <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3.5 rounded-2xl border transition-all shrink-0",
                            activeCategory === cat.name
                                ? "bg-white text-black border-white shadow-xl"
                                : "bg-surface border-white/5 text-zinc-500"
                        )}
                    >
                        <cat.icon size={20} className={activeCategory === cat.name ? "text-black" : "text-zinc-500"} />
                        <span className="text-xs font-black uppercase tracking-wider">{cat.name}</span>
                    </button>
                ))}
            </div>

            {/* Subcategories Filter */}
            <div className="px-6 mb-8 overflow-x-auto no-scrollbar flex gap-4">
                {subCategories.map(sub => (
                    <button key={sub.name} className="flex items-center gap-2 shrink-0 group">
                        <div className="w-5 h-5 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                            <sub.icon size={18} />
                        </div>
                        <span className="text-[11px] font-bold text-zinc-500 group-hover:text-white uppercase transition-colors whitespace-nowrap">{sub.name}</span>
                    </button>
                ))}
            </div>

            {/* Recommended Section */}
            <div className="px-6 pb-32">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Star className="text-primary" size={18} fill="currentColor" />
                        <h3 className="text-md font-display font-black uppercase tracking-tight">BETON РЕКОМЕНДУЄ</h3>
                    </div>
                    <button className="text-[10px] font-black text-zinc-500 uppercase">Усі</button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {recommendedGames.map((game, i) => (
                        <div key={i} className="relative group active:scale-95 transition-transform">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-surface relative">
                                <img src={game.image} alt={game.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />

                                {/* Badges */}
                                <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                                    {game.isNew && (
                                        <div className="bg-primary/90 text-black text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">
                                            Новинка
                                        </div>
                                    )}
                                    <div className="bg-white/10 backdrop-blur-md text-white text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter border border-white/10">
                                        {game.badge}
                                    </div>
                                </div>

                                <button className="absolute top-1.5 right-1.5 text-white/50 hover:text-primary drop-shadow-lg">
                                    <Heart size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
