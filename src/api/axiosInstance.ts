import Axios from "axios";
import { AxiosCacheInstance, setupCache } from "axios-cache-interceptor";

const axiosInstance: AxiosCacheInstance = setupCache(Axios);

export default axiosInstance;
