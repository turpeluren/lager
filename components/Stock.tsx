import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles';
import productModel from "../models/products.ts";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function StockList({products, setProducts}) {
  

  useEffect(async () => {
      setProducts(await productModel.getProducts());
      /*fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data)); //gamla sätt utan models*/
  }, []);

  const list = products.map((product, index) => {
    return <Text
            key={index}
            style={{ ...Typography.normal}}>
              { product.name } - { product.stock }
            </Text>
  });

  //const list = ["ett", "två", "tre"];
  
  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock({products, setProducts}) {
    return (
        <View style={Base.list}>
            <Text style={Typography.header3}>Lagerförteckning:</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}
