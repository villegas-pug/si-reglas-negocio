import axios from 'axios'

// const BASE_URL = 'http://172.27.251.20:6090/api'
const BASE_URL = 'http://172.27.250.22:6090/api'

export const api = axios.create({
   baseURL: BASE_URL,
   timeout: 3_600_000
})
