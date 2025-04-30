import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Validate Supabase credentials
if (!supabaseUrl || supabaseUrl.trim() === '') {
  throw new Error('VITE_SUPABASE_URL is required and cannot be empty');
}

if (!supabaseKey || supabaseKey.trim() === '') {
  throw new Error('VITE_SUPABASE_ANON_KEY is required and cannot be empty');
}

// Client with anonymous key for public operations
export const supabase = createClient(supabaseUrl, supabaseKey);

// Client with service role key for admin operations (use with caution)
export const adminSupabase = serviceRoleKey ? createClient(supabaseUrl, serviceRoleKey) : null;

// Test connection
(async () => {
  try {
    const { data, error } = await supabase.from('services').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Supabase connection successful');
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
  }
})();