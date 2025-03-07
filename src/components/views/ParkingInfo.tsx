'use client';
import { useState } from 'react';

interface ParkingInfo {
  garageFloor: string;
  parkingSpace: string;
  returnTime: string;
}

interface ParkingInfoProps {
  onNext: (parkingInfo: { garageFloor: string; parkingSpace: string; returnTime: string }) => void;
}

export default function ParkingInfo({ onNext }: ParkingInfoProps) {
  const [garageFloor, setGarageFloor] = useState('');
  const [parkingSpace, setParkingSpace] = useState('');
  const [startTime, setStartTime] = useState('13'); // Default to 1 PM
  const [endTime, setEndTime] = useState('14');   // Default to 2 PM

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return {
      value: String(hour).padStart(2, '0'),
      label: `${displayHour}:00 ${ampm}`
    };
  });

  const handleNext = () => {
    onNext({
      garageFloor,
      parkingSpace,
      returnTime: `${startTime}-${endTime}`,
    });
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Where is your vehicle parked?
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Parking Level or Lot Number</label>
            <input 
              type="text"
              value={garageFloor}
              onChange={(e) => setGarageFloor(e.target.value)}
              placeholder="Enter Parking level or Lot number"
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
              If there are no spot numbers, please provide the best description of your car using nearby landmarks to help us locate it easily 
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
              When do you expect to return to your vehicle?
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="appearance-none flex-1 p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
                required
              >
                {timeOptions.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>

              <span className="text-gray-500">to</span>

              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="appearance-none flex-1 p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
                required
              >
                {timeOptions.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              An estimate is fine. This just helps us optimize our scheduling
            </p>
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