# OkAI Testing Engine - Setup Guide

## 🎯 Complete Setup Instructions

### Step 1: Supabase Setup (15 minutes)
1. Go to https://supabase.com → "New Project" → Name: "OkAI-Season0"
2. Wait for project creation (may take 2-3 minutes)
3. Go to Settings → API and copy:
   - Project URL
   - Service role key (anon key is not sufficient)
4. Update your `.env.local` file with these values
5. Go to SQL Editor → Paste and run: `database-setup.sql` (contents provided below)
6. Verify tables exist in Table Editor

### Step 2: Deploy Command Center (10 minutes)
#### Option A: Vercel (Recommended)
```bash
npm i -g vercel
cd okai-platform
vercel --prod
# Copy the deployment URL (e.g., https://okai-platform.vercel.app)
```

#### Option B: Local with ngrok
```bash
npm install -g ngrok
cd okai-platform
npm run dev  # Runs on localhost:3000
# In new terminal: ngrok http 3000
# Copy the ngrok URL (e.g., https://1234.ngrok.io)
```

### Step 3: GitHub Challenge Repository (5 minutes)
```bash
cd ../okai-challenge-01
# Edit .github/workflows/score.yml and replace:
# YOUR-VERCEL-APP.vercel.app → your actual deployment URL
```

Push to GitHub:
- Create new public repo on GitHub
- Copy repo URL and run:
```bash
git remote add origin YOUR_REPO_URL
git branch -M main
git push -u origin main
```

### Step 4: Test the Loop (5 minutes)
1. Fork your challenge repository
2. Edit `index.js` in the forked repo (e.g., change `a + b` to `a - b`)
3. Commit and push the change
4. Check your Supabase dashboard → submissions table
5. **Magic**: You should see a new row with 0/1 score instantly!

## 📋 Database Setup SQL

```sql
-- Copy and paste this into Supabase SQL Editor
create table public.users (
  id uuid references auth.users not null primary key,
  username text,
  github_handle text,
  velocity_rating int default 1200,
  created_at timestamp with time zone default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  github_handle text,
  repo_url text,
  tests_passed int,
  total_tests int,
  completion_time_seconds int,
  created_at timestamp with time zone default now()
);

alter table public.users enable row level security;
alter table public.submissions enable row level security;
create policy "Public Leaderboard" on public.submissions for select using (true);
create policy "Service Role Updates" on public.submissions for insert with check (true);
```

## 🔍 Troubleshooting

- **Webhook not receiving scores?** Check Vercel/ngrok URL matches GitHub Action exactly
- **Supabase connection errors?** Verify service role key (not anon key) and environment variables
- **Tests not running in GitHub?** Ensure `jest` is in package.json and test script is correct

## 🚀 What's Next

You now have the MVP! Every code push to a forked challenge repository will automatically update your leaderboard. Add UI to the Next.js app to display submissions and you have a full platform.
