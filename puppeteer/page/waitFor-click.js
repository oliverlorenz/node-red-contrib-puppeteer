module.exports = function (RED) {
  function PuppeteerPageWaitForClick(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.payloadTypeSelector = config.payloadTypeSelector;
    this.timeout = config.timeout
    var node = this;

    // Retrieve the config node
    this.on("input", async function (msg) {
      var data = msg.data;
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "clicking: " + node.selector.toString().substring(0, 10) + "..."
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");

      if (this.payloadTypeSelector === "str") {
        await puppeteer.page
          .waitFor(this.selector, { timeout: this.timeout })
          .catch(err => {
            node.status({
              fill: "red",
              shape: "ring",
              text: "stat: "+err.toString().substring(0, 20) + "..."
            });
            node.send([null, msg]);
          });
        puppeteer.page
          .click(this.selector)
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
              text: "dyn: "+err.toString().substring(0, 20) + "..."
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
        await puppeteer.page
          .waitFor(selector, { timeout: this.timeout })
          .catch(err => {
            node.status({
              fill: "red",
              shape: "ring",
              text: "error: " + err.toString().substring(0, 10) + "..."
            });
            node.send([null, msg]);
          });
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
  }
  RED.nodes.registerType("puppeteer-page-waitFor-click", PuppeteerPageWaitForClick);
};
