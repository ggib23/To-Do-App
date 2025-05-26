// Server-side API route for tasks management
// This route handles GET, POST, PUT, and DELETE requests for tasks.

// Using the Supabase server client to interact with the PostgREST API
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    // Fetch data from supabase postgrest
    const supabase = await createClient();
    const { data, error } = await supabase.from('tasks').select('*');

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
      });
    } else {
      console.log("Fetched tasks:", data);
      return new Response(JSON.stringify(data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
      });
    }
}
 
export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  // Insert data from supabase postgrest
  const supabase = await createClient();
  const { data, error } = await supabase.from('tasks').insert([body]).select();

  if (error) {
    console.error("Error creating task:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  } else {
    console.log("Created task:", data);
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { id } = body;
  // Update data from supabase postgrest
  const supabase = await createClient();
  const { data, error } = await supabase.from('tasks').update([body]).eq('id', id).select();

  if (error) {
    console.error("Error updating task:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  } else {
    console.log("Updated task:", data);
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { id } = body;
  // Update data from supabase postgrest
  const supabase = await createClient();
  const { data, error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    console.error("Error deletinig task:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  } else {
    console.log("Delete task:", data);
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}
