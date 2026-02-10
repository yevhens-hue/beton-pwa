import { useState } from 'react';
import { ShieldCheck, Mail, Lock, Fingerprint, LogIn } from 'lucide-react';
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
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
                {/* Logo Section */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="text-primary p-4 rounded-3xl bg-primary/5 border border-primary/20 shadow-[0_0_30px_-5px_rgba(212,255,0,0.2)]">
                        <ShieldCheck size={64} />
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">BETON</h1>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">Premium Gaming Experience</p>
                    </div>
                </div>

                {/* Input Form */}
                <div className="w-full space-y-4 max-w-sm">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            placeholder="Email або Телефон"
                            className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-zinc-600 font-medium"
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                            className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-zinc-600 font-medium"
                        />
                    </div>

                    <button
                        onClick={onLogin}
                        className="w-full bg-primary text-black font-black py-4 rounded-2xl uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        <span>Увійти</span>
                        <LogIn size={20} />
                    </button>
                </div>

                {/* Alternative Auth */}
                <div className="w-full max-w-sm space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] bg-white/5 flex-1"></div>
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Або швидкий вхід</span>
                        <div className="h-[1px] bg-white/5 flex-1"></div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleBiometric}
                            className="flex-1 bg-surface border border-white/5 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/10 transition-all group"
                        >
                            <Fingerprint size={20} className="text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase">FaceID</span>
                        </button>
                        <button className="flex-1 bg-surface border border-white/5 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/10 transition-all group">
                            <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="Google" />
                            <span className="text-xs font-bold uppercase">Google</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Legal Footer */}
            <div className="pt-8 pb-4">
                <p className="text-[9px] text-center text-zinc-600 uppercase tracking-widest leading-relaxed max-w-[280px] mx-auto opacity-60">
                    Участь в азартних іграх може викликати залежність. дотримуйтеся правил (принципів) відповідальної гри.
                </p>
            </div>
        </div>
    );
}

export default LoginView;
