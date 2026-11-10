import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { merrKategorite, shtoOfrues, type Kategoria } from '../data/api';

export default function ShtoOfrues() {
  const [kategorite, setKategorite] = useState<Kategoria[]>([]);
  const [emri, setEmri] = useState('');
  const [kategoriaId, setKategoriaId] = useState<number | null>(null);
  const [qyteti, setQyteti] = useState('');
  const [cmimi, setCmimi] = useState('');
  const [dukeRuajtur, setDukeRuajtur] = useState(false);

  useEffect(() => {
    merrKategorite()
      .then(setKategorite)
      .catch((e) => Alert.alert('Gabim', e.message));
  }, []);

  async function ruaj() {
    const cmimiNumer = Number(cmimi.replace(',', '.'));

    if (emri.trim().length < 2) return Alert.alert('Kujdes', 'Shkruaj emrin e biznesit.');
    if (kategoriaId === null) return Alert.alert('Kujdes', 'Zgjidh një kategori.');
    if (qyteti.trim().length < 2) return Alert.alert('Kujdes', 'Shkruaj qytetin.');
    if (!cmimi || Number.isNaN(cmimiNumer) || cmimiNumer < 0)
      return Alert.alert('Kujdes', 'Shkruaj një çmim të vlefshëm.');

    try {
      setDukeRuajtur(true);
      await shtoOfrues({
        business_name: emri.trim(),
        category_id: kategoriaId,
        city: qyteti.trim(),
        starting_price: cmimiNumer,
      });
      // Kreu e rilexon listën kur rishfaqet (useFocusEffect).
      router.back();
    } catch (e) {
      Alert.alert('Nuk u ruajt', e instanceof Error ? e.message : 'Diçka shkoi keq.');
    } finally {
      setDukeRuajtur(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.permbajtja}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.etiketa}>Emri i biznesit</Text>
      <TextInput
        style={styles.fusha}
        placeholder="p.sh. Berberi Arti"
        placeholderTextColor="#8a8f98"
        value={emri}
        onChangeText={setEmri}
        maxLength={80}
      />

      <Text style={styles.etiketa}>Kategoria</Text>
      <View style={styles.kategorite}>
        {kategorite.map((k) => {
          const aktive = k.id === kategoriaId;
          return (
            <Pressable
              key={k.id}
              onPress={() => setKategoriaId(k.id)}
              style={[styles.kategoria, aktive && styles.kategoriaAktive]}
            >
              <Text style={[styles.kategoriaTeksti, aktive && styles.kategoriaTekstiAktiv]}>
                {k.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.etiketa}>Qyteti</Text>
      <TextInput
        style={styles.fusha}
        placeholder="p.sh. Prishtinë"
        placeholderTextColor="#8a8f98"
        value={qyteti}
        onChangeText={setQyteti}
        maxLength={40}
      />

      <Text style={styles.etiketa}>Çmimi fillestar (€)</Text>
      <TextInput
        style={styles.fusha}
        placeholder="p.sh. 5"
        placeholderTextColor="#8a8f98"
        value={cmimi}
        onChangeText={setCmimi}
        keyboardType="decimal-pad"
      />

      <Pressable
        style={[styles.butoni, dukeRuajtur && styles.butoniJoAktiv]}
        onPress={ruaj}
        disabled={dukeRuajtur}
      >
        {dukeRuajtur ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.butoniTeksti}>Ruaj ofruesin</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  permbajtja: {
    padding: 16,
  },
  etiketa: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  fusha: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  kategorite: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  butoni: {
    backgroundColor: '#208AEF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  butoniJoAktiv: {
    opacity: 0.6,
  },
  butoniTeksti: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
