import { Link, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'FixIt',
          headerRight: () => (
            <Link href="/shto-ofrues" style={{ color: '#208AEF', fontSize: 16, fontWeight: '600' }}>
              + Shto
            </Link>
          ),
        }}
      />
      <Stack.Screen name="shto-ofrues" options={{ title: 'Shto ofrues', presentation: 'modal' }} />
    </Stack>
  );
}
