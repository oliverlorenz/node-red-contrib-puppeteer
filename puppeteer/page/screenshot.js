module.exports = function (RED) {
  function PuppeteerPageScreenshot(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    // Retrieve the config node
    this.on("input", function (msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "taking screenshot",
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      puppeteer.page.screenshot().then((buffer) => {
        puppeteer.screenshot = buffer;
        msg.screenshot = buffer;
        globalContext.set("puppeteer", puppeteer);
        node.send(msg);
        node.status({});
      });
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-screenshot", PuppeteerPageScreenshot);
};
