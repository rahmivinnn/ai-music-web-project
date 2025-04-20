
import { useState } from 'react';

interface StyleChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const StyleChip = ({ label, selected, onClick }: StyleChipProps) => {
  return (

    <button
      onClick={onClick}
      className={`
        px-5 py-2 rounded-full text-sm font-medium 
        transition-all duration-300 transform hover:scale-105
        border ${selected ? 'border-[#41FDFE]' : 'border-transparent'}
        ${selected
          ? 'bg-gradient-to-r from-[#41FDFE]/20 to-[#FF1CF7]/20 text-[#41FDFE] shadow-[0_0_15px_rgba(65,253,254,0.3)]'
          : 'bg-[#0a1419] text-gray-400 hover:bg-[#1e3a44] hover:text-[#41FDFE] hover:border-[#41FDFE]/50'
        }
      `}
    >
      {label}
    </button>
  );
};

export default StyleChip;
