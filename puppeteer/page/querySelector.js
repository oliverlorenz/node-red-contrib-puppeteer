module.exports = function (RED) {
  function PuppeteerDocumentQuerySelector(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.payloadTypeSelector = config.payloadTypeSelector;
    this.property = config.property;
    this.payloadTypeProperty = config.payloadTypeProperty;
    var node = this;

    // Retrieve the config node
    this.on("input", function (msg) {
      var data = msg.data;
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      if (this.payloadTypeSelector === "str" && this.payloadTypeProperty === "str") {
        puppeteer.page
          .evaluate(
            ({ selector, property }) => {
              return document.querySelector(selector)[property];
            },
            {
              selector: this.selector,
              property: this.property
            }
          )
          .then((payload) => {
            globalContext.set("puppeteer", puppeteer);
            msg.payload = payload;
            node.send([msg, msg, msg]);
          })
          .catch(err => {
            node.status({
              fill: "red",
              shape: "ring",
              text: "error: " + err.toString().substring(0, 10) + "..."
            });
          });
      }
      else {
        var selector, property;
        RED.util.evaluateNodeProperty(
          this.selector,
          this.payloadTypeSelector,
          this,
          msg,
          function (err, res) {
            if (err) {
              if (this.payloadTypeSelector === "str") {
                selector = res;
              } else {
                node.error(err.msg);
              }
            } else {
              selector = res;
            }
          }
        );
        RED.util.evaluateNodeProperty(
          this.property,
          this.payloadTypeSelector,
          this,
          msg,
          function (err, res) {
            if (err) {
              if (this.payloadTypeProperty === "str") {
                property = res;
              } else {
                node.error(err.msg);
              }
            } else {
              property = res;
            }
          }
        );
        puppeteer.page
          .evaluate(
            ({ selector, property }) => {
              return document.querySelector(selector)[property];
            },
            {
              selector: selector,
              property: property
            }
          )
          .then(payload => {
            globalContext.set("puppeteer", puppeteer);
            msg.payload = payload;
            node.send([msg, msg, msg]);
          })
          .catch(err => {
            node.status({
              fill: "red",
              shape: "ring",
              text: "error: " + err.toString().substring(0, 10) + "..."
            });
          });
      }
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
