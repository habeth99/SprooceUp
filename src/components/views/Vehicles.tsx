'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Vehicle {
  license_plate: string;
  state: string;
}

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('vehicles')
          .select('license_plate, state')
          .eq('user_id', user.id);
        
        if (data) {
          setVehicles(data);
        }
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-8xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-color)' }}>
          Stored Vehicles
        </h2>
        {vehicles.map((vehicle, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg font-medium">
              {vehicle.license_plate} - {vehicle.state}
            </p>
          </div>
        ))}
        <button 
          className="text-white px-4 py-2 rounded-lg" 
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          Add Vehicle
        </button>
      </div>
    </div>
  );
}