import Axios from "axios";
import { ApiUrl} from "../config/config";

const post = (path, data, Headers) => {
  console.log(Headers);
  return Axios.post(`${ApiUrl}${path}`, data, Headers);
};

const get = (path, Headers) => {
  return Axios.get(`${ApiUrl}${path}`, Headers);
};

const patch = (path, data, Headers) => {
  return Axios.patch(`${ApiUrl}${path}`, data, Headers)
}

const del = (path, data, Headers) => {
  return Axios.delete(`${ApiUrl}${path}`, Headers)
}

export { post, get, patch, del };
