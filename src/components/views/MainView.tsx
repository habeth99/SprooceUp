'use client';

interface MainViewProps {
  onSelectWash: () => void;
}

export default function MainView({ onSelectWash }: MainViewProps) {
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-8xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-color)' }}>
          At a Sprooce location?
        </h2>
        <p className="text-gray-600 mb-6">
          Look for a sign and scan the QR code or search a location to begin.
        </p>
        
        <div className="flex mb-8 rounded-lg overflow-hidden border border-gray-300">
          <input
            type="text"
            placeholder="Search locations..."
            className="flex-grow px-4 py-3 outline-none"
          />
          <button 
            className="text-white px-6 py-3 rounded-lg" 
            style={{ backgroundColor: 'var(--primary-color)' }}
            onClick={onSelectWash}
          >
            Search
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-color)' }}>Recent Visits</h2>
        <div className="border-t border-gray-200">
          <div className="py-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="text-var(--text-color) font-medium text-lg">Downtown Sprooce</p>
                <p className="text-gray-500">
                  <span style={{ color: 'var(--primary-color)' }}>Tesla Model 3</span> • ABC123
                </p>
                <p className="text-gray-500">Dec 15, 2023</p>
                <p className="text-gray-500">Premium Wash</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold mb-2">$24.99</p>
                <button className="text-var(--primary-color) hover:underline text-sm">
                  Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}