import axios from 'axios'

export const api = axios.create({
   baseURL: 'http://172.27.250.22:6090/api',
   timeout: 120_000
})
