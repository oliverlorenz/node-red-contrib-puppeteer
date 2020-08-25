const { getValue } = require("../pageutils/getValue");
const { highlightElement } = require("../pageutils/highlightelem");
module.exports = function (RED) {
  function PuppeteerDocumentQuerySelector(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.payloadTypeSelector = config.payloadTypeSelector;
    this.property = config.property;
    this.payloadTypeProperty = config.payloadTypeProperty;
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
      let property = await getValue(
        this.property,
        this.payloadTypeProperty,
        msg,
        RED
      );

      highlightElement(puppeteer.page, selector, "get property");
      puppeteer.page
        .evaluate(
          ({ selector, property }) => {
            return document.querySelector(selector)[property];
          },
          {
            selector: selector,
            property: property,
          }
        )
        .then((payload) => {
          globalContext.set("puppeteer", puppeteer);
          msg.payload = payload;
          node.send([msg, msg, msg]);
        })
        .catch((err) => {
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "...",
          });
        });
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
      $("#node-input-selector").val(this.selector);
      $("#node-input-property").val(this.property);
    }
  }
  RED.nodes.registerType(
    "puppeteer-page-document-querySelector",
    PuppeteerDocumentQuerySelector
  );
};
