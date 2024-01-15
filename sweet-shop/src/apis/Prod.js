import axios from "axios";
axios.defaults.withCredentials = true

const PROD_API_ENDPOINT = process.env.REACT_APP_PRODUCT_URL;

export async function getProducts() {
  return await axios.get(PROD_API_ENDPOINT + '/sweets')
}