module.exports = function (RED) {
  function PuppeteerPageClick(config) {
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
        text: "clicking: " + node.selector.toString().substring(0, 10) + "..."
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      if (this.payloadTypeSelector === "str") {
        puppeteer.page
          .click(node.selector)
          .then(() => {
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
        puppeteer.page
          .click(selector)
          .then(() => {
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
  RED.nodes.registerType("puppeteer-page-click", PuppeteerPageClick);
};
