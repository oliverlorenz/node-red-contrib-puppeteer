const puppeteer = require('puppeteer')


module.exports = function (RED) {
  function PuppeteerBrowserClose (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    var node = this

    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.browser.close()
        .then(() => {
          node.send(msg)
        })
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-browser-close', PuppeteerBrowserClose)
}
