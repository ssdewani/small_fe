// src/composables/useApi.ts
import { useAuth } from '@clerk/vue'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

export function useApi() {
    const { getToken } = useAuth()

    // Create an Axios instance
    const api = axios.create({
        baseURL: API_URL, // Your backend URL
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // Add a request interceptor
    api.interceptors.request.use(async (config) => {
        // 1. Get the token from Clerk
        // passing { template: '...' } is optional, depending on if you use Clerk Templates
        const token = await getToken.value()

        // 2. If a token exists, attach it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }, (error) => {
        return Promise.reject(error)
    })

    return api
}