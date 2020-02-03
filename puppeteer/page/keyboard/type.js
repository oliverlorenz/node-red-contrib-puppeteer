module.exports = function(RED) {
  function PuppeteerPageKeyboardType(config) {
    RED.nodes.createNode(this, config);
    // this.text = config.text
    this.payload = config.payload;
    this.payloadType = config.payloadType;
    var node = this;

    //modifying code here
    this.on("input", function(msg) {
      // console.log(this.payloadType, this.payload);
      if (this.payloadType === "str") {
        try {
          // msg.payload = res;
          msg.puppeteer.page.keyboard.type(this.payload).then(() => {
            node.send(msg);
          });
        } catch (err) {
          this.error(err, msg);
        }
      } else {
        RED.util.evaluateNodeProperty(
          this.payload,
          this.payloadType,
          this,
          msg,
          function(err, res) {
            if (err) {
              node.error(err, msg);
            } else {
              console.log("Success:", err, res);
              // msg.payload = res;
              msg.puppeteer.page.keyboard.type(res).then(() => {
                node.send(msg);
              });
            }
          }
        );
      }
    });
    // Retrieve the config node
    // this.on('input', function (msg) {
    //   msg.puppeteer.page.keyboard.type(node.text)
    //     .then(() => {
    //       node.send(msg)
    //     })
    // })
  }
  RED.nodes.registerType(
    "puppeteer-page-keyboard-type",
    PuppeteerPageKeyboardType
  );
};
