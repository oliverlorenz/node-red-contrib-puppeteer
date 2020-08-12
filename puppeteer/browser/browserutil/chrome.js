const open = require('open');
const axios = require('axios');
const browser = process.env.MAYA_BROWSER_PATH;
const chrome = async () => {
  await open("", { app: [browser + "chrome", '--remote-debugging-port=9222', '--no-first-run', '--no-default-browser-check'] });
  return await new Promise(r => setTimeout(r, 1000))
};

const getWsUrl = async() => {
  try {
    var response = await axios.get('http://localhost:9222/json/version');
    return response;
  } catch (error) {
    new Promise(r => setTimeout(getWsUrl, 1000))
  }
};

module.exports = {
  chrome,
  getWsUrl
}