'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface UserOnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function UserOnboarding({ onComplete, onSkip }: UserOnboardingProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;
      onComplete();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Welcome! Let's get to know you
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-3 rounded-lg disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {isLoading ? 'Saving...' : 'Next'}
            </button>
            
            <button 
              type="button"
              onClick={onSkip}
              className="w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Setup Later
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 