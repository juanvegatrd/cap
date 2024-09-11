import { supabase } from '@/utils/supabase';

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('supabase-user-id');

    if (!userId) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('userId', userId)  
      .order('created_at', { ascending: false });
    
    if (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get('supabase-user-id');
    
    
    if (!userId) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { name } = await request.json();

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ name , userId }])
      .select();
      
    
    if (!(error == null)) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
