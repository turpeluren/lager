
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from './OrderList.tsx';
import PickList from './PickList.tsx';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initalRouteName="Ordrar redo att plockas">
            <Stack.Screen name="Ordrar redo att plockas" component={OrderList} />
            <Stack.Screen name="Details">
                {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );

    /*return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Plocklista</Text>
        </View> //Utan funktionalitet för debug-syften
    );*/
}
