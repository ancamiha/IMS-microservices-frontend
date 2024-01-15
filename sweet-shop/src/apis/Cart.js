import axios from "axios";
axios.defaults.withCredentials = true

const REACT_APP_CART_URL = process.env.REACT_APP_CART_URL;

export async function addProdToCart(addProdToCart) {
  return await axios.post(REACT_APP_CART_URL + '/addProdToCart', addProdToCart)
}

export async function getCart(userId) {
  return await axios.get(REACT_APP_CART_URL + `/cart/${userId}`)
}

export async function deleteProdFromCart(deleteProdFromCart) {
  const config = {
    headers: {
      'Content-Type': 'application/json' 
    },
    data: deleteProdFromCart
  };
  return await axios.delete(REACT_APP_CART_URL + '/deleteProdFromCart', config)
}