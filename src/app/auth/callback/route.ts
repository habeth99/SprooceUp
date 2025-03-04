import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            return (await cookieStore).get(name)?.value
          },
          async set(name: string, value: string, options: any) {
            (await cookieStore).set(name, value, options)
          },
          async remove(name: string, options: any) {
            (await cookieStore).delete(name)
          },
        },
      }
    )

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw sessionError;
      }
      
      if (session) {
        // Check if user has a profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "not found" error
          console.error('Profile fetch error:', profileError);
          throw profileError;
        }

        if (!profile) {
          // Create an empty profile for the new user
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: session.user.id,
              email: session.user.email
            }])
            .select()
            .single();

            if (insertError) {
                console.error('Profile creation error details:', {
                  code: insertError.code,
                  message: insertError.message,
                  details: insertError.details,
                  hint: insertError.hint
                });
                throw insertError;
          }
        }
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      // Still redirect to avoid leaving user stranded
    }
  }

  return NextResponse.redirect(requestUrl.origin)
} 