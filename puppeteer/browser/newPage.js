module.exports = function(RED) {
  function PuppeteerBrowserNewPage(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    // Retrieve the config node
    this.on("input", function(msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "new page"
      });
      msg.puppeteer.browser
        .newPage()
        .then(page => {
          msg.puppeteer.page = page;
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
  RED.nodes.registerType("puppeteer-browser-newPage", PuppeteerBrowserNewPage);
};
