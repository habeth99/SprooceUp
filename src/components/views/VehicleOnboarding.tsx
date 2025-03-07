'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface VehicleOnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function VehicleOnboarding({ onComplete, onSkip }: VehicleOnboardingProps) {
  const [nickname, setNickname] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [state, setState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error: vehicleError } = await supabase
        .from('vehicles')
        .insert([
          {
            user_id: user.id,
            nickname,
            license_plate: licensePlate,
            state: state
          }
        ]);

      if (vehicleError) throw vehicleError;
      onComplete();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving vehicle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Add Your Vehicle
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-gray-700 mb-2">Vehicle Nickname</label>
              <input 
                type="text" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="e.g. My Tesla"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">License Plate</label>
              <input 
                type="text" 
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">State</label>
              <input 
                type="text" 
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="e.g. CA"
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