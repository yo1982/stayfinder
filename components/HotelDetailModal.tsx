import React, { useEffect, useState } from 'react';
import { Hotel } from '../types';
import { StarIcon, LocationPinIcon, XIcon } from './icons';

interface HotelDetailModalProps {
  hotel: Hotel;
  onClose: () => void;
  onBook: (hotel: Hotel) => void;
  isBooked: boolean;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({ hotel, onClose, onBook, isBooked }) => {
  const [justBooked, setJustBooked] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBook = () => {
    if (!isBooked) {
      onBook(hotel);
      setJustBooked(true);
    }
  }

  const AmenityChip: React.FC<{ amenity: string }> = ({ amenity }) => (
    <span className="bg-brand-secondary/10 text-brand-secondary text-sm font-medium px-3 py-1 rounded-full">
      {amenity}
    </span>
  );

  const booked = isBooked || justBooked;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-64 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
            aria-label="Close hotel details"
          >
            <XIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="p-6 sm:p-8 flex-grow overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
            <h2 className="text-3xl font-bold text-gray-900">{hotel.name}</h2>
            <div className="flex items-center gap-4 text-lg shrink-0">
               <div className="flex items-center gap-1.5 font-semibold">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <span>{hotel.rating.toFixed(1)}</span>
              </div>
              <div className="font-bold text-gray-800">
                ${hotel.pricePerNight} <span className="font-normal text-gray-600 text-base">/ night</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <LocationPinIcon className="h-5 w-5" />
            <span className="font-medium capitalize">{hotel.location}</span>
          </div>

          <p className="mt-6 text-gray-700 leading-relaxed">{hotel.description}</p>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {hotel.amenities.map(amenity => <AmenityChip key={amenity} amenity={amenity} />)}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <button 
            onClick={handleBook}
            disabled={booked}
            className={`w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200 text-lg ${
              booked 
                ? 'bg-brand-secondary cursor-not-allowed' 
                : 'bg-brand-primary hover:bg-brand-primary/90'
            }`}
          >
            {booked ? 'Added to Basket!' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
