module.exports = function (RED) {
  function MayaBrowserClick(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.payloadTypeSelector = config.payloadTypeSelector;
    this.timeout = config.timeout;
    this.selectorType = config.selectorType;
    var node = this;

    // Retrieve the config node
    this.on("input", async function (msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "clicking...",
      });
      async function getValue(value, valueType, msg) {
        return new Promise(function (resolve, reject) {
          if (valueType === "str") {
            resolve(value);
          } else {
            RED.util.evaluateNodeProperty(
              value,
              valueType,
              this,
              msg,
              function (err, res) {
                if (err) {
                  node.error(err.msg);
                  reject(err.msg);
                } else {
                  resolve(res);
                }
              }
            );
          }
        });
      }
      var globalContext = this.context().global;
      let maya = globalContext.get("maya");
      let clickSelector = await getValue(
        this.selector,
        this.payloadTypeSelector,
        msg
      );
      maya.browser.page
        .click(this.selectorType, clickSelector, this.timeout)
        .then(async () => {
          await globalContext.set("maya", maya);
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
  RED.nodes.registerType("maya-browser-click", MayaBrowserClick);
};
