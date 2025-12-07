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

    // Find the pending attempt for this user
    const { data: pendingAttempt, error: findError } = await supabase
      .from('submissions')
      .select('*')
      .eq('github_handle', github_handle)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (findError) {
      console.error('Error finding pending attempt:', findError);
      return NextResponse.json({ error: 'Failed to find attempt' }, { status: 500 });
    }

    if (!pendingAttempt) {
      console.log(`No pending attempt found for ${github_handle}`);
      return NextResponse.json({ error: 'No active challenge found for this user' }, { status: 404 });
    }

    // Calculate completion time
    const startedAt = new Date(pendingAttempt.started_at);
    const completedAt = new Date();
    const completionTimeSeconds = Math.floor((completedAt.getTime() - startedAt.getTime()) / 1000);

    console.log(`⏰ Completion time for ${github_handle}: ${completionTimeSeconds}s`);

    // Update the existing pending submission with results
    const { error: updateError } = await supabase
      .from('submissions')
      .update({
        repo_url,
        tests_passed,
        total_tests,
        completion_time_seconds: completionTimeSeconds,
        status: 'completed',
        created_at: completedAt.toISOString() // Override with actual completion time
      })
      .eq('id', pendingAttempt.id);

    if (updateError) {
      console.error('Error updating submission:', updateError);
      throw updateError;
    }

    return NextResponse.json({
      status: 'scouted',
      completionTime: completionTimeSeconds,
      vr: Math.floor((tests_passed / total_tests) * 1000 + (500 - (completionTimeSeconds / 10)))
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed to record score' }, { status: 500 });
  }
}
