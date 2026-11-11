# MODELI: java 6, hyrja dhe RLS

## AI në hapin B (hyrja në aplikacion)

AI (Claude Code) u përdor **vetëm** për hapin B, ku karta e lejon.

**Çka e pyetëm:**
- T'i kopjojë 5 file-t nga `hyrja-fillestare` (`hyrja.ts`, `hyrja-offline.ts`, `sesioni.tsx`, `hyrja.tsx`, `ButoniDil.tsx`) dhe t'i plotësojë TODO 1–5.
- Ta ndërtojë `_layout.tsx` me `SesioniProvider` dhe `Stack.Protected`, duke ruajtur ekranet tona (Kreu, Shto ofrues).

**Çka mbajtëm:**
- **TODO 1, `hyr`:** `supabase.auth.signInWithPassword`. Gabimin e Supabase e hedh si `Error`, që ekrani ta shfaqë.
- **TODO 2, `krijoLlogari`:** `supabase.auth.signUp`. Kthen `"hyri"` kur ka sesion dhe `"konfirmo"` kur nuk ka.
- **TODO 3, `dil`:** `supabase.auth.signOut`.
- **TODO 4, `degjoSesionin`:** `supabase.auth.onAuthStateChange`, që kthen `unsubscribe`. E hoqëm `ndryshoi(null)` e fillimit, sepse ngjarja `INITIAL_SESSION` vjen menjëherë me sesionin e ruajtur. Përndryshe ekrani i hyrjes do të dukej për një çast edhe kur je i kyçur.
- **TODO 5, `AppState`:** ishte tashmë te `src/lib/supabase.ts` që nga java 5.
- **Roja:** pa hyrë shihet vetëm `hyrja`, i hyrë shihen Kreu dhe Shto ofrues. "Dil" është majtas, "+ Shto" djathtas.

**Çka kontrolluam te AI-ja (tri gabimet e kartës):**
- Nuk ka `using (true)` për të dhëna personale.
- Nuk ka filtër `.eq(...)` në telefon në vend të RLS-it. Telefoni nuk e dërgon `pronari_id`.
- Roli nuk ruhet në `user_metadata`.

## Kush sheh çka

Policy-të te `supabase/j6-hyrja-rls.sql` (hapat A dhe C) i shkruam ne, pa AI, duke u nisur nga shablloni i kartës. Kjo tabelë i përmbledh vendimet tona.

| Tabela | Pa llogari (`anon`) | Kush lexon | Kush shton | Kush ndryshon | Pse |
|---|---|---|---|---|---|
| `categories` | asgjë (*permission denied*) | çdo përdorues i kyçur, të gjitha kategoritë | askush nga aplikacioni | askush nga aplikacioni | Kategoritë nuk janë të dhëna personale. Janë të njëjta për të gjithë, dhe çdo klient ka nevojë t'i shohë të gjitha për të gjetur shërbimin. Prandaj `using (true)`, por vetëm `to authenticated` dhe vetëm `select`. Kategoritë shtohen vetëm nga SQL Editor. |
| `providers` | asgjë (*permission denied*) | vetëm pronari: rreshtat ku `pronari_id = auth.uid()` | përdoruesi i kyçur, vetëm për vete | vetëm pronari, rreshtat e vet | Çdo ofrues është i llogarisë që e krijoi. `pronari_id` e vendos serveri (`default auth.uid()`), jo telefoni, kështu që askush nuk mund të krijojë ofrues në emër të dikujt tjetër. |

### Si e kontrollon serveri

- **`using (...)`** kontrollon rreshtat **ekzistues**: cilat mund t'i lexosh ose t'i ndryshosh. Rreshtat që s'e plotësojnë kushtin thjesht nuk kthehen.
- **`with check (...)`** kontrollon rreshtin **e ri** ose **të ndryshuar** para se të ruhet. Nëse s'e plotëson kushtin, ruajtja refuzohet.
- Policy e shtimit ka vetëm `with check`, sepse para shtimit nuk ka rresht ekzistues për të kontrolluar.
- Policy e ndryshimit ka të dyja: `using` që të ndryshosh vetëm të tuat, dhe `with check` që të mos ia kalosh rreshtin dikujt tjetër duke ndryshuar `pronari_id`.

### Çka nuk bëmë (qëllimisht)

- **Asnjë filtër `.eq(...)` në telefon.** Ndarja bëhet vetëm nga RLS-i në server, dhe telefoni vetëm pyet.
- **Asnjë rol në `user_metadata`.** Atë mund ta ndryshojë vetë përdoruesi.
- **Asnjë policy për fshirje.** Aplikacioni ende nuk fshin ofrues, prandaj fshirja është e ndaluar për të gjithë.

### Hapi tjetër (rolet, hapi E)

Ofruesit tani i sheh vetëm pronari. Për FixIt, më vonë klientët duhet t'i shohin ofruesit e **aprovuar** të të gjithëve. Këtë do ta bëjmë me një tabelë rolesh që ndryshohet vetëm nga SQL Editor dhe me një kolonë `is_approved`, jo me `user_metadata`.
