import { Link, SplashScreen, Stack } from 'expo-router';

import { ButoniDil } from '@/components/ButoniDil';
import { SesioniProvider, useSesioni } from '@/lib/sesioni';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SesioniProvider>
      <Harta />
    </SesioniProvider>
  );
}

// Roja: pa hyrë shihet vetëm "hyrja"; i hyrë, ekranet e FixIt.
// Kur sesioni ndryshon (hyrje / dalje), ekrani ndryshon vetë, pa router.push.
// Roja është vetëm për përdoruesin: të dhënat i mbron RLS-i në server.
function Harta() {
  const { perdoruesi, dukeLexuar } = useSesioni();
  if (!dukeLexuar) SplashScreen.hide();

  return (
    <Stack>
      <Stack.Protected guard={perdoruesi !== null}>
        <Stack.Screen
          name="index"
          options={{
            title: 'FixIt',
            headerLeft: () => <ButoniDil />,
            headerRight: () => (
              <Link href="/shto-ofrues" style={{ color: '#208AEF', fontSize: 16, fontWeight: '600' }}>
                + Shto
              </Link>
            ),
          }}
        />
        <Stack.Screen name="shto-ofrues" options={{ title: 'Shto ofrues', presentation: 'modal' }} />
      </Stack.Protected>
      <Stack.Protected guard={perdoruesi === null}>
        <Stack.Screen name="hyrja" options={{ title: 'Hyrja', headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
