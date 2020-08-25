const { getValue } = require("../pageutils/getValue");
module.exports = function (RED) {
  function PuppeteerPageClear(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.payloadTypeSelector = config.payloadTypeSelector;
    var node = this;

    // Retrieve the config node
    this.on("input", function (msg) {
      var data = msg.data;
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "clicking: " + this.selector.toString().substring(0, 10) + "...",
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      let selector = await getValue(
        this.selector,
        this.payloadTypeSelector,
        msg,RED
      );
      puppeteer.page
          .evaluate((selector) => {
            document.querySelector(selector).value = "";
          }, selector)
          .then(() => {
            globalContext.set("puppeteer", puppeteer);
            node.send(msg);
            node.status({});
          })
          .catch((err) => {
            node.error(err);
            node.status({
              fill: "red",
              shape: "ring",
              text: "error: " + err.toString().substring(0, 10) + "...",
            });
          });
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-clear", PuppeteerPageClear);
};
