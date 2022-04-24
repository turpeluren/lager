import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text key={index}>{ product.name } - { product.stock }</Text>);
  
  return (
    <View style={styles.list}>
      {list}
    </View>
  );
}

export default function Stock() {
    return (
        <View>
            <Text style={{color: '#000', fontSize: 24, paddingTop: 40}}>Lagerförteckning:</Text>
            <StockList/>
        </View>
    );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
  },
});