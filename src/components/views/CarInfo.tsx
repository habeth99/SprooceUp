'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Vehicle, CarInfoProps } from '@/types';

export default function CarInfo({ onNext }: CarInfoProps) {
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showNewVehicleForm, setShowNewVehicleForm] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [nickname, setNickname] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [state, setState] = useState('');
  const [saveVehicle, setSaveVehicle] = useState(true);
  const [showInitialButtons, setShowInitialButtons] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fetchVehicles = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('vehicles')
        .select('*')
        .eq('user_id', user.id);
      
      if (data) {
        setVehicles(data);
      }
    }
  };

  const handleNext = async () => {
    if (selectedVehicle) {
      onNext({
        nickname: selectedVehicle.nickname,
        license_plate: selectedVehicle.license_plate,
        state: selectedVehicle.state
      });
    } else if (licensePlate && state) {
      if (saveVehicle) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { error } = await supabase
              .from('vehicles')
              .insert([{
                user_id: user.id,
                nickname: nickname || null,
                license_plate: licensePlate,
                state: state
              }]);

            if (error) throw error;
            setSaveStatus('success');
            
            setTimeout(() => {
              setSaveStatus('idle');
              onNext({
                nickname: nickname || undefined,
                license_plate: licensePlate,
                state: state
              });
            }, 1500);
            return;
          }
        } catch (error) {
          console.error('Error saving vehicle:', error);
          setSaveStatus('error');
          setTimeout(() => setSaveStatus('idle'), 3000);
          return;
        }
      }
      
      onNext({
        nickname: nickname || undefined,
        license_plate: licensePlate,
        state: state
      });
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          What vehicle will we be washing today?
        </h2>

        {selectedVehicle && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-medium">
              {selectedVehicle.nickname} - {selectedVehicle.license_plate} ({selectedVehicle.state})
            </p>
          </div>
        )}

        {showNewVehicleForm && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Nickname (Optional)</label>
              <input 
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="e.g. My Tesla"
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
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="saveVehicle"
                checked={saveVehicle}
                onChange={(e) => setSaveVehicle(e.target.checked)}
                className="h-4 w-4 rounded"
                style={{ accentColor: 'var(--primary-color)' }}
              />
              <label 
                htmlFor="saveVehicle" 
                style={{ color: 'var(--primary-color)' }}
              >
                Save this vehicle
              </label>
            </div>

            {saveStatus === 'error' && (
              <div className="text-red-600 text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Error saving vehicle. Please try again.
              </div>
            )}
          </div>
        )}
        
        {showInitialButtons && (
          <div className="space-y-4">
            <button 
              className="w-full text-white py-3 rounded-lg" 
              style={{ backgroundColor: 'var(--primary-color)' }}
              onClick={() => {
                fetchVehicles();
                setShowVehicleModal(true);
                setShowNewVehicleForm(false);
                setShowInitialButtons(false);
              }}
            >
              Select Saved Vehicle
            </button>
            
            <div className="flex justify-center">
              <span className="text-gray-500 font-medium">or</span>
            </div>
            
            <button 
              className="w-full text-white py-3 rounded-lg" 
              style={{ backgroundColor: 'var(--primary-color)' }}
              onClick={() => {
                setShowNewVehicleForm(true);
                setSelectedVehicle(null);
                setShowInitialButtons(false);
              }}
            >
              Enter New Vehicle
            </button>
          </div>
        )}

        {(selectedVehicle || (showNewVehicleForm)) && (
          <button 
            className="w-full text-white py-3 rounded-lg mt-6" 
            style={{ backgroundColor: 'var(--primary-color)' }}
            onClick={handleNext}
          >
            Next
          </button>
        )}

        {showVehicleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Select a Vehicle</h3>
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <label key={vehicle.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="vehicle"
                      checked={selectedVehicle?.id === vehicle.id}
                      onChange={() => {
                        setSelectedVehicle(vehicle);
                        setShowVehicleModal(false);
                      }}
                      className="form-radio h-4 w-4"
                    />
                    <span>{vehicle.nickname} - {vehicle.license_plate} ({vehicle.state})</span>
                  </label>
                ))}
              </div>
              <button
                className="w-full text-red-500 py-2 mt-4"
                onClick={() => {
                  setShowVehicleModal(false);
                  setShowInitialButtons(true);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {saveStatus === 'success' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                  Vehicle Saved!
                </h3>
                <p className="text-gray-600">
                  Your vehicle has been successfully saved to your account.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}