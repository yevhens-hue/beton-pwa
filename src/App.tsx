import { useState, useEffect } from 'react';
import HomeView from './pages/HomeView';
import SportsView from './pages/SportsView';
import ProfileView from './pages/ProfileView';
import LoginView from './pages/LoginView';
import BonusView from './pages/BonusView';
import { BetSlipProvider } from './context/BetSlipContext';
import { BetSlip } from './components/BetSlip';
import { NativeService } from './lib/native';
import { BottomNavBar } from './components/BottomNavBar';
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
      <div className="flex items-center justify-center h-screen bg-background text-zinc-500 p-8 text-center font-sans">
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
      <div className="flex flex-col h-screen bg-background text-white overflow-hidden max-w-md mx-auto border-x border-surface/20 shadow-2xl relative font-sans">
        <main className="flex-1 overflow-y-auto no-scrollbar relative pb-32">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'sports' && <SportsView />}
          {activeTab === 'search' && (
            <div className="flex items-center justify-center h-full text-zinc-500">
              Search functionality coming soon
            </div>
          )}
          {activeTab === 'bonuses' && (
            <BonusView />
          )}
          {activeTab === 'profile' && (
            <ProfileView isDepositOpen={isDepositOpen} setIsDepositOpen={setIsDepositOpen} />
          )}

          <BetSlip />
        </main>

        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </BetSlipProvider>
  );
}

export default App;
