'use client';
import { useState } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import Image from 'next/image';

interface MainViewProps {
  onSelectWash: () => void;
}

export default function MainView({ onSelectWash }: MainViewProps) {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-8xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-3">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-color)' }}>
            At a Sprooce location?
          </h2>
          <Image 
            src="/pinlogowcar.png"
            alt="Sprooce Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        
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

        <h2 className="text-xl font-semibold mt-6 mb-2" style={{ color: 'var(--text-color)' }}>Help</h2>
        <button 
          onClick={() => setShowHelpModal(true)}
          className="text-gray-700 flex items-center gap-1"
        >
          How does this work?
          <IoInformationCircleOutline className="w-4 h-4" />
        </button>

        {showHelpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-color)' }}>
                How Sprooce works
              </h3>
              <p className="text-gray-600 mb-6">
                Sprooce is a contactless car wash service. Simply scan a QR code at any Sprooce location,
                enter your parking spot details, and our team will take care of your vehicle while you're away.
                We'll notify you when your car is ready!
              </p>
              <button
                className="w-full text-white py-2 rounded-lg"
                style={{ backgroundColor: 'var(--primary-color)' }}
                onClick={() => setShowHelpModal(false)}
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}