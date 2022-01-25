import axios from "axios";

export const Api = axios.create({
    baseURL: 'https://5f5f-45-181-9-216.ngrok.io/api',
});

