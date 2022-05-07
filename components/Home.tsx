import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import Stock from './Stock.tsx';
import warehouse from '../assets/textil.jpg';
import { Typography, Base } from '../styles';

export default function Home({products, setProducts}) {
  return (
    <ScrollView style={Base.base}>
      <Text style={Typography.pinkheader}>Tures Textilier - Lagerinfo</Text>
      <Image source={warehouse} style={{ width: 320, height: 175 }} />
      <Stock products={products} setProducts={setProducts} />
      <Text style={{paddingBottom: 64}}>&nbsp;</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
