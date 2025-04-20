
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { genresData } from '@/data/genres-data';

interface GenreSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const GenreSelect = ({ value, onChange }: GenreSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [effectTooltip, setEffectTooltip] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedGenre = genresData.find(genre => genre.label === value) || genresData[0];

  const handleSelectGenre = (genre: string) => {
    onChange(genre);
    setIsOpen(false);
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-full bg-gradient-to-r from-[#0f1e26] to-[#1a1625] border border-[#41FDFE]/20 rounded-xl px-6 py-3 text-left flex justify-between items-center group hover:shadow-[0_0_15px_rgba(65,253,254,0.2)] transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col space-y-1">
          <span className="text-lg font-medium bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">{selectedGenre.label}</span>
          <span className="text-sm text-[#41FDFE]/60">{selectedGenre.effect}</span>
        </div>
        <ChevronDown className={`h-6 w-6 text-[#41FDFE] transition-all duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:scale-110`} />
      </button>

      {isOpen && (
        <div className="dropdown-content max-h-60 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              className="w-full bg-[#0a1419] border border-[#1e3a44] rounded text-sm p-2 mb-2 focus:outline-none focus:border-[#41FDFE]"
              placeholder="Search genre..."
              autoFocus
            />
            {genresData.map((genre, index) => (
              <div
                key={index}
                className={`p-2 rounded hover:bg-gray-700 cursor-pointer transition-colors ${
                  genre.label === value ? 'bg-[#41FDFE]/10 text-[#41FDFE]' : ''
                }`}
                onClick={() => handleSelectGenre(genre.label)}
                onMouseEnter={() => setEffectTooltip(genre.effect)}
                onMouseLeave={() => setEffectTooltip('')}
              >
                <div className="flex flex-col">
                  <span>{genre.label}</span>
                  <span className="text-xs text-gray-400">{genre.effect}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {effectTooltip && !isOpen && (
        <div className="absolute left-0 right-0 bottom-full mb-2 p-2 bg-gray-800 rounded text-xs text-gray-300 z-10">
          {effectTooltip}
        </div>
      )}
    </div>
  );
};

export default GenreSelect;
