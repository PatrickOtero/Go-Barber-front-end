import axios from "axios"

const localUrl = "http://localhost:3001"
// const serverUrl = "https://patrick-gobarber-backend.herokuapp.com"

export const api = axios.create({ 
    baseURL: localUrl,
});

export const apiAuth = axios.create({
    baseURL: localUrl,
})

apiAuth.interceptors.request.use((config) => {
    const storageToken = localStorage.getItem("token");
    const token = storageToken.slice(1, storageToken.length-1)

    if(token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});