import axios from "axios"
const axiosInstance = axios.create({
  // localhost server service
  // baseURL: "http://127.0.0.1:5001/clone-d07e9/us-central1/api",
  // render host web-service
  baseURL: "https://tesfaye-api.onrender.com",
});
export {axiosInstance}