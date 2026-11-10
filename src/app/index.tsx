import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import Karta from '../components/Karta';
import { kategorite, ofruesit, type Kategoria } from '../data/ofruesit';

export default function Kreu() {
  const [kerkimi, setKerkimi] = useState('');
  const [kategoria, setKategoria] = useState<Kategoria>('Të gjitha');

  const teFiltruar = ofruesit.filter((o) => {
    const perputhetKategoria = kategoria === 'Të gjitha' || o.kategoria === kategoria;
    const perputhetEmri = o.emri.toLowerCase().includes(kerkimi.trim().toLowerCase());
    return perputhetKategoria && perputhetEmri;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.permbajtja}>
      <Text style={styles.pershendetja}>Çfarë shërbimi të duhet sot?</Text>

      <TextInput
        style={styles.kerkimi}
        placeholder="Kërko berber, mekanik, elektricist..."
        placeholderTextColor="#8a8f98"
        value={kerkimi}
        onChangeText={setKerkimi}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.kategorite}
      >
        {kategorite.map((k) => {
          const aktive = k === kategoria;
          return (
            <Pressable
              key={k}
              onPress={() => setKategoria(k)}
              style={[styles.kategoria, aktive && styles.kategoriaAktive]}
            >
              <Text style={[styles.kategoriaTeksti, aktive && styles.kategoriaTekstiAktiv]}>
                {k}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={styles.seksioni}>Ofruesit e rekomanduar</Text>

      {teFiltruar.map((o) => (
        <Karta
          key={o.id}
          titulli={o.emri}
          pershkrimi={`${o.kategoria} · ${o.qyteti} · ★ ${o.vleresimi}`}
          cmimi={o.cmimiFillestar}
        />
      ))}

      {teFiltruar.length === 0 && (
        <Text style={styles.bosh}>Nuk u gjet asnjë ofrues.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  permbajtja: {
    paddingVertical: 16,
  },
  pershendetja: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  kerkimi: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 16,
    fontSize: 16,
  },
  kategorite: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  kategoria: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  kategoriaAktive: {
    backgroundColor: '#208AEF',
    borderColor: '#208AEF',
  },
  kategoriaTeksti: {
    fontSize: 14,
    color: '#333333',
  },
  kategoriaTekstiAktiv: {
    color: '#ffffff',
    fontWeight: '600',
  },
  seksioni: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 4,
  },
  bosh: {
    textAlign: 'center',
    color: '#8a8f98',
    marginTop: 24,
  },
});
