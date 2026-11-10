// Klienti i Supabase, sipas udhëzimit të Expo:
// https://docs.expo.dev/guides/using-supabase/
import 'expo-sqlite/localStorage/install';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Mungojnë EXPO_PUBLIC_SUPABASE_URL ose EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY. ' +
      'Kopjo .env.example në .env.local dhe plotësoji, pastaj rinis `npx expo start`.',
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    // Sesioni i login-it ruhet në telefon (do na duhet kur të shtojmë autentikimin).
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    // Në telefon nuk ka URL nga e cila lexohet sesioni.
    detectSessionInUrl: false,
  },
});

// Rifreskimi i token-it vetëm kur aplikacioni është i hapur.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
