const { getValue } = require("../pageutils/getValue");
module.exports = function (RED) {
  function PuppeteerPageFocus(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.payloadTypeSelector = config.payloadTypeSelector;
    var node = this;

    // Retrieve the config node
    this.on("input", async function (msg) {
      var data = msg.data;
      node.status({
        fill: "yellow",
        shape: "dot",
        text:
          "focusing on: " + node.selector.toString().substring(0, 10) + "...",
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      let selector = await getValue(
        this.selector,
        this.payloadTypeSelector,
        msg,
        RED
      );
      puppeteer.page
        .focus(selector)
        .then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.send(msg);
          node.status({
            fill: "green",
            shape: "dot",
            text: "completed",
          });
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
  RED.nodes.registerType("puppeteer-page-focus", PuppeteerPageFocus);
};
