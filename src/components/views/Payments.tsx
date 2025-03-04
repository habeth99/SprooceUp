'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface PaymentMethod {
  id: string;
  last_four: string;
  expiry: string;
  card_type: string;
}

export default function Payments() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('payment_methods')
          .select('*')
          .eq('user_id', user.id);
        
        if (data) {
          setPaymentMethods(data);
        }
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-8xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-color)' }}>
          Stored Payments
        </h2>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div key={method.id} className="mb-4">
              <p className="text-lg font-medium">
                {method.card_type} **** {method.last_four}
              </p>
              <p className="text-gray-500">Expires: {method.expiry}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mb-4">No payment methods found</p>
        )}
        <button 
          className="text-white px-4 py-2 rounded-lg" 
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          Add Payment
        </button>
      </div>
    </div>
  );
}