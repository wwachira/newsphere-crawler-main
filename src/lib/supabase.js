
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ordpekwaprhozufhahla.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZHBla3dhcHJob3p1ZmhhaGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMzk0MjcsImV4cCI6MjA1ODgxNTQyN30.hRLeQ6ZQx7N02V9H9P3E9pVK6-cuBeA48HGrztkRo5o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user, error };
};
