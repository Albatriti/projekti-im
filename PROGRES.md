# PROGRES: java 5 (04.11.2026)

## Misionet

| Misioni | Statusi | Ku |
|---|---|---|
| **M0:** AGENTS.md me idenë e projektit | ✅ | [AGENTS.md](AGENTS.md) |
| **M1:** aplikacioni lexon nga Supabase dhe e shfaq në telefon | ✅ _[konfirmo në telefon]_ | Kreu lexon `categories` dhe `providers` |
| **M2:** përdoruesi shton diçka nga telefoni dhe ruhet | ✅ _[konfirmo në telefon]_ | Ekrani "Shto ofrues" (`+ Shto` lart djathtas) |
| **M3:** ekrani kryesor i HARTA-s me të dhëna reale | ✅ _[konfirmo në telefon]_ | Kreu: kategoritë, kërkimi dhe filtri punojnë mbi të dhënat nga databaza |

## Çka punon

- **Kreu** ngarkon kategoritë dhe ofruesit nga Supabase. Shfaq një rreth ngarkimi gjatë pritjes dhe një mesazh të qartë nëse lidhja dështon. Lista rifreskohet duke e tërhequr poshtë.
- **Kërkimi** me emër dhe **filtri** sipas kategorisë punojnë mbi të dhënat reale.
- **Shto ofrues:** forma me emrin, kategorinë (nga databaza), qytetin dhe çmimin. Fushat kontrollohen para ruajtjes. Pas ruajtjes, ofruesi i ri shfaqet menjëherë te Kreu.
- **Siguria:** Row Level Security është aktiv. Kushdo mund të lexojë, dhe shtimi lejohet përkohësisht pa login, por vlerësimi i ofruesit të ri detyrohet të jetë 0. Çelësat janë në `.env.local`, që nuk shkon në git. Në repo është vetëm `.env.example`.

## Çka bëri agjenti (Claude Code)

- Shkroi **AGENTS.md** duke përmbledhur EKIPI, BISEDAT dhe HARTA, dhe shtoi rregullat e projektit (Expo Go, çelësat, shqipja).
- Lexoi udhëzimin zyrtar të Expo për Supabase dhe instaloi `@supabase/supabase-js` dhe `expo-sqlite` me `npx expo install`.
- Krijoi `src/lib/supabase.ts` (klienti), `src/data/api.ts` (leximi dhe shkrimi) dhe `supabase/schema.sql` (tabelat, RLS dhe të dhënat fillestare).
- E ktheu Kreun nga të dhëna demo në të dhëna reale dhe shtoi ekranin "Shto ofrues".
- Ekzekutoi `tsc` dhe `expo lint` pas çdo hapi dhe bëri commit pas secilit mision.

## Çka bëmë ne

- Krijuam projektin në Supabase, ekzekutuam `supabase/schema.sql` në SQL Editor dhe vendosëm çelësat në `.env.local`.
- Lexuam diff-in e çdo commit-i dhe e testuam në telefon me Expo Go. _[shtoni çfarë keni ndryshuar ose vënë re]_

## Hapi tjetër

1. **Autentikimi** me Supabase Auth: regjistrim/hyrje dhe tabela `profiles` me rolin klient/ofrues.
2. Shtimi i ofruesve të lejohet **vetëm për ofruesit e kyçur**, në vend të politikës së përkohshme.
3. **Profili i ofruesit** (`provider/[id].tsx`) me shërbimet (tabela `services`) dhe orarin (`availability`).
4. Pastaj **rezervimi** (`appointments`).
