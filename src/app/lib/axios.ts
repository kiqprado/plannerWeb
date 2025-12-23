import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://plannerapi-r2pn.onrender.com/'
})

