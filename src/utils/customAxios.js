import axios from "axios"

const customAxiosInstance = axios.create()

let getAccessTokenSilently
export const injectFn = _getAccessTokenSilently => {
  getAccessTokenSilently = _getAccessTokenSilently
}

// Request interceptor
customAxiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getAccessTokenSilently()
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

export default customAxiosInstance
