import { supabase } from "@/utils/supabase";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = request.headers.get('supabase-user-id');
  
    if (!userId) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    
    const { id } = params;
    

    if (!id) {
      return new Response(JSON.stringify({ message: 'Task ID is required in the URL' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('userId', userId);

    
    if (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Task deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
