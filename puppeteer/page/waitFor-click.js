const { getValue } = require("../pageutils/getValue");
const { highlightElement } = require("../pageutils/highlightelem");
module.exports = function (RED) {
  function PuppeteerPageWaitForClick(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.payloadTypeSelector = config.payloadTypeSelector;
    this.timeout = config.timeout;
    var node = this;

    // Retrieve the config node
    this.on("input", async function (msg) {
      var data = msg.data;
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "clicking: " + node.selector.toString().substring(0, 10) + "...",
      });

      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      var selector = await getValue(
        this.selector,
        this.payloadTypeSelector,
        msg,
        RED
      );
      highlightElement(puppeteer.page, selector, "click");
      await puppeteer.page
        .waitFor(selector, { timeout: this.timeout })
        .catch((err) => {
          node.status({
            fill: "red",
            shape: "ring",
            text: "stat: " + err.toString().substring(0, 20) + "...",
          });
          node.send([null, msg]);
        });
      await puppeteer.page
        .click(selector)
        .then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.status({
            fill: "green",
            shape: "dot",
            text: "completed",
          });
          node.send([msg, null]);
        })
        .catch((err) => {
          node.error(err);
          node.status({
            fill: "red",
            shape: "ring",
            text: "dyn: " + err.toString().substring(0, 20) + "...",
          });
        });
    });
  }
  RED.nodes.registerType(
    "puppeteer-page-waitFor-click",
    PuppeteerPageWaitForClick
  );
};
