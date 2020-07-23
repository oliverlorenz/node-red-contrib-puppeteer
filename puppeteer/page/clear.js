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
        text: "clicking: " + this.selector.toString().substring(0, 10) + "..."
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      if (this.payloadTypeSelector === "str") {
        puppeteer.page
          .evaluate(selector => {
            document.querySelector(selector).value = ""
          }, this.selector
          ).then(() => {
            globalContext.set("puppeteer", puppeteer);
            node.send(msg);
            node.status({});
          })
          .catch(err => {
            node.error(err);
            node.status({
              fill: "red",
              shape: "ring",
              text: "error: " + err.toString().substring(0, 10) + "..."
            });
          });
      } else {
        var selector;
        RED.util.evaluateNodeProperty(
          this.selector,
          this.payloadTypeSelector,
          this,
          msg,
          function (err, res) {
            if (err) {
              node.error(err.msg);
            } else {
              selector = res;
            }
          }
        );
        console.log("Clearing :", selector);
        puppeteer.page
          .evaluate(selector => {
            document.querySelector(selector).value = ""
          }, selector
          ).then(() => {
            globalContext.set("puppeteer", puppeteer);
            node.send(msg);
            node.status({});
          })
          .catch(err => {
            node.error(err);
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
    }
  }
  RED.nodes.registerType("puppeteer-page-clear", PuppeteerPageClear);
};
