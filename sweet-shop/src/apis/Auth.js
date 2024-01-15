import axios from 'axios'

axios.defaults.withCredentials = true

const AUTH_API_ENDPOINT = process.env.REACT_APP_AUTH_URL;


export async function onRegistration(registrationData) {
  return await axios.post(AUTH_API_ENDPOINT + '/register', registrationData)
}

export async function onLogin(loginData) {
  return await axios.post(AUTH_API_ENDPOINT + '/login', loginData)
}

export async function getCookie() {
  return await axios.get(AUTH_API_ENDPOINT + '/get-user-id-cookie')
}

export async function checkLogin() {
  return await axios.get(AUTH_API_ENDPOINT + '/check-login')
}

// export async function onLogout() {
//   return await axios.delete('http://localhost:8000/logout')
// }