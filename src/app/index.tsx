import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Karta from '../components/Karta';
import { merrKategorite, merrOfruesit, type Kategoria, type Ofruesi } from '../data/api';
import { useSesioni } from '@/lib/sesioni';

export default function Kreu() {
  const { perdoruesi } = useSesioni();
  const [kategorite, setKategorite] = useState<Kategoria[]>([]);
  const [ofruesit, setOfruesit] = useState<Ofruesi[]>([]);
  const [dukeNgarkuar, setDukeNgarkuar] = useState(true);
  const [dukeRifreskuar, setDukeRifreskuar] = useState(false);
  const [gabimi, setGabimi] = useState<string | null>(null);

  const [kerkimi, setKerkimi] = useState('');
  // null = "Të gjitha"
  const [kategoriaId, setKategoriaId] = useState<number | null>(null);

  const ngarko = useCallback(async () => {
    try {
      setGabimi(null);
      const [k, o] = await Promise.all([merrKategorite(), merrOfruesit()]);
      setKategorite(k);
      setOfruesit(o);
    } catch (e) {
      setGabimi(e instanceof Error ? e.message : 'Diçka shkoi keq.');
    } finally {
      setDukeNgarkuar(false);
      setDukeRifreskuar(false);
    }
  }, []);

  // Ngarkon sa herë që ekrani shfaqet, p.sh. kur kthehesh nga "Shto ofrues".
  useFocusEffect(
    useCallback(() => {
      ngarko();
    }, [ngarko]),
  );

  const teFiltruar = ofruesit.filter((o) => {
    const perputhetKategoria = kategoriaId === null || o.category_id === kategoriaId;
    const perputhetEmri = o.business_name.toLowerCase().includes(kerkimi.trim().toLowerCase());
    return perputhetKategoria && perputhetEmri;
  });

  const butonat = [{ id: null, name: 'Të gjitha' }, ...kategorite];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.permbajtja}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={dukeRifreskuar}
          onRefresh={() => {
            setDukeRifreskuar(true);
            ngarko();
          }}
        />
      }
    >
      <Text style={styles.llogaria}>Hyrë si {perdoruesi?.email}</Text>
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
        {butonat.map((k) => {
          const aktive = k.id === kategoriaId;
          return (
            <Pressable
              key={k.id ?? 'te-gjitha'}
              onPress={() => setKategoriaId(k.id)}
              style={[styles.kategoria, aktive && styles.kategoriaAktive]}
            >
              <Text style={[styles.kategoriaTeksti, aktive && styles.kategoriaTekstiAktiv]}>
                {k.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={styles.seksioni}>Ofruesit e rekomanduar</Text>

      {dukeNgarkuar && <ActivityIndicator style={styles.ngarkimi} />}

      {gabimi && (
        <Text style={styles.gabimi}>Nuk u lidh dot me databazën: {gabimi}</Text>
      )}

      {teFiltruar.map((o) => (
        <Karta
          key={o.id}
          titulli={o.business_name}
          pershkrimi={`${o.categories?.name ?? ''} · ${o.city} · ★ ${o.rating > 0 ? o.rating : 'e re'}`}
          cmimi={o.starting_price}
        />
      ))}

      {!dukeNgarkuar && !gabimi && teFiltruar.length === 0 && (
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
  llogaria: {
    fontSize: 13,
    color: '#56606d',
    marginHorizontal: 16,
    marginBottom: 4,
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
  ngarkimi: {
    marginTop: 24,
  },
  gabimi: {
    color: '#c62828',
    marginHorizontal: 16,
    marginTop: 16,
  },
  bosh: {
    textAlign: 'center',
    color: '#8a8f98',
    marginTop: 24,
  },
});
