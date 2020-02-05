module.exports = function(RED) {
  function PuppeteerPageGoto(config) {
    RED.nodes.createNode(this, config);
    this.url = config.url;
    var node = this;

    // Retrieve the config node
    this.on("input", function(msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "going to: " + node.url.toString().substring(0, 15) + "..."
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      puppeteer.page
        .goto(node.url)
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
          node.error(err);
        });
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-goto", PuppeteerPageGoto);
};
