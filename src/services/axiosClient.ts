import axios from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN, EXPIRED_1DAY } from "@/contants/auth";
import { getCachedData, removeCacheData, setCacheData } from "@/utils/storage";
import authenticationAPI from "./authentication.service";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

axiosClient.interceptors.request.use(
  (config: any) => {
    const customHeaders: any = {}

    const accessToken = getCachedData(ACCESS_TOKEN)
    if (accessToken) {
      customHeaders.Authorization = `Bearer ${accessToken}`
    }
    if(config?.params?.signal) {
      config.signal = config.params.signal
      delete config.params.signal
    }
    return {
      ...config,
      headers: {
        ...customHeaders,
        ...config.headers,
      },
    };
  },
  function (error: any) {
    return Promise.reject(error);
  }
);


let checkRefreshToken: boolean = false

axiosClient.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  async (error: any) => {
    const originalRequest: any = error?.config;
    const refreshToken = getCachedData(REFRESH_TOKEN)
    if (refreshToken && !checkRefreshToken && error.response.status === 401) {
      checkRefreshToken = true;
      const data = await authenticationAPI.refreshToken(refreshToken)
      if (data?.data?.statusCode === 401 && checkRefreshToken && refreshToken) {
        removeCacheData(ACCESS_TOKEN)
        removeCacheData(REFRESH_TOKEN)
        window.location.href = "/signin"
        checkRefreshToken = false
        return Promise.reject(error)
      } else {
        const access_token = data?.data?.accessToken || {}
        axios.defaults.headers.common['Authorization'] = access_token
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token
        originalRequest.headers['If-None-Match'] = '*'
        setCacheData(ACCESS_TOKEN, access_token, EXPIRED_1DAY)
        checkRefreshToken = false
        return axiosClient(originalRequest)
      }
    } else {
      return Promise.reject(error)
    }
  }
);

export default axiosClient;