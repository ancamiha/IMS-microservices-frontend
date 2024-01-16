import axios from "axios";
axios.defaults.withCredentials = true

const REACT_APP_ORDER_URL = process.env.REACT_APP_ORDER_URL;

export async function order(userId, orderDetails) {
    const config = {
        headers: {
            'Content-Type': 'application/json' 
        },
        data: orderDetails
    };

    return await axios.post(REACT_APP_ORDER_URL + `/order/${userId}`, config);
}
