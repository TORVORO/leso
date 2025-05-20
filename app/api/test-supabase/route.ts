// File: app/api/test-supabase/route.ts
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Attempt to select from 'storage.objects'.
    // This table should exist in a Supabase project.
    // RLS (Row Level Security) might restrict access for the anon key,
    // but the attempt itself tests the connection and authentication with the anon key.
    const { data, error } = await supabase
      .from('objects') // This refers to the 'objects' table in the 'storage' schema
      .select('name')
      .eq('bucket_id', 'this_is_a_test_and_should_not_match_anything') // Ensures we get 0 rows
      .limit(1);

    if (error) {
      // If an error object is returned by supabase-js, it means the request likely reached
      // the Supabase backend, and the backend responded (even if it's an error like RLS denial).
      // This still implies the base URL and anon key are working for initial contact.
      // A critical failure (e.g., network error, wrong URL) would more likely be caught by the outer catch block.
      console.warn(
        'Supabase connection test encountered an error from Supabase:',
        error
      );
      return NextResponse.json(
        {
          message:
            'Supabase connection test complete. Supabase returned an error (this might be expected, e.g., RLS).',
          errorDetails: {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
          },
          data: data,
        },
        { status: 200 }
      ); // Return 200 to indicate API route itself worked.
    }

    // If no error, the query was successful.
    return NextResponse.json({
      message:
        'Supabase connection successful (queried storage.objects and received no error).',
      data: data,
    });
  } catch (e: any) {
    // This catch block would typically handle more critical errors,
    // like if the supabaseUrl is wrong, network issues, or issues within this GET handler itself.
    console.error('Supabase connection test critical error (in API route):', e);
    return NextResponse.json(
      {
        error: 'Supabase connection failed critically in API route',
        details: e.message,
      },
      { status: 500 }
    );
  }
}
