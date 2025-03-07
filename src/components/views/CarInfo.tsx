'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Vehicle {
  id: string;
  nickname: string;
  license_plate: string;
  state: string;
}

interface CarInfoProps {
  onNext: () => void;
}

export default function CarInfo({ onNext }: CarInfoProps) {
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showNewVehicleForm, setShowNewVehicleForm] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [licensePlate, setLicensePlate] = useState('');
  const [state, setState] = useState('');

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
              <label className="block text-gray-700 mb-2">License Plate</label>
              <input 
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">State</label>
              <input 
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <button 
              className="flex-1 text-white py-3 rounded-lg" 
              style={{ backgroundColor: 'var(--primary-color)' }}
              onClick={() => {
                fetchVehicles();
                setShowVehicleModal(true);
                setShowNewVehicleForm(false);
              }}
            >
              Select Saved Vehicle
            </button>
            
            <span className="text-gray-500 font-medium">or</span>
            
            <button 
              className="flex-1 text-white py-3 rounded-lg" 
              style={{ backgroundColor: 'var(--primary-color)' }}
              onClick={() => {
                setShowNewVehicleForm(true);
                setSelectedVehicle(null);
              }}
            >
              Enter New Vehicle
            </button>
          </div>

          <button 
            className="w-full text-white py-3 rounded-lg mt-6" 
            style={{ backgroundColor: 'var(--primary-color)' }}
            onClick={onNext}
          >
            Next
          </button>
        </div>

        {showVehicleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
                onClick={() => setShowVehicleModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}