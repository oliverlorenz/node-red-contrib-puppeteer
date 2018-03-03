module.exports = function (RED) {
  function PuppeteerBrowserNewPage (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.browser.newPage()
        .then((page) => {
          msg.puppeteer.page = page
          node.send(msg) 
        })  
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-browser-newPage', PuppeteerBrowserNewPage)
}
