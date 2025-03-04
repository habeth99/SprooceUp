'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface OnboardPaymentProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardPayment({ onComplete, onSkip }: OnboardPaymentProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Get last 4 digits of card number
      const last_four = cardNumber.replace(/\s/g, '').slice(-4);
      
      // Determine card type (you might want to expand this logic)
      const card_type = cardNumber.startsWith('4') ? 'Visa' : 
                       cardNumber.startsWith('5') ? 'Mastercard' : 'Other';

      const { error } = await supabase
        .from('payment_methods')
        .insert([
          {
            user_id: user.id,
            card_type,
            last_four,
            expiry: expiryDate,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      onComplete();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving payment information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Add Payment Method
        </h2>
        <p className="text-gray-600 mb-6">
          Add a payment method now or skip for later
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-gray-700 mb-2">Card Number</label>
              <input 
                type="text" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Expiry Date</label>
                <input 
                  type="text" 
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">CVV</label>
                <input 
                  type="text" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-3 rounded-lg disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {isLoading ? 'Saving...' : 'Save Payment Method'}
            </button>
            
            <button 
              type="button"
              onClick={onSkip}
              className="w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Setup Later
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 