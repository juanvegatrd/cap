import { supabase } from '@/utils/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const response = NextResponse.next();
  
  response.headers.set('supabase-user-id', user.id); 

  return response;
}

export const config = {
  matcher: ['/api/tasks/:path*'], 
};
