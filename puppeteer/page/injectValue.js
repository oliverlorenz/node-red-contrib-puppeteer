const { getValue } = require("../pageutils/getValue");
const { highlightElement } = require("../pageutils/highlightelem");

module.exports = function (RED) {
  function PuppeteerDocumentSelectorInjector(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.injectValue = config.injectValue;
    this.payloadTypeSelector = config.payloadTypeSelector;
    this.payloadTypeInjectValue = config.payloadTypeInjectValue;
    var node = this;

    // Retrieve the config node

    this.on("input", async function (msg) {
      var data = msg.data;
      // console.log(this.payloadType, this.payload);
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");

      // msg.payload = res;
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "typing: " + this.injectValue.toString().substring(0, 10) + "...",
      });

      let selector = await getValue(
        this.selector,
        this.payloadTypeSelector,
        msg
      );
      let injectValue = await getValue(
        this.property,
        this.payloadTypeProperty,
        msg
      );

      highlightElement(puppeteer.page, selector, "injectValue");
      await puppeteer.page
        .evaluate(
          async ({ selector, injectValue }) => {
            document.querySelector(selector).value = await injectValue;
          },
          {
            selector: selector,
            injectValue: injectValue,
          }
        )
        .then((payload) => {
          globalContext.set("puppeteer", puppeteer);
          msg.payload = payload;
          node.send([msg, msg, msg]);
          node.status({});
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
      $("#node-input-property").val(this.injectValue);
    }
  }
  RED.nodes.registerType(
    "puppeteer-page-select-inject",
    PuppeteerDocumentSelectorInjector
  );
};
