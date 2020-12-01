import axios from "axios";

export const instance = axios.create({
    baseURL: `https://ws.audioscrobbler.com/2.0`,
    params: {format: 'json', api_key: process.env.REACT_APP_API_KEY}
})