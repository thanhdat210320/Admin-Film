import axios from "axios"

const axiosClient = axios.create({
  baseURL: import.meta.env.API_URL_SGK,
});

export default axiosClient;