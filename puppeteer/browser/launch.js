const puppeteer = require('puppeteer')


module.exports = function (RED) {
  function PuppeteerBrowserLaunch (config) {
    RED.nodes.createNode(this, config)
    this.headless = (config.headless == "1" ? true : false);
    var node = this

    // Retrieve the config node
    this.on('input', function (msg) {
      puppeteer.launch( { headless: node.headless } )
        .then((browser) => {
          msg.puppeteer = {
            browser
          }
          node.send(msg)
        })
    })
  }
  RED.nodes.registerType('puppeteer-browser-launch', PuppeteerBrowserLaunch)
}
