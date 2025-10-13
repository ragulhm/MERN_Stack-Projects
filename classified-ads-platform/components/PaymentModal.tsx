import React, { useState } from 'react';
import type { Product } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, product, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsPaid(true);
    // Wait a bit on the success message before closing
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4 transform transition-all duration-300 scale-100 animate-slide-up">
        <div className="flex justify-between items-center border-b pb-3 mb-5">
          <h2 className="text-2xl font-bold text-primary">Complete Your Purchase</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light">&times;</button>
        </div>

        {isPaid ? (
          <div className="text-center py-10">
            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Payment Successful!</h3>
            <p className="text-gray-500 mt-2">Your order is confirmed.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Item:</span>
                <span className="truncate max-w-[200px]">{product.title}</span>
              </div>
              <div className="flex justify-between text-gray-800 font-bold text-xl mt-2">
                <span>Total:</span>
                <span>${product.price.toLocaleString()}</span>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-600">Cardholder Name</label>
                <input type="text" id="cardName" className="w-full mt-1 p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" placeholder="John M. Doe" required />
              </div>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-600">Card Number</label>
                <input type="text" id="cardNumber" className="w-full mt-1 p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" placeholder="0000 0000 0000 0000" required />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-600">Expiry</label>
                  <input type="text" id="expiry" className="w-full mt-1 p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" placeholder="MM/YY" required />
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-600">CVC</label>
                  <input type="text" id="cvc" className="w-full mt-1 p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" placeholder="123" required />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:opacity-80 transition-opacity text-lg disabled:bg-gray-300 disabled:cursor-wait"
                >
                  {isProcessing ? 'Processing...' : `Pay $${product.price.toLocaleString()}`}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default PaymentModal;