import axios from 'axios'

export const api = axios.create({
   baseURL: 'http://localhost:6090/api',
   timeout: 120_000
})
