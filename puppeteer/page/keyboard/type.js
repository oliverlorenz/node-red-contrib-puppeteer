const { getValue } = require("../../pageutils/getValue");
const { highlightElement } = require("../../pageutils/highlightelem");
module.exports = function (RED) {
  function PuppeteerPageKeyboardType(config) {
    RED.nodes.createNode(this, config);
    // this.text = config.text
    this.payload = config.payload;
    this.payloadType = config.payloadType;
    this.selector = config.selector;
    this.selectorType = config.selectorType;
    this.timeout = config.timeout;
    var node = this;

    //modifying code here
    this.on("input", async function (msg) {
      var data = msg.data;
      // console.log(this.payloadType, this.payload);
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      let payload = await getValue(this.payload, this.payloadType, msg, RED);
      let selector = await getValue(this.selector, this.selectorType, msg, RED);

      node.status({
        fill: "yellow",
        shape: "dot",
        text: "typing: " + payload.toString().substring(0, 10) + "...",
      });

      highlightElement(puppeteer.page, selector, "type");
      puppeteer.page.keyboard
        .type(payload)
        .then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.send(msg);
          node.status({});
        })
        .catch((err) => {
          console.log(err);
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "...",
          });
        });
    });
    // Retrieve the config node
    // this.on('input', function (msg) {
    //   msg.puppeteer.page.keyboard.type(node.text)
    //     .then(() => {
    //       node.send(msg)
    //     })
    // })
  }
  RED.nodes.registerType(
    "puppeteer-page-keyboard-type",
    PuppeteerPageKeyboardType
  );
};
