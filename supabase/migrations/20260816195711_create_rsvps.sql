create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(trim(guest_name)) > 0),
  attending boolean not null,
  bringing_plus_one boolean not null default false,
  plus_one_name text,
  message text,
  created_at timestamptz not null default now(),
  constraint rsvps_plus_one_only_when_attending
    check (attending or bringing_plus_one = false),
  constraint rsvps_plus_one_name_required
    check (
      not (attending and bringing_plus_one)
      or nullif(trim(coalesce(plus_one_name, '')), '') is not null
    )
);

alter table public.rsvps enable row level security;

drop policy if exists "Public RSVP inserts" on public.rsvps;

create policy "Public RSVP inserts"
  on public.rsvps
  for insert
  to anon
  with check (true);

grant usage on schema public to anon;
grant insert on table public.rsvps to anon;
