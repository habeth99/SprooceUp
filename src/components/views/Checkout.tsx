'use client';
import { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
        Payment Details
      </h2>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button 
          className="w-full text-white py-3 rounded-lg mt-6" 
          style={{ backgroundColor: 'var(--primary-color)' }}
          disabled={!stripe || processing}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default function Checkout({ total }: { total: number }) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [total]);

  return (
    <div className="flex justify-center p-4">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm amount={total} />
        </Elements>
      )}
    </div>
  );
}