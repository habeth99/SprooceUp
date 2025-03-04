'use client';
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import SideMenu from "@/components/layout/SideMenu";
import MainView from "@/components/views/MainView";
import WashSelect from "@/components/views/WashSelect";
import CarInfo from "@/components/views/CarInfo";
import ReviewOrder from "@/components/views/ReviewOrder";
import AccountSettings from "@/components/views/AccountSettings";
import Payments from "@/components/views/Payments";
import Vehicles from "@/components/views/Vehicles";
import SignIn from "@/components/views/SignIn";
import UserOnboarding from "@/components/views/UserOnboarding";
import OnboardPayment from "@/components/views/OnboardPayment";
import { supabase } from "@/lib/supabase";

interface MenuItem {
  label: string;
  view: string;
}

const menuItems: MenuItem[] = [
  { label: 'Account Settings', view: 'accountSettings' },
  { label: 'Home', view: 'main' },
  { label: 'Payment', view: 'payments' },
  { label: 'Vehicles', view: 'vehicles' }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('signIn');
  const [selectedWash, setSelectedWash] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState<number>(0);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user has completed profile setup
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .single();

        if (!profile?.first_name || !profile?.last_name) {
          setIsNewUser(true);
          setCurrentView('onboarding');
        } else {
          setCurrentView('main');
        }
      }
    };

    checkSession();
  }, []);

  const handleMenuClick = (view: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'main':
        return <MainView onSelectWash={() => setCurrentView('selectWash')} />;
      case 'selectWash':
        return (
          <WashSelect 
            selectedWash={selectedWash}
            onWashSelect={setSelectedWash}
            onNext={() => setCurrentView('carInfo')}
          />
        );
      case 'carInfo':
        return <CarInfo onNext={() => setCurrentView('reviewOrder')} />;
      case 'reviewOrder':
        return (
          <ReviewOrder 
            selectedWash={selectedWash || ''}
            selectedTip={selectedTip}
            onTipChange={setSelectedTip}
          />
        );
      case 'accountSettings':
        return <AccountSettings />;
      case 'payments':
        return <Payments />;
      case 'vehicles':
        return <Vehicles />;
      case 'signIn':
        return <SignIn onSuccess={() => setCurrentView('main')} />;
      case 'onboarding':
        return <UserOnboarding onComplete={() => {
          setIsNewUser(false);
          setCurrentView('onboardPayment');
        }} />;
      case 'onboardPayment':
        return <OnboardPayment 
          onComplete={() => setCurrentView('main')}
          onSkip={() => setCurrentView('main')}
        />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-var(--secondary-color) relative">
      {currentView !== 'signIn' && !isNewUser && (
        <>
          <Header onMenuOpen={() => setIsMenuOpen(true)} />
          <SideMenu 
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onMenuClick={handleMenuClick}
          />
        </>
      )}
      {renderView()}
    </main>
  );
}
