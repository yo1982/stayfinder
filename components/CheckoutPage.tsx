import React from 'react';
import { Hotel } from '../types';
import { ShoppingCartIcon, XIcon } from './icons';

interface CheckoutPageProps {
  basket: Hotel[];
  onRemoveFromBasket: (hotelName: string) => void;
  onNavigateHome: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ basket, onRemoveFromBasket, onNavigateHome }) => {
  const subtotal = basket.reduce((acc, hotel) => acc + hotel.pricePerNight, 0);

  if (basket.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingCartIcon className="mx-auto h-24 w-24 text-gray-300" />
        <h1 className="mt-4 text-3xl font-bold text-gray-800">Your Basket is Empty</h1>
        <p className="mt-2 text-gray-500">Looks like you haven't added any hotels yet.</p>
        <button
          onClick={onNavigateHome}
          className="mt-6 bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200"
        >
          Find a Stay
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">Your Basket</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md divide-y divide-gray-200">
            {basket.map(hotel => (
              <div key={hotel.name} className="flex items-center gap-4 p-4">
                <img src={hotel.imageUrl} alt={hotel.name} className="w-32 h-24 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h2 className="font-semibold text-gray-800">{hotel.name}</h2>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${hotel.pricePerNight}</p>
                  <p className="text-sm text-gray-500">per night</p>
                </div>
                <button 
                    onClick={() => onRemoveFromBasket(hotel.name)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 ml-2"
                    aria-label={`Remove ${hotel.name} from basket`}
                >
                    <XIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 sticky top-28">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal ({basket.length} {basket.length === 1 ? 'item' : 'items'})</p>
                <p className="font-semibold">${subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p>Taxes & Fees</p>
                <p>Calculated at next step</p>
              </div>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
              <p>Estimated Total</p>
              <p>${subtotal.toLocaleString()}</p>
            </div>
            <button className="mt-6 w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200 text-lg">
                Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
