'use client';
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import SideMenu from "@/components/layout/SideMenu";
import MainView from "@/components/views/MainView";
import WashSelect from "@/components/views/WashSelect";
import CarInfo from "@/components/views/CarInfo";
import ReviewOrder from "@/components/views/ReviewOrder";
import AccountSettings from "@/components/views/AccountSettings";
import Vehicles from "@/components/views/Vehicles";
import SignIn from "@/components/views/SignIn";
import UserOnboarding from "@/components/views/UserOnboarding";
import VehicleOnboarding from "@/components/views/VehicleOnboarding";
import { supabase } from "@/lib/supabase";
import ParkingInfo from "@/components/views/ParkingInfo";

interface MenuItem {
  label: string;
  view: string;
}

const menuItems: MenuItem[] = [
  { label: 'Home', view: 'main' },
  { label: 'Vehicles', view: 'vehicles' },
  { label: 'Account Settings', view: 'accountSettings' }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('signIn');
  const [selectedWash, setSelectedWash] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState<number>(0);
  const [isNewUser, setIsNewUser] = useState(false);
  const [profile, setProfile] = useState<{ first_name: string; last_name: string } | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Get URL parameters first
      const params = new URLSearchParams(window.location.search);
      const startView = params.get('startView');

      // If QR code scan and user is signed in, go straight to wash select
      if (startView === 'selectWash' && session) {
        setCurrentView('selectWash');
        return;
      }

      // Otherwise, handle normal app flow
      if (!session) {
        setCurrentView('signIn');
        return;
      }

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
        setProfile(profile);
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
        return <CarInfo onNext={() => setCurrentView('parkingInfo')} />;
      case 'parkingInfo':
        return <ParkingInfo onNext={() => setCurrentView('reviewOrder')} />;
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
      case 'vehicles':
        return <Vehicles />;
      case 'signIn':
        return <SignIn onSuccess={() => setCurrentView('main')} />;
      case 'onboarding':
        return <UserOnboarding 
          onComplete={() => setCurrentView('vehicleOnboarding')}
          onSkip={() => setCurrentView('main')}
        />;
      case 'vehicleOnboarding':
        return <VehicleOnboarding 
          onComplete={() => setCurrentView('main')}
          onSkip={() => setCurrentView('main')}
        />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-var(--secondary-color) relative">
      {currentView !== 'signIn' && (
        <>
          <Header onMenuOpen={() => setIsMenuOpen(true)} />
          <SideMenu 
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onMenuClick={handleMenuClick}
            userProfile={profile}
          />
        </>
      )}
      {renderView()}
    </main>
  );
}
