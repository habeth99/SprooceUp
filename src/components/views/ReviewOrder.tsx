'use client';

interface ReviewOrderProps {
  selectedWash: string;
  selectedTip: number;
  onTipChange: (tip: number) => void;
  carInfo?: {
    nickname?: string;
    license_plate: string;
    state: string;
  };
  parkingInfo?: {
    garageFloor: string;
    parkingSpace: string;
    returnTime: string;
  };
}

export default function ReviewOrder({ 
  selectedWash, 
  selectedTip, 
  onTipChange,
  carInfo,
  parkingInfo 
}: ReviewOrderProps) {
  const basePrice = selectedWash === 'car' ? 20 : selectedWash === 'midSuv' ? 25 : 30;
  const total = basePrice * (1 + selectedTip / 100);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Review Order
        </h2>
        
        <div className="space-y-6 mb-8">
          {/* Vehicle Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-3">Vehicle Information</h3>
            {carInfo && (
              <div className="space-y-2">
                {carInfo.nickname && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nickname</span>
                    <span className="font-medium">{carInfo.nickname}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">License Plate</span>
                  <span className="font-medium">{carInfo.license_plate} ({carInfo.state})</span>
                </div>
              </div>
            )}
          </div>

          {/* Parking Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-3">Parking Information</h3>
            {parkingInfo && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Garage Floor</span>
                  <span className="font-medium">{parkingInfo.garageFloor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parking Space</span>
                  <span className="font-medium">{parkingInfo.parkingSpace}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Time</span>
                  <span className="font-medium">{parkingInfo.returnTime}</span>
                </div>
              </div>
            )}
          </div>

          {/* Wash Type and Price */}
          <div className="border-b pb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Wash Type</span>
              <span className="font-medium">
                {selectedWash === 'car' ? 'Car' : selectedWash === 'midSuv' ? 'Mid Size SUV' : 'Full Size SUV'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price</span>
              <span className="font-medium">${basePrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Tip Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Add Tip</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[0, 10, 15, 20].map((tip) => (
                <button
                  key={tip}
                  className={`py-2 px-4 rounded-lg border ${
                    selectedTip === tip ? 'border-2' : 'border'
                  }`}
                  style={{ 
                    borderColor: selectedTip === tip ? 'var(--primary-color)' : '#e5e7eb',
                    backgroundColor: selectedTip === tip ? '#f3f4f6' : 'white'
                  }}
                  onClick={() => onTipChange(tip)}
                >
                  {tip === 0 ? 'No Tip' : `${tip}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <button 
          className="w-full text-white py-3 rounded-lg" 
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}