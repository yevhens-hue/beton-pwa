import { useState } from 'react';
import { ShieldCheck, LogIn, Mail, Lock } from 'lucide-react';
import { NativeService } from '../lib/native';

function LoginView({ onLogin }: { onLogin: () => void }) {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleBiometric = async () => {
        const success = await NativeService.authenticateBiometric();
        if (success) onLogin();
    };

    return (
        <div className="flex-1 flex flex-col p-6 bg-background min-h-screen">
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="text-primary animate-pulse">
                    <ShieldCheck size={80} />
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">BETON</h1>
                    <p className="text-zinc-500 text-sm font-medium">Ліцензійне казино та спорт</p>
                </div>

                <div className="w-full space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            placeholder="Email або Телефон"
                            className="w-full bg-surface border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                            className="w-full bg-surface border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                </div>

                <button
                    onClick={onLogin}
                    className="w-full bg-primary text-black font-black py-4 rounded-xl uppercase tracking-wider shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
                >
                    Увійти
                </button>

                <div className="flex items-center gap-4 w-full">
                    <div className="h-[1px] bg-white/5 flex-1"></div>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase">Або за допомогою</span>
                    <div className="h-[1px] bg-white/5 flex-1"></div>
                </div>

                <div className="flex gap-4 w-full">
                    <button
                        onClick={handleBiometric}
                        className="flex-1 bg-surface border border-white/5 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                    >
                        <LogIn size={20} className="text-primary" />
                        <span className="text-xs font-bold uppercase">FaceID</span>
                    </button>
                    <button className="flex-1 bg-surface border border-white/5 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                        <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale opacity-50" alt="Google" />
                        <span className="text-xs font-bold uppercase">Google</span>
                    </button>
                </div>
            </div>

            <p className="text-[10px] text-center text-zinc-600 mt-8 uppercase tracking-widest leading-relaxed">
                Участь в азартних іграх може викликати залежність.<br />Грайте відповідально.
            </p>
        </div>
    );
}

export default LoginView;
