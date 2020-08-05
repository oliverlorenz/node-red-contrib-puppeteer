module.exports = function (RED) {
  function MayaBrowserOpen(config) {
    RED.nodes.createNode(this, config);
    this.url = config.url;
    this.payloadTypeUrl = config.payloadTypeUrl;
    var node = this;

    // Retrieve the config node
    this.on("input", function (msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "going to: " + node.url !== "" ? node.url.toString().substring(0, 15) : msg.url.toString().substring(0, 15) + "..."
      });
      var globalContext = this.context().global;
      let maya = globalContext.get("maya");
      console.log(maya);
      if (this.payloadTypeUrl === "str") {
        maya.page.goto(node.url)
          .then(() => {
            globalContext.set("maya", maya);
            node.send(msg);
            node.status({
              fill: "green",
              shape: "dot",
              text: "completed"
            });
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
        var url;
        RED.util.evaluateNodeProperty(
          this.url,
          this.payloadTypeUrl,
          this,
          msg,
          function (err, res) {
            if (err) {
              node.error(err.msg);
            } else {
              url = res;
            }
          }
        );
        maya.page
          .goto(url)
          .then(() => {
            globalContext.set("maya", maya);
            node.send(msg);
            node.status({
              fill: "green",
              shape: "dot",
              text: "completed"
            });
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
  RED.nodes.registerType("maya-browser-open", MayaBrowserOpen);
};
