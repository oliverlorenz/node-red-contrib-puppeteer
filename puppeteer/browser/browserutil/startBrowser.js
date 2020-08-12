
const {chrome, getWsUrl} = require("./chrome");

async function startBrowserAndGetWsEndpoint(){
    await chrome();
    let url = await getWsUrl();
    return url.data.webSocketDebuggerUrl;
}

module.exports = {startBrowserAndGetWsEndpoint};

