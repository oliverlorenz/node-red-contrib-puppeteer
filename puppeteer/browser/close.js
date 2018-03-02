const puppeteer = require('puppeteer')


module.exports = function (RED) {
  function PuppeteerBrowserClose (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.browser.close()
        .then(() => {
          node.send(msg)
        })
    })
  }
  RED.nodes.registerType('puppeteer-browser-close', PuppeteerBrowserClose)
}
