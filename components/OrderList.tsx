import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import config from "./../config/config.json";
import orderModel from "../models/orders.ts";
import { Typography, Base } from "../styles"

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();   
        //fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
        //  .then(response => response.json())
        //  .then(result => setAllOrders(result.data)); //så var det innan
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    const listOfPackedOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <ScrollView style={{ ...Base.base}}>
            {listOfOrders}
            <Text style={{paddingBottom: 64}}>&nbsp;</Text>
            <Text style={Typography.header4}>
                <Text style={Typography.center}>Redan plockade ordrar:</Text></Text>
            {listOfPackedOrders}
        </ScrollView>
    );
}

/*<Text style={{ ...Typography.header4}}>Ordrar redo att plockas:</Text>*/
