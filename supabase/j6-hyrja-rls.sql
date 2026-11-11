-- Shablloni i javës 6 për tabelën e ekipit (karta e studentit, hapat A, C).
-- Vazhdon tabelën providers të shabllonit të javës 5.
-- Ndërroni emrin e tabelës dhe email-in. Pjesa A në fillim të orës;
-- pjesa C pasi të dyja llogaritë janë krijuar nga aplikacioni (hapi B).
-- "if exists" / "if not exists" lejojnë Run sërish pas një gabimi.

-- #region fshi-zhvillim
-- A · Dera mbyllet: policy-të e javës 5 fshihen, anon s'ka më qasje.
drop policy if exists "Kategoritë lexohen nga të gjithë" on public.categories;
drop policy if exists "Ofruesit lexohen nga të gjithë" on public.providers;
drop policy if exists "Përkohësisht kushdo shton ofrues" on public.providers;

revoke all on public.categories from anon;
revoke all on public.providers from anon;

-- RLS ishte i ndezur nga java 5; këto rreshta vetëm e sigurojnë.
alter table public.categories enable row level security;
alter table public.providers enable row level security;
-- #endregion

-- #region pronari
-- C1 · Pronari i çdo rreshti: llogaria që e krijoi (default auth.uid()).
alter table public.providers
  add column if not exists pronari_id uuid default auth.uid()
  references auth.users (id) on delete cascade;
update public.providers
  set pronari_id = (
    select id from auth.users where email = 'albatrit@fixit.test')
  where pronari_id is null;
alter table public.providers alter column pronari_id set not null;
create index if not exists providers_pronari_idx
  on public.providers (pronari_id);
-- #endregion

-- #region qasja
-- C2 · Qasja dhe rregullat për përdoruesin e kyçur.
grant select, insert, update on public.providers to authenticated;
create policy "secili lexon të vetat"
  on public.providers for select to authenticated
  using (pronari_id = (select auth.uid()));
create policy "secili shton vetëm për vete"
  on public.providers for insert to authenticated
  with check (pronari_id = (select auth.uid()));
create policy "secili ndryshon të vetat"
  on public.providers for update to authenticated
  using (pronari_id = (select auth.uid()))
  with check (pronari_id = (select auth.uid()));
grant select on public.categories to authenticated;
create policy "të kyçurit lexojnë kategoritë"
  on public.categories for select to authenticated
  using (true);
-- #endregion
