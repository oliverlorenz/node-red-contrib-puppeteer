const puppeteer = require("puppeteer-core");

module.exports = function (RED) {
  function PuppeteerBrowserLaunch(config) {
    RED.nodes.createNode(this, config);
    this.headless = config.headless == "1" ? true : false;
    this.slowMo = config.slowMo;
    this.name = config.name;
    var node = this;
    node.status({
      fill: "red",
      shape: "dot",
      text: "not launched",
    });

    // Retrieve the config node
    this.on("input", function (msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "launching",
      });
      var globalContext = this.context().global;
      var checkPuppeteer = globalContext.get("puppeteer");
      if (checkPuppeteer) {
        // checkPuppeteer.browser.close();
        globalContext.set("puppeteer", { browser: checkPuppeteer.browser });
        node.send(msg);
        node.status({
          fill: "green",
          shape: "dot",
          text: "connected",
        });
      } else {
        puppeteer
          .launch({
            defaultViewport: null,
            headless: node.headless,
            slowMo: node.slowMo,
            args: ["--user-data-dir"],
            ignoreDefaultArgs: ["--enable-automation"],
          })
          .then((browser) => {
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
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-headless").val(this.headless === true ? "1" : "0");
      $("#node-input-slowMo").val(this.slowMo);
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-browser-launch", PuppeteerBrowserLaunch);
};
