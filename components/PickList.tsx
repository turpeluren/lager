import { View, Text, Button, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { Typography, Base } from '../styles';
import Order from '../interfaces/order';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    //Plocka order-knappen
    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("Ordrar redo att plockas", { reload: true});
    }

    //Ångra plockad order-knappen
    async function undo_pick() {
        await orderModel.undoPickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("Ordrar redo att plockas", { reload: true});
    }

    //Lista beställda varor
    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index}
                style={{ ...Typography.normal}}>
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    //Checka varor finns i lager
    function checkItemsExist (order) {
        //console.log(all_item)
        if (order.status_id == 200) {
            return <View>
                        <Text style={Typography.info_c}>Ordern är redan plockad.</Text>
                        <Button title="Ångra Plockad order" onPress={undo_pick} />
                    </View>
        }

        const all_item = order.order_items;
        
        let order_in_stock = true;
        //loop through orders and check amount is in stock
        for (let i=0; i < all_item.length; i++) {
            if (all_item[i].stock >= all_item[i].amount) {
                console.log(`item ${i} in stock`)
            } else {
                console.log(`item ${i} not in stock`)
                order_in_stock = false;
            }
        }

        //Return button or not
        if (order_in_stock) {
            return <Button title="Plocka order" onPress={pick} />
        } else {
            return <Text style={{ ...Typography.warning}}>
                Ordern går ej att plocka då produkterna inte finns i lager.</Text>
        }
    };

    return (
        <ScrollView style={{...Base.base}}>
            <Text style={{ ...Typography.normal}}>{order.name}</Text>
            <Text style={{ ...Typography.normal}}>{order.address}</Text>
            <Text style={{ ...Typography.normal}}>{order.zip} {order.city}</Text>

            <Text style={{ ...Typography.header4}}>Produkter:</Text>

            {orderItemsList}
            <Text style={{paddingBottom: 28}}>&nbsp;</Text>

            {checkItemsExist(order)}

        </ScrollView>
    )
};