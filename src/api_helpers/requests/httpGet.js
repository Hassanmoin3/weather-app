import axios from "axios";
const httpGet = (url, params) => {
  return axios
    .get(url, null, {
      params,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default httpGet;
