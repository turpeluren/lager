import config from "../config/config.json";
import Order from '../interfaces/order'

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        //console.log(result.data)
        return result.data;
    },
    updateProducts: async function updateProducts(order: Order, reverse: Boolean=false) {
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern

        
        var new_json = JSON.parse("{}");
        new_json.api_key = config.api_key;

        //loop though products in order
        for (let i=0; order.order_items.length; i++) {

            //params
            new_json.id = order.order_items[i].product_id;
            if (!reverse) {
                new_json.stock = order.order_items[i].stock - order.order_items[i].amount;
            } else {
                //add the amounts to stock instead, undoing the order as picked
                new_json.stock = order.order_items[i].stock + order.order_items[i].amount;
            }

            //PUT
            fetch(`${config.base_url}/products`, {
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

    }
    /*reverseUpdateProducts: async function reverseUpdateProducts(order) {
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern

        
        var new_json = JSON.parse("{}");
        new_json.api_key = config.api_key;

        //loop though products in order
        for (let i=0; order.order_items.length; i++) {

            //params
            new_json.id = order.order_items[i].product_id;
            new_json.stock = order.order_items[i].stock + order.order_items[i].amount;

            //PUT
            fetch(`${config.base_url}/products`, {
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

    }*/
};

export default products;