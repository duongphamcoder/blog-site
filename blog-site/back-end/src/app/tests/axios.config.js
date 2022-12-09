const axios = require("axios");

const axiosRequest = async (endpoint, method, body = {}) => {
  return axios[method](endpoint, body, {
    validateStatus: () => {
      return true; // default
    },
  });
};

module.exports = axiosRequest;
