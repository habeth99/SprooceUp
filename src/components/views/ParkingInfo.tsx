'use client';
import { useState } from 'react';

interface ParkingInfo {
  garageFloor: string;
  parkingSpace: string;
  returnTime: string;
}

interface ParkingInfoProps {
  onNext: (parkingInfo: ParkingInfo) => void;
}

export default function ParkingInfo({ onNext }: ParkingInfoProps) {
  const [garageFloor, setGarageFloor] = useState('');
  const [parkingSpace, setParkingSpace] = useState('');
  const [returnTime, setReturnTime] = useState('30mins');

  const returnTimeOptions = [
    { value: '30mins', label: '30 minutes' },
    { value: '1hr', label: '1 hour' },
    { value: '2hr', label: '2 hours' },
    { value: '3hr', label: '3 hours' },
  ];

  const handleNext = () => {
    if (garageFloor && parkingSpace) {
      onNext({
        garageFloor,
        parkingSpace,
        returnTime
      });
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Where is your vehicle parked?
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Garage Floor</label>
            <input 
              type="text"
              value={garageFloor}
              onChange={(e) => setGarageFloor(e.target.value)}
              placeholder="Enter garage floor number"
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Parking Space Number</label>
            <input 
              type="text"
              value={parkingSpace}
              onChange={(e) => setParkingSpace(e.target.value)}
              placeholder="Enter parking space number"
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              If there are no spot numbers, give us your best description using landmarks to help us find your car
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
              When will you return to your car?
            </h2>
            <select
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="appearance-none w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
              required
            >
              {returnTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button 
          className="w-full text-white py-3 rounded-lg" 
          style={{ backgroundColor: 'var(--primary-color)' }}
          onClick={handleNext}
          disabled={!garageFloor || !parkingSpace}
        >
          Next
        </button>
      </div>
    </div>
  );
}