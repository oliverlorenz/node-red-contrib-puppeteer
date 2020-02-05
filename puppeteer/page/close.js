module.exports = function(RED) {
  function PuppeteerPageClose(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    // Retrieve the config node
    this.on("input", function(msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "closing page"
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      puppeteer.page
        .close()
        .then(page => {
          globalContext.set("puppeteer", puppeteer);
          node.send(msg);
          node.status({});
        })
        .catch(err => {
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "..."
          });
        });
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-close", PuppeteerPageClose);
};
