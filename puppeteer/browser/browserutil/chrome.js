const open = require('open');
const axios = require('axios');
const os = require("os").platform;

const browser = os === "darwin"? process.env.MAYA_BROWSER_PATH+"Chromium":os === "win32"?"":process.env.MAYA_BROWSER_PATH+"chrome";
const chrome = async () => {
  await open("", { app: [browser, '--remote-debugging-port=9222', '--no-first-run', '--no-default-browser-check'] });
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