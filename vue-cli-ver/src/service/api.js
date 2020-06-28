import axios from "axios"
import NProgress from "nprogress"

const apiClient = axios.create({
  baseURL: `https://corona.lmao.ninja/v2/countries?yesterday&sort`,
});

apiClient.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});
apiClient.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

export default {
  getCovid_19_Data() {
    return apiClient.get();
  },
};