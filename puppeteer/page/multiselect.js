const { getValue } = require("../pageutils/getValue");

module.exports = function (RED) {
  function PuppeteerDocumentArraySelector(config) {
    const arraySelect = require("../pageutils/arrayselect");
    const {
      highlightElem,
    } = require("maya-red-browser/puppeteer/pageutils/highlightelem");
    RED.nodes.createNode(this, config);
    this.selector1 = config.selector1;
    this.selector2 = config.selector2;
    this.payloadTypeSelector = config.payloadTypeSelector;
    this.property = config.property;
    this.payloadTypeProperty = config.payloadTypeProperty;
    this.header = config.header;
    var node = this;
    // Retrieve the config node
    this.on("input", async function (msg) {
      var data = msg.data;
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");

      let selector1 = await getValue(
        this.selector1,
        this.payloadTypeSelector,
        msg,
        RED
      );
      let selector2 = await getValue(
        this.selector2,
        this.payloadTypeSelector,
        msg,
        RED
      );

      let selector_n = arraySelect(selector1, selector2);
      puppeteer.page
        .evaluate(
          async ({ selector, property }) => {
            let elements = Array.from(document.querySelectorAll(selector));
            let properties = elements.map((element) => {
              return element[property];
            });
            return properties;
          },
          {
            selector: selector_n,
            property: this.property,
          }
        )
        .then((payload) => {
          globalContext.set("puppeteer", puppeteer);
          msg.payload = {
            [this.header]: payload,
          };
          node.status({
            fill: "green",
            shape: "dot",
            text: "completed..",
          });
          node.send([msg]);
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
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
      $("#node-input-selector").val(this.selector);
      $("#node-input-property").val(this.property);
    }
  }
  RED.nodes.registerType(
    "puppeteer-page-multiselect",
    PuppeteerDocumentArraySelector
  );
};
