import axios from 'axios'

console.log('API URL:', import.meta.env.VITE_API_URL)

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    })

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const registerUser = (data) => api.post('/auth/register', data)
export const loginUser = (data) => api.post('/auth/login', data)
export const fetchWeather = (city) => api.get(`/weather?city=${city}`)
export const fetchHistory = () => api.get('/weather/history')
export const deleteSearch = (id) => api.delete(`/weather/history/${id}`)