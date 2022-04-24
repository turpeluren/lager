import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';
import warehouse from './assets/textil.jpg';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{color: '#Fad', fontSize: 42, paddingBottom: 16}}>Tures Textilier - Lagerinfo</Text>
        <Image source={warehouse} style={{ width: 320, height: 175 }} />
        <Stock></Stock>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',*/
  },
  base: {
    flex: 1,
    backgroundColor: '#444',
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 24,
    alignItems: 'flex-start',
    textAlign: 'left',
  }
});
