import { createClient } from 'npm:@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Create profile pictures bucket
    await supabaseAdmin.storage.createBucket('profile-pictures', {
      public: false,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
      fileSizeLimit: 5242880, // 5MB
    });

    // Create certifications bucket
    await supabaseAdmin.storage.createBucket('certifications', {
      public: false,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
      fileSizeLimit: 10485760, // 10MB
    });

    // Create storage policies for profile pictures
    await supabaseAdmin.storage.from('profile-pictures').createPolicy({
      name: 'Authenticated users can upload profile pictures',
      definition: {
        role: 'authenticated',
        operation: 'INSERT',
        check: "auth.uid() = auth.uid()",
      },
    });

    await supabaseAdmin.storage.from('profile-pictures').createPolicy({
      name: 'Users can view their own profile pictures',
      definition: {
        role: 'authenticated',
        operation: 'SELECT',
        check: "auth.uid() = auth.uid()",
      },
    });

    // Create storage policies for certifications
    await supabaseAdmin.storage.from('certifications').createPolicy({
      name: 'Authenticated users can upload certifications',
      definition: {
        role: 'authenticated',
        operation: 'INSERT',
        check: "auth.uid() = auth.uid()",
      },
    });

    await supabaseAdmin.storage.from('certifications').createPolicy({
      name: 'Users can view their own certifications',
      definition: {
        role: 'authenticated',
        operation: 'SELECT',
        check: "auth.uid() = auth.uid()",
      },
    });

    return new Response(
      JSON.stringify({ message: 'Storage buckets and policies created successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});