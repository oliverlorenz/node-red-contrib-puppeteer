const axios = require("axios").default;

module.exports = (url, method, data) => {
  let headers = {};
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      data: data,
      headers,
    })
      .then((result) => {
        resolve(result);
      })
      .catch(({ response }) => {
        reject(response);
      });
  });
};