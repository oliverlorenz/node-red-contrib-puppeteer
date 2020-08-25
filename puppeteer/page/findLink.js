const { getValue } = require("../pageutils/getValue");
module.exports = function (RED) {
  function PuppeteerPageFindLink(config) {
    RED.nodes.createNode(this, config);
    this.find = config.find;
    this.wait = config.wait;
    this.selector = config.selector;
    this.payloadTypeFind = config.payloadTypeFind;
    this.payloadTypeSelector = config.payloadTypeSelector;
    var node = this;

    // Retrieve the config node
    this.on("input", async function (msg) {
      var data = msg.data;

      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      let selector = await getValue(
        this.selector,
        this.payloadTypeSelector,
        msg,
        RED
      );
      let find = await getValue(this.find, this.payloadTypeFind, msg, RED);
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "clicking: " + find.toString().substring(0, 10) + "...",
      });
      await puppeteer.page.waitFor(this.wait).catch((err) => {
        node.status({
          fill: "red",
          shape: "ring",
          text: "error: " + err.toString().substring(0, 10) + "...",
        });
        node.send([null, msg]);
      });
      await puppeteer.page
        .evaluate(
          async ({ selector, find }) => {
            [...document.querySelectorAll(selector)]
              .find((element) => element.textContent === find)
              .click();
          },
          {
            selector: selector,
            find: find,
          }
        )
        .then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.send([msg, null]);
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
  }
  RED.nodes.registerType("puppeteer-page-find-link", PuppeteerPageFindLink);
};
