'use client';
import Image from "next/image";

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white relative z-30">
      <button 
        className="text-gray-500"
        style={{ color: 'var(--primary-color)' }}
        onClick={onMenuOpen}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-7 h-7"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
          />
        </svg>
      </button>

      <div className="flex items-center absolute left-1/2 -translate-x-1/2">
        <Image
          src="/largepinlogo.png"
          alt="Sprooce Logo"
          width={35}
          height={35}
        />
        <span className="text-2xl font-bold ml-2" style={{ color: 'var(--primary-color)' }}>
          Sprooce
        </span>
      </div>

      <div className="w-7"></div>
    </header>
  );
}