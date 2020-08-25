const { getValue } = require("../pageutils/getValue");
module.exports = function (RED) {
  function PuppeteerPageGoto(config) {
    RED.nodes.createNode(this, config);
    this.url = config.url;
    this.payloadTypeUrl = config.payloadTypeUrl;
    var node = this;

    // Retrieve the config node
    this.on("input", async function (msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text:
          "going to: " + node.url !== ""
            ? node.url.toString().substring(0, 15)
            : msg.url.toString().substring(0, 15) + "...",
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      let url = await getValue(this.url, this.payloadTypeUrl, msg);
      puppeteer.page
        .goto(url)
        .then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.send(msg);
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
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-goto", PuppeteerPageGoto);
};
