import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Admin client to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { github_handle, repo_url, tests_passed, total_tests } = body;

    // 1. Find the active attempt for this user (most recent 'pending')
    const { data: activeAttempt } = await supabase
      .from('submissions')
      .select('id, started_at')
      .eq('github_handle', github_handle)
      .eq('status', 'pending')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    let completionTime = null;

    // 2. Calculate duration if we have a start time
    if (activeAttempt && activeAttempt.started_at) {
      const start = new Date(activeAttempt.started_at).getTime();
      const end = new Date().getTime();
      completionTime = Math.floor((end - start) / 1000); // Seconds
    }

    // 3. Update OR Insert (Upsert logic)
    // If we found an attempt, update it. If not (maybe they started via CLI?), insert new.
    if (activeAttempt) {
      const { error } = await supabase
        .from('submissions')
        .update({
          repo_url,
          tests_passed,
          total_tests,
          completion_time_seconds: completionTime,
          status: 'completed',
          created_at: new Date().toISOString() // Mark completion time
        })
        .eq('id', activeAttempt.id);

      if (error) throw error;
    } else {
      // Fallback: Insert a new record if no start timer was found (prevents data loss)
      const { error } = await supabase.from('submissions').insert({
        github_handle,
        repo_url,
        tests_passed,
        total_tests,
        status: 'completed'
      });
      if (error) throw error;
    }

    return NextResponse.json({ status: 'verified', time: completionTime });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
