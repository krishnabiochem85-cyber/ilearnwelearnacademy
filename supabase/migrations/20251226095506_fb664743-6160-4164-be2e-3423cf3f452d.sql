-- Create roles enum and user_roles table
create type public.app_role as enum ('admin', 'staff');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  );
$$;

create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins can manage all roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Shared updated_at trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Ongoing classes
create table public.ongoing_classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level text,
  instructor text,
  start_date date,
  end_date date,
  schedule text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ongoing_classes enable row level security;

create trigger set_ongoing_classes_updated_at
before update on public.ongoing_classes
for each row
execute function public.set_updated_at();

create policy "Admins full access ongoing_classes"
on public.ongoing_classes
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Staff can view ongoing_classes"
on public.ongoing_classes
for select
to authenticated
using (public.has_role(auth.uid(), 'staff') or public.has_role(auth.uid(), 'admin'));

-- Upcoming events
create table public.upcoming_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz,
  location text,
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.upcoming_events enable row level security;

create trigger set_upcoming_events_updated_at
before update on public.upcoming_events
for each row
execute function public.set_updated_at();

create policy "Admins full access upcoming_events"
on public.upcoming_events
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Staff can view upcoming_events"
on public.upcoming_events
for select
to authenticated
using (public.has_role(auth.uid(), 'staff') or public.has_role(auth.uid(), 'admin'));

-- Achievements
create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  student_name text,
  description text,
  achievement_date date,
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.achievements enable row level security;

create trigger set_achievements_updated_at
before update on public.achievements
for each row
execute function public.set_updated_at();

create policy "Admins full access achievements"
on public.achievements
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Staff can view achievements"
on public.achievements
for select
to authenticated
using (public.has_role(auth.uid(), 'staff') or public.has_role(auth.uid(), 'admin'));
