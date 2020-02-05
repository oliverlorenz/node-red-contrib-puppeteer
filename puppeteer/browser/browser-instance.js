const puppeteer = require("puppeteer");

module.exports = function(RED) {
  function BrowserInstanceNode(n) {
    RED.nodes.createNode(this, n);
    this.instance = n.instance;
  }
  RED.nodes.registerType("browser-instance", BrowserInstanceNode);
};
