import config from "../config/config.json";
import Order from "../interfaces/order";
import productModel from "./products";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order) {
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern

        // TODO: Ändra status för ordern till packad
        //console.log(order)

        console.log('pickOrder running')

        productModel.updateProducts(order)

        updateOrderStatus(order, 200)

    },
    undoPickOrder: async function undoPickOrder(order) {
        
        productModel.updateProducts(order, true)
        updateOrderStatus(order, 100)
    }
};

function updateOrderStatus(order: Order, stat: number) {

    var new_json = JSON.parse("{}");
    new_json.id = order.id;
    new_json.status_id = stat;
    new_json.api_key = config.api_key;

    fetch(`${config.base_url}/orders`, {
        body: JSON.stringify(new_json),
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'PUT'
    })
    .then(function (response) {
        response.json().then((resp) => {
            console.log("response:")
            console.warn(resp)
        })
    });
}

export default orders;