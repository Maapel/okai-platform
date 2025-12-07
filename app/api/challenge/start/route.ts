import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Check if user already has an active attempt (started but not completed)
  const { data: activeAttempt } = await supabase
    .from('submissions')
    .select('*')
    .eq('github_handle', user.user_metadata.user_name)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (activeAttempt) {
    // Return existing attempt data
    return NextResponse.json({
      startTime: activeAttempt.started_at,
      repoUrl: 'https://github.com/Maapel/okai-challenge-01'
    });
  }

  // Create a new pending submission to start the clock
  const { data, error } = await supabase
    .from('submissions')
    .insert({
      github_handle: user.user_metadata.user_name,
      status: 'pending',
      started_at: new Date().toISOString(),
      tests_passed: 0,
      total_tests: 1, // Challenge has 1 main test
      repo_url: `https://github.com/${user.user_metadata.user_name}/okai-challenge-01` // They'll fork it
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating challenge attempt:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    startTime: data.started_at,
    repoUrl: 'https://github.com/Maapel/okai-challenge-01',
    attemptId: data.id
  });
}
