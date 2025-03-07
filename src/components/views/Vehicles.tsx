'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AddVehicle from './AddVehicle';

interface Vehicle {
  license_plate: string;
  state: string;
  nickname: string;
}

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);

  const fetchVehicles = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('vehicles')
        .select('license_plate, state, nickname')
        .eq('user_id', user.id);
      
      if (data) {
        setVehicles(data);
      }
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (isAddingVehicle) {
    return <AddVehicle onComplete={() => {
      setIsAddingVehicle(false);
      fetchVehicles();
    }} />;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-8xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-color)' }}>
          Stored Vehicles
        </h2>
        {vehicles.map((vehicle, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg font-medium">
              {vehicle.nickname} - {vehicle.license_plate} - {vehicle.state}
            </p>
          </div>
        ))}
        <button 
          className="text-white px-4 py-2 rounded-lg" 
          style={{ backgroundColor: 'var(--primary-color)' }}
          onClick={() => setIsAddingVehicle(true)}
        >
          Add Vehicle
        </button>
      </div>
    </div>
  );
}