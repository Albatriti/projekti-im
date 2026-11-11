import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { hyr, krijoLlogari } from "@/lib/sesioni";

// Ekrani i hyrjes. Pas hyrjes nuk ka router.push: roja në _layout.tsx e çon vetë te lista.
export default function Hyrja() {
  const [email, setEmail] = useState("");
  const [fjalekalimi, setFjalekalimi] = useState("");
  const [mesazhi, setMesazhi] = useState<{ tekst: string; gabim: boolean } | null>(null);
  const [duke, setDuke] = useState(false);

  // #region veprimi
  async function vepro(cili: "hyr" | "krijo") {
    if (!email.trim() || !fjalekalimi) return setMesazhi({ tekst: "Shkruani email-in dhe fjalëkalimin.", gabim: true });
    setDuke(true);
    setMesazhi(null);
    try {
      if (cili === "hyr") {
        await hyr(email.trim(), fjalekalimi);
      } else if ((await krijoLlogari(email.trim(), fjalekalimi)) === "konfirmo") {
        setMesazhi({ tekst: "Llogaria u krijua. Hapni email-in, konfirmojeni, pastaj hyni.", gabim: false });
      }
    } catch (e) {
      setMesazhi({ tekst: (e as Error).message, gabim: true });
    } finally {
      setDuke(false);
    }
  }
  // #endregion

  return (
    <View style={styles.ekrani}>
      <Text style={styles.titulli}>FixIt</Text>
      <Text style={styles.nentitulli}>Hyni për të gjetur dhe rezervuar shërbime.</Text>
      <TextInput
        style={styles.fusha}
        placeholder="Email-i"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.fusha}
        placeholder="Fjalëkalimi"
        value={fjalekalimi}
        onChangeText={setFjalekalimi}
        secureTextEntry
        autoComplete="password"
      />
      {mesazhi ? <Text style={mesazhi.gabim ? styles.gabimi : styles.info}>{mesazhi.tekst}</Text> : null}
      <Pressable style={[styles.butoni, duke && styles.duke]} onPress={() => vepro("hyr")} disabled={duke} accessibilityRole="button">
        <Text style={styles.butoniTekst}>{duke ? "Prisni…" : "Hyr"}</Text>
      </Pressable>
      <Pressable style={[styles.dytesor, duke && styles.duke]} onPress={() => vepro("krijo")} disabled={duke} accessibilityRole="button">
        <Text style={styles.dytesorTekst}>Krijo llogari</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ekrani: { flex: 1, padding: 24, gap: 12, justifyContent: "center", backgroundColor: "#f8f7f3" },
  titulli: { fontSize: 28, fontWeight: "800", color: "#1f2a37" },
  nentitulli: { fontSize: 15, color: "#56606d", marginBottom: 8 },
  fusha: { padding: 14, fontSize: 16, borderRadius: 10, borderWidth: 1, borderColor: "#c5ccd4", backgroundColor: "#ffffff" },
  gabimi: { color: "#9b2c2c", fontSize: 14 },
  info: { color: "#2e6878", fontSize: 14 },
  butoni: { marginTop: 4, padding: 14, borderRadius: 12, backgroundColor: "#2e6878", alignItems: "center" },
  butoniTekst: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  dytesor: { padding: 14, borderRadius: 12, borderWidth: 2, borderColor: "#2e6878", alignItems: "center" },
  dytesorTekst: { color: "#2e6878", fontWeight: "700", fontSize: 16 },
  duke: { opacity: 0.6 },
});
