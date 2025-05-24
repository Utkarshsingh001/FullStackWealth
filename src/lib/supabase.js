import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to convert cents to currency amount
export const fromCents = (cents) => {
  return cents ? cents / 100 : 0;
};

// Helper function to convert currency amount to cents
export const toCents = (amount) => {
  return Math.round((amount || 0) * 100);
};

// Helper function to handle errors
export const handleError = (error) => {
  console.error('Error:', error.message);
  throw new Error(error.message);
};