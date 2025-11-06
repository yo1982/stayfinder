import React, { useState } from 'react';
import { SearchIcon, LocationPinIcon, CalendarIcon, CurrencyDollarIcon } from './icons';
import type { SearchFilters } from '../types';

interface FilterBarProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

const countries = ["United States", "Canada", "United Kingdom", "France", "Germany", "Japan", "Australia", "Brazil", "Spain", "Italy"];

export const FilterBar: React.FC<FilterBarProps> = ({ onSearch, isLoading }) => {
  const [country, setCountry] = useState(countries[0]);
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ country, city, checkIn, checkOut, priceMin, priceMax });
  };

  const InputWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>{children}</div>
  );

  const Label: React.FC<{ htmlFor: string, children: React.ReactNode, icon?: React.ReactNode }> = ({ htmlFor, children, icon }) => (
    <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-semibold text-gray-600">
      {icon}
      {children}
    </label>
  );

  const commonInputStyles = "w-full p-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-4 items-end">
        
        <InputWrapper className="lg:col-span-2">
          <Label htmlFor="country" icon={<LocationPinIcon className="w-4 h-4" />}>Country</Label>
          <select id="country" value={country} onChange={e => setCountry(e.target.value)} className={commonInputStyles} disabled={isLoading}>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </InputWrapper>

        <InputWrapper className="lg:col-span-2">
           <Label htmlFor="city">City</Label>
           <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g., New York" className={commonInputStyles} disabled={isLoading} />
        </InputWrapper>
        
        <InputWrapper className="lg:col-span-2">
          <Label htmlFor="checkin" icon={<CalendarIcon className="w-4 h-4" />}>Check-in</Label>
          <input type="date" id="checkin" value={checkIn} onChange={e => setCheckIn(e.target.value)} className={commonInputStyles} disabled={isLoading} />
        </InputWrapper>
        
        <InputWrapper className="lg:col-span-2">
          <Label htmlFor="checkout" icon={<CalendarIcon className="w-4 h-4" />}>Check-out</Label>
          <input type="date" id="checkout" value={checkOut} onChange={e => setCheckOut(e.target.value)} className={commonInputStyles} disabled={isLoading} />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="pricemin" icon={<CurrencyDollarIcon className="w-4 h-4" />}>Min Price</Label>
          <input type="number" id="pricemin" value={priceMin} onChange={e => setPriceMin(e.target.value)} placeholder="Any" className={commonInputStyles} disabled={isLoading} />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="pricemax">Max Price</Label>
          <input type="number" id="pricemax" value={priceMax} onChange={e => setPriceMax(e.target.value)} placeholder="Any" className={commonInputStyles} disabled={isLoading} />
        </InputWrapper>

        <div className="sm:col-span-2 lg:col-span-10">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 text-lg"
            aria-label="Search"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <SearchIcon className="h-5 w-5" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};