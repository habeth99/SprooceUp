'use client';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuClick: (view: string) => void;
}

export default function SideMenu({ isOpen, onClose, onMenuClick }: SideMenuProps) {
  return (
    <div 
      className={`fixed top-0 left-0 h-full w-80 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ backgroundColor: 'var(--secondary-color)' }}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-6">
        <div className="mb-8 pt-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-color)' }}>
            Example User
          </h2>
        </div>

        <div className="space-y-2">
          {[
            { label: 'Account Settings', view: 'accountSettings' },
            { label: 'Home', view: 'main' },
            { label: 'Payment', view: 'payments' },
            { label: 'Vehicles', view: 'vehicles' }
          ].map((item, index) => (
            <div key={item.view}>
              {index === 1 && <div className="border-t border-gray-200 my-4" />}
              <button 
                key={item.view}
                className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 font-medium"
                style={{ color: 'var(--text-color)' }}
                onClick={() => onMenuClick(item.view)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}