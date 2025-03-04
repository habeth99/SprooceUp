'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SignInProps {
  onSuccess: () => void;
}

export default function SignIn({ onSuccess }: SignInProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckEmail, setShowCheckEmail] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true
        },
      });

      if (error) {
        console.error('SignIn error:', error);
        throw error;
      }

      setShowCheckEmail(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending magic link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showCheckEmail) {
    return (
      <div className="flex justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-color)' }}>
            Check your email
          </h2>
          <p className="text-gray-600 mb-4">
            We've sent a magic link to {email}.<br />
            Click the link in the email to sign in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>
          Sign In
        </h2>
        
        <form onSubmit={handleSignIn}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full text-white py-3 rounded-lg disabled:opacity-50"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            {isLoading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      </div>
    </div>
  );
} 