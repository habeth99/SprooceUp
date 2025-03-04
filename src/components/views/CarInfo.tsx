'use client';

interface CarInfoProps {
  onNext: () => void;
}

export default function CarInfo({ onNext }: CarInfoProps) {
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Car Information
        </h2>
        
        <div className="space-y-4 mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">License Plate</label>
            <input 
              type="text" 
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Enter license plate"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">State</label>
            <input 
              type="text" 
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Enter state"
            />
          </div>
        </div>
        
        <button 
          className="w-full text-white py-3 rounded-lg" 
          style={{ backgroundColor: 'var(--primary-color)' }}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}