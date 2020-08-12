const puppeteer = require("puppeteer-core");

module.exports = function (RED) {
  function PuppeteerBrowserLaunch(config) {
    const BROWSER_PATH = process.env.MAYA_BROWSER_PATH;
    RED.nodes.createNode(this, config);
    this.headless = config.headless == "1" ? true : false;
    this.slowMo = config.slowMo;
    this.name = config.name;
    var node = this;
    const { startBrowserAndGetWsEndpoint } = require("./browserutil/startBrowser");
    node.status({
      fill: "red",
      shape: "dot",
      text: "not launched",
    });
    // Retrieve the config node
    var globalContext = this.context().global;
    async function setGlobalContextNull(){
      console.log("resetting global context");
      await globalContext.set("puppeteer", null);
      node.status({
        fill: "red",
        shape: "ring",
        text: "disconnected",
      });
    }
    async function startBrowser(globalContext, msg) {
      let wsEndpoint = await startBrowserAndGetWsEndpoint();
      await puppeteer
        .connect({
          browserWSEndpoint: wsEndpoint,
          defaultViewport: null
        })
        .then((browser) => {
          this.browser = browser;
          this.browser.on("disconnected", setGlobalContextNull)
          globalContext.set("puppeteer", { browser });
          node.send(msg);
          node.status({
            fill: "green",
            shape: "dot",
            text: "connected",
          });
        })
        .catch((err) => {
          this.log(err);
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "...",
          });
        });
    }
    this.on("input", async function (msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "launching",
      });
      var checkPuppeteer = globalContext.get("puppeteer");
      if (checkPuppeteer) {
        function restartBrowser(){
          startBrowser(globalContext, msg);
        }
        checkPuppeteer.browser.on("disconnected", restartBrowser);
        globalContext.set("puppeteer", { browser: checkPuppeteer.browser });
        node.send(msg);
        node.status({
          fill: "green",
          shape: "dot",
          text: "connected",
        });
    } else {
      startBrowser(globalContext, msg);
    }
    });
  oneditprepare: function oneditprepare() {
    $("#node-input-headless").val(this.headless === true ? "1" : "0");
    $("#node-input-slowMo").val(this.slowMo);
    $("#node-input-name").val(this.name);
  }
}

RED.nodes.registerType("puppeteer-browser-launch", PuppeteerBrowserLaunch);
};
