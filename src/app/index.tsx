
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Karta from '../components/Karta';

export default function Index() {
  const [cmimi, setCmimi] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.titulli}>Dyqani im</Text>

      <Karta
        titulli="Libër programimi"
        pershkrimi="Një libër për fillestarë."
        cmimi={cmimi}
      />

      <Button
        title="Rrit çmimin"
        onPress={() => setCmimi(cmimi + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  titulli: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
