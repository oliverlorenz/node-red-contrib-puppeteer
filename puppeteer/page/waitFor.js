module.exports = function(RED) {
  function PuppeteerPageWaitFor(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.timeout = config.timeout;
    var node = this;

    // Retrieve the config node
    this.on("input", function(msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "finding: " + node.selector.toString().substring(0, 10) + "..."
      });
      msg.puppeteer.page
        .waitFor(node.selector, { timeout: this.timeout })
        .then(() => {
          node.send([msg, null]);
          node.status({});
        })
        .catch(err => {
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "..."
          });
          node.send([null, msg]);
        });
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-waitFor", PuppeteerPageWaitFor);
};
