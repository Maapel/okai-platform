import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin (Bypasses RLS to write scores)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { github_handle, repo_url, tests_passed, total_tests } = body;

    console.log(`📝 Score received for ${github_handle}: ${tests_passed}/${total_tests}`);

    const { error } = await supabase.from('submissions').insert({
      github_handle,
      repo_url,
      tests_passed,
      total_tests,
    });

    if (error) throw error;

    return NextResponse.json({ status: 'scouted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record score' }, { status: 500 });
  }
}
