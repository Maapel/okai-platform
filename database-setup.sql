-- OkAI Season 0 Database Setup
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/OkAI-Season0/sql/new

-- 1. Users (Syncs with Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  username text,
  github_handle text,
  velocity_rating int default 1200,
  created_at timestamp with time zone default now()
);

-- 2. Submissions (The Scoreboard)
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  github_handle text,
  repo_url text,
  tests_passed int,
  total_tests int,
  completion_time_seconds int,
  created_at timestamp with time zone default now()
);

-- 3. Security (Allow public read for leaderboard, private write for admin)
alter table public.users enable row level security;
alter table public.submissions enable row level security;
create policy "Public Leaderboard" on public.submissions for select using (true);
create policy "Service Role Updates" on public.submissions for insert with check (true);
