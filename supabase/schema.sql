-- FixIt: skema e parë (java 5)
-- Ekzekutoje në Supabase: SQL Editor → New query → ngjite këtë → Run.
-- Tabelat e tjera (profiles, services, availability, appointments, reviews,
-- favorites) shtohen kur të bëjmë autentikimin dhe rezervimet.

-- Kategoritë e shërbimeve
create table if not exists public.categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  sort_order int not null default 0
);

-- Ofruesit e shërbimeve
create table if not exists public.providers (
  id bigint generated always as identity primary key,
  business_name text not null check (char_length(business_name) between 2 and 80),
  category_id bigint not null references public.categories (id),
  city text not null check (char_length(city) between 2 and 40),
  starting_price numeric(8, 2) not null check (starting_price >= 0),
  rating numeric(2, 1) not null default 0 check (rating between 0 and 5),
  created_at timestamptz not null default now()
);

-- Row Level Security: pa politika, askush s'lexon e s'shkruan asgjë.
alter table public.categories enable row level security;
alter table public.providers enable row level security;

-- (drop ... if exists lejon që skripta të ekzekutohet sërish pa gabime)
drop policy if exists "Kategoritë lexohen nga të gjithë" on public.categories;
drop policy if exists "Ofruesit lexohen nga të gjithë" on public.providers;
drop policy if exists "Përkohësisht kushdo shton ofrues" on public.providers;

-- Të gjithë mund t'i lexojnë kategoritë dhe ofruesit.
create policy "Kategoritë lexohen nga të gjithë"
  on public.categories for select
  to anon, authenticated
  using (true);

create policy "Ofruesit lexohen nga të gjithë"
  on public.providers for select
  to anon, authenticated
  using (true);

-- PËRKOHËSISHT: kushdo mund të shtojë ofrues (s'kemi ende login).
-- Kur të shtojmë autentikimin, kjo zëvendësohet me "vetëm ofruesi i kyçur".
create policy "Përkohësisht kushdo shton ofrues"
  on public.providers for insert
  to anon, authenticated
  with check (rating = 0);

grant select on public.categories to anon, authenticated;
grant select, insert on public.providers to anon, authenticated;

-- Të dhënat fillestare
insert into public.categories (name, sort_order) values
  ('Berber & Frizer', 1),
  ('Sallon thonjsh', 2),
  ('Elektricist', 3),
  ('Hidraulik', 4),
  ('Klima & ngrohje', 5),
  ('Mekanik', 6),
  ('Lavazh', 7),
  ('Pastrim', 8),
  ('Riparim telefonash', 9)
on conflict (name) do nothing;

insert into public.providers (business_name, category_id, city, starting_price, rating)
select v.business_name, c.id, v.city, v.starting_price, v.rating
from (values
  ('Berberi Arti', 'Berber & Frizer', 'Prishtinë', 5, 4.8),
  ('Studio Bukuria', 'Berber & Frizer', 'Prishtinë', 10, 4.7),
  ('Nails by Era', 'Sallon thonjsh', 'Prishtinë', 15, 4.9),
  ('Elektro Dardania', 'Elektricist', 'Prishtinë', 15, 4.6),
  ('Hidro Servis', 'Hidraulik', 'Fushë Kosovë', 20, 4.5),
  ('Klima Ekspert', 'Klima & ngrohje', 'Prishtinë', 25, 4.6),
  ('Auto Servisi Besa', 'Mekanik', 'Prizren', 25, 4.9),
  ('Lavazhi Shpejt', 'Lavazh', 'Prishtinë', 4, 4.4),
  ('Pastrimi Shkëlqim', 'Pastrim', 'Pejë', 30, 4.4),
  ('Phone Fix', 'Riparim telefonash', 'Gjilan', 10, 4.7)
) as v(business_name, category_name, city, starting_price, rating)
join public.categories c on c.name = v.category_name
where not exists (select 1 from public.providers p where p.business_name = v.business_name);
