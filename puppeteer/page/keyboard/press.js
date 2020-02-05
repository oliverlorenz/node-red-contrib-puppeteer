module.exports = function(RED) {
  function PuppeteerPageKeyboardPress(config) {
    RED.nodes.createNode(this, config);
    this.key = config.key;
    var node = this;

    // Retrieve the config node
    this.on("input", function(msg) {
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      puppeteer.page.keyboard
        .press(node.key)
        .then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.send(msg);
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
      $("#node-input-key").val(this.key);
    }
  }
  RED.nodes.registerType(
    "puppeteer-page-keyboard-press",
    PuppeteerPageKeyboardPress
  );
};
