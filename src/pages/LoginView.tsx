import { useState } from 'react';
import { ShieldCheck, Mail, Lock, FileKey, Fingerprint, Landmark, ChevronDown, Upload } from 'lucide-react';
import { NativeService } from '../lib/native';
import { cn } from '../lib/utils';

type LoginTab = 'login' | 'diia' | 'kep' | 'bankid';

function LoginView({ onLogin }: { onLogin: () => void }) {
    const [activeTab, setActiveTab] = useState<LoginTab>('login');

    // Login form state
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    // KEP state
    const [personType, setPersonType] = useState('Фізична особа');
    const [acsk, setAcsk] = useState('ПриватБанк');
    const [kepPassword, setKepPassword] = useState('');
    const [kepFileName, setKepFileName] = useState<string | null>(null);

    const handleBiometric = async () => {
        const success = await NativeService.authenticateBiometric();
        if (success) onLogin();
    };

    const handleDiia = async () => {
        await NativeService.openDiia();
        // In demo mode, just login
        setTimeout(onLogin, 1500);
    };

    const acskList = [
        'ПриватБанк',
        'Дія',
        'ПС України',
        'ЦНАП',
        'КНЕДП ТОВ "Дебет-Плюс"',
        'ДП "ІІЦ"'
    ];

    return (
        <div className="flex-1 flex flex-col p-4 bg-background min-h-screen">
            <div className="flex flex-col items-center justify-center pt-8 pb-6 space-y-4">
                <div className="text-primary">
                    <ShieldCheck size={48} />
                </div>
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-black uppercase tracking-tighter">BETON</h1>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Digital Identity & Auth</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 border-b border-white/5 pb-2">
                <TabButton
                    active={activeTab === 'login'}
                    onClick={() => setActiveTab('login')}
                    label="За логіном"
                />
                <TabButton
                    active={activeTab === 'diia'}
                    onClick={() => setActiveTab('diia')}
                    label="Дія.Підпис"
                />
                <TabButton
                    active={activeTab === 'kep'}
                    onClick={() => setActiveTab('kep')}
                    label="За КЕП"
                />
                <TabButton
                    active={activeTab === 'bankid'}
                    onClick={() => setActiveTab('bankid')}
                    label="BankID"
                />
            </div>

            <div className="flex-1 space-y-6">
                {activeTab === 'login' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-4">
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
                            <span className="text-[10px] text-zinc-600 font-bold uppercase">Або швидкий вхід</span>
                            <div className="h-[1px] bg-white/5 flex-1"></div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleBiometric}
                                className="flex-1 bg-surface border border-white/5 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                            >
                                <Fingerprint size={20} className="text-primary" />
                                <span className="text-xs font-bold uppercase">FaceID</span>
                            </button>
                            <button className="flex-1 bg-surface border border-white/5 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                                <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale opacity-50" alt="Google" />
                                <span className="text-xs font-bold uppercase">Google</span>
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'diia' && (
                    <div className="flex flex-col items-center justify-center space-y-6 py-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl">
                            <img src="https://diia.gov.ua/favicon.ico" className="w-10 h-10" alt="Diia" />
                        </div>
                        <div className="text-center space-y-2 px-6">
                            <h2 className="text-xl font-bold">Дія.Підпис</h2>
                            <p className="text-zinc-500 text-sm">Найшвидший спосіб авторизації через державний сервіс Дія</p>
                        </div>
                        <button
                            onClick={handleDiia}
                            className="w-full max-w-xs bg-white text-black font-black py-4 rounded-xl uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            Підписати в Дії
                        </button>
                    </div>
                )}

                {activeTab === 'kep' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-4">
                            {/* Person Type Selector */}
                            <div className="grid grid-cols-2 gap-2 bg-surface p-1 rounded-xl border border-white/5">
                                {['Фізична особа', 'Юридична особа'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setPersonType(type)}
                                        className={cn(
                                            "py-2 px-2 text-[10px] font-bold uppercase rounded-lg transition-all",
                                            personType === type ? "bg-primary text-black" : "text-zinc-500"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            {/* ACSK Selector */}
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                                    <Landmark size={18} />
                                </div>
                                <select
                                    value={acsk}
                                    onChange={(e) => setAcsk(e.target.value)}
                                    className="w-full bg-surface border border-white/5 rounded-xl py-4 pl-12 pr-10 text-white appearance-none focus:outline-none focus:border-primary/50 font-medium"
                                >
                                    {acskList.map(item => <option key={item} value={item}>{item}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={18} />
                            </div>

                            {/* File Upload Placeholder */}
                            <div
                                onClick={() => setKepFileName('Key_JKS_2024.jks')}
                                className={cn(
                                    "w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer",
                                    kepFileName ? "border-primary/50 bg-primary/5" : "border-white/10 hover:border-white/20 bg-surface/30"
                                )}
                            >
                                <div className={cn("p-3 rounded-full", kepFileName ? "bg-primary text-black" : "bg-white/5 text-zinc-500")}>
                                    {kepFileName ? <FileKey size={24} /> : <Upload size={24} />}
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold">{kepFileName || 'Оберіть файл ключа'}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase mt-1">.dat, .zs2, .jks, .pfx</p>
                                </div>
                            </div>

                            {/* KEP Password */}
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    type="password"
                                    value={kepPassword}
                                    onChange={(e) => setKepPassword(e.target.value)}
                                    placeholder="Пароль ключа"
                                    className="w-full bg-surface border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            onClick={onLogin}
                            disabled={!kepFileName || !kepPassword}
                            className="w-full bg-primary text-black font-black py-4 rounded-xl uppercase tracking-wider shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                        >
                            Зчитати та Увійти
                        </button>
                    </div>
                )}

                {activeTab === 'bankid' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="text-center py-4">
                            <p className="text-zinc-500 text-sm">Оберіть ваш банк для безпечної авторизації</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <BankButton name="Приват24" color="#7ab733" />
                            <BankButton name="Monobank" color="#ea222e" />
                            <BankButton name="Ощадбанк" color="#005b38" />
                            <BankButton name="Райффайзен" color="#ffef00" textColor="black" />
                        </div>
                        <button
                            onClick={onLogin}
                            className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-white font-bold py-4 rounded-xl border border-white/5 hover:bg-zinc-700 transition-colors mt-4"
                        >
                            ID.GOV.UA
                        </button>
                    </div>
                )}
            </div>

            <p className="text-[10px] text-center text-zinc-600 mt-8 mb-4 uppercase tracking-widest leading-relaxed">
                Участь в азартних іграх може викликати залежність.<br />Грайте відповідально.
            </p>
        </div>
    );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "whitespace-nowrap text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl transition-all border shrink-0",
                active
                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_-5px_rgba(212,255,0,0.3)]"
                    : "bg-surface/50 border-white/5 text-zinc-500 hover:text-zinc-300"
            )}
        >
            {label}
        </button>
    );
}

function BankButton({ name, color, textColor = 'white' }: { name: string, color: string, textColor?: string }) {
    return (
        <button
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-white/5 bg-surface/50 hover:bg-white/5 transition-all"
        >
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[9px]" style={{ backgroundColor: color, color: textColor }}>
                {name.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-[10px] font-bold uppercase">{name}</span>
        </button>
    );
}

export default LoginView;
