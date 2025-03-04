'use client';

interface WashSelectProps {
  selectedWash: string | null;
  onWashSelect: (wash: string) => void;
  onNext: () => void;
}

export default function WashSelect({ selectedWash, onWashSelect, onNext }: WashSelectProps) {
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Select Vehicle Type
        </h2>
        
        <div className="space-y-4 mb-8">
          {[
            { type: 'car', label: 'Car', price: 20 },
            { type: 'midSuv', label: 'Mid Size SUV', price: 25 },
            { type: 'fullSuv', label: 'Full Size SUV', price: 30 }
          ].map(({ type, label, price }) => (
            <div 
              key={type}
              className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer ${
                selectedWash === type ? 'border-2' : 'border'
              }`}
              style={{ borderColor: selectedWash === type ? 'var(--primary-color)' : '#e5e7eb' }}
              onClick={() => onWashSelect(type)}
            >
              <span className="text-lg font-medium">{label}</span>
              <span className="text-xl font-semibold">${price}</span>
            </div>
          ))}
        </div>
        
        <button 
          className="w-full text-white py-3 rounded-lg" 
          style={{ backgroundColor: 'var(--primary-color)' }}
          onClick={onNext}
          disabled={!selectedWash}
        >
          Next
        </button>
      </div>
    </div>
  );
}