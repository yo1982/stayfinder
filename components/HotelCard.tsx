
import React from 'react';
import { Hotel } from '../types';
import { StarIcon } from './icons';

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect }) => {
  return (
    <div 
      className="group cursor-pointer flex flex-col"
      onClick={() => onSelect(hotel)}
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3">
        <img 
          src={hotel.imageUrl} 
          alt={`View of ${hotel.name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 pr-2 flex-1">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-sm shrink-0">
          <StarIcon className="h-4 w-4 text-yellow-500" />
          <span>{hotel.rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 capitalize">{hotel.location}</p>
      <p className="mt-1 text-sm">
        <span className="font-semibold text-gray-800">${hotel.pricePerNight}</span>
        <span className="text-gray-600"> night</span>
      </p>
    </div>
  );
};
