
alter table public.submissions 
add column started_at timestamp with time zone,
add column status text default 'pending';

