
import { View, Text, StyleSheet } from 'react-native';

type KartaProps = {
  titulli: string;
  pershkrimi: string;
  cmimi: number;
};

export default function Karta({
  titulli,
  pershkrimi,
  cmimi,
}: KartaProps) {
  return (
    <View style={styles.karta}>
      <Text style={styles.titulli}>{titulli}</Text>
      <Text>{pershkrimi}</Text>
      <Text style={styles.cmimi}>{cmimi} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  karta: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  titulli: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cmimi: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
