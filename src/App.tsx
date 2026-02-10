import { useState, useEffect } from 'react';
import { Home, Trophy, Search, Gift, User } from 'lucide-react';
import { cn } from './lib/utils';
import HomeView from './pages/HomeView';
import SportsView from './pages/SportsView';
import ProfileView from './pages/ProfileView';
import LoginView from './pages/LoginView';
import { BetSlipProvider } from './context/BetSlipContext';
import { BetSlip } from './components/BetSlip';
import { NativeService } from './lib/native';
import { DeepLinkHandler } from './components/DeepLinkHandler';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInAllowedRegion, setIsInAllowedRegion] = useState<boolean | null>(null);
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  useEffect(() => {
    const checkGeo = async () => {
      const allowed = await NativeService.checkGeolocation();
      setIsInAllowedRegion(allowed);
    };
    checkGeo();
  }, []);

  if (isInAllowedRegion === false) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-zinc-500 p-8 text-center">
        Додаток доступний лише на території України згідно з ліцензійними вимогами.
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <BetSlipProvider>
      <DeepLinkHandler
        onGameOpen={(id) => {
          console.log('Opening game:', id);
          setActiveTab('home');
        }}
        onDepositOpen={() => setIsDepositOpen(true)}
        onNavigate={(tab) => setActiveTab(tab)}
      />
      <div className="flex flex-col h-screen bg-background text-white overflow-hidden max-w-md mx-auto border-x border-surface/20 shadow-2xl relative">
        <main className="flex-1 overflow-y-auto no-scrollbar relative pb-20">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'sports' && <SportsView />}
          {activeTab === 'search' && (
            <div className="flex items-center justify-center h-full text-zinc-500">
              Search functionality coming soon
            </div>
          )}
          {activeTab === 'bonuses' && (
            <div className="flex items-center justify-center h-full text-zinc-500">
              Bonuses content coming soon
            </div>
          )}
          {activeTab === 'profile' && (
            <ProfileView isDepositOpen={isDepositOpen} setIsDepositOpen={setIsDepositOpen} />
          )}

          <BetSlip />
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-surface border-t border-white/5 pb-6 pt-2 px-6 flex justify-between items-center text-xs font-medium sticky bottom-0 z-40 w-full shrink-0">
          <NavButton
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
            icon={<Home size={24} />}
            label="Home"
          />
          <NavButton
            active={activeTab === 'sports'}
            onClick={() => setActiveTab('sports')}
            icon={<Trophy size={24} />}
            label="Sports"
          />
          <NavButton
            active={activeTab === 'search'}
            onClick={() => setActiveTab('search')}
            icon={<Search size={24} />}
            label="Search"
          />
          <NavButton
            active={activeTab === 'bonuses'}
            onClick={() => setActiveTab('bonuses')}
            icon={<Gift size={24} />}
            label="Bonuses"
          />
          <NavButton
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            icon={<User size={24} />}
            label="Profile"
          />
        </nav>
      </div>
    </BetSlipProvider>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors duration-200",
        active ? "text-primary" : "text-zinc-500 hover:text-zinc-300"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default App;
