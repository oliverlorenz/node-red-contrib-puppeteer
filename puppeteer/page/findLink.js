module.exports = function (RED) {
  function PuppeteerPageFindLink(config) {
    RED.nodes.createNode(this, config);
    this.find = config.find;
    this.wait = config.wait;
    this.selector = config.selector;
    this.payloadTypeFind = config.payloadTypeFind;
    this.payloadTypeSelector = config.payloadTypeSelector;
    var node = this;

    // Retrieve the config node
    this.on("input", async function (msg) {
      var data = msg.data;
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "clicking: " + this.find.toString().substring(0, 10) + "..."
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");

      if (this.payloadTypeFind === "str" && this.payloadTypeSelector === "str") {
        await puppeteer.page.
          waitFor(this.wait)
          .catch(err => {
            node.status({
              fill: "red",
              shape: "ring",
              text: "status: " + err.toString().substring(0, 20) + "..."
            });
            node.send([null, msg]);
          });

        await puppeteer.page.evaluate(() => {
          [...document.querySelectorAll(this.selector)].find(element => element.textContent === this.find).click();
        }).then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.send([msg, null]);
          node.status(
            {
              fill: "green",
              shape: "dot",
              text: "complete"
            }
          )
        }).catch(err => {
          node.error(err);
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "..."
          });
        });
      }
      else {
        var find, selector;
        RED.util.evaluateNodeProperty(
          this.selector,
          this.payloadTypeSelector,
          this,
          msg,
          function (err, res) {
              if (err) {
                if(this.payloadTypeSelector === "str"){
                  selector = this.selector;
                } else {
                  node.error(err.msg);
                }
              } else {
                  selector = res;
              }
          }
        );
        RED.util.evaluateNodeProperty(
          this.find,
          this.payloadTypeFind,
          this,
          msg,
          function (err, res) {
            if (err) {
              if(this.payloadTypeFind === "str"){
                find = this.find;
              } else {
              node.error(err.msg);
              }
            } else {
              find = res;
            }
          }
        );
        await puppeteer.page
          .waitFor(this.wait)
          .catch(err => {
            node.status({
              fill: "red",
              shape: "ring",
              text: "error: " + err.toString().substring(0, 10) + "..."
            });
            node.send([null, msg]);
          });
        await puppeteer.page.evaluate(
          async({selector, find}) => {
          [...document.querySelectorAll(selector)].find(element => element.textContent === find).click();
          },
          {
            selector: selector,
            find: find
          }
          ).then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.send([msg, null]);
          node.status({
            fill: "green",
            shape: "dot",
            text: "completed"
          });
        }).catch(err => {
          node.error(err);
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "..."
          });
        });

      }
    });
  }
  RED.nodes.registerType("puppeteer-page-find-link", PuppeteerPageFindLink);
};
