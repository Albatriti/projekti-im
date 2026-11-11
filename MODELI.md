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

## Kush sheh çka (hapi C, pa AI)

_[Këtë pjesë e shkruani vetë, me fjalët tuaja, pasi t'i shkruani policy-të.]_

| Tabela | Kush lexon | Kush shton | Kush ndryshon | Pse |
|---|---|---|---|---|
| `categories` | _[...]_ | _[...]_ | _[...]_ | _[...]_ |
| `providers` | _[...]_ | _[...]_ | _[...]_ | _[...]_ |
