import axios from "axios";
import { clearePersister } from "../redux/clearPersistStore.js";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error &&
      error.response.status === 402 &&
      error.response.data.message === "Access Token Is Expired"
    ) {
      try {
        const refreshToken = await axios.post(
          `${process.env.REACT_APP_API_URI}/users/refreshtoken`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshToken.data.accessToken;
        console.log(newAccessToken);
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios.request(error.config);
      } catch (err) {
        if (window.location.pathname !== "/signin") {
          const clearing = async ()=>{
            await clearePersister();
          }
          clearing()
          window.location.hash = "/signin";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
