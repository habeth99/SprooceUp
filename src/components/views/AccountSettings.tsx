'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
}

export default function AccountSettings() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            email: user.email || ''
          });
        }
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Force a refresh after sign out
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-8xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-color)' }}>
          Account Settings
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input 
            type="text" 
            value={profile?.first_name || ''} 
            className="border border-gray-300 rounded-lg p-2 w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input 
            type="text" 
            value={profile?.last_name || ''} 
            className="border border-gray-300 rounded-lg p-2 w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            value={profile?.email || ''} 
            className="border border-gray-300 rounded-lg p-2 w-full"
            readOnly
          />
        </div>
        <button 
          className="text-white px-4 py-2 rounded-lg" 
          style={{ backgroundColor: 'var(--primary-color)' }}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}