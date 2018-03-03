module.exports = function (RED) {
  function PuppeteerPageScreenshot (config) {
    RED.nodes.createNode(this, config)
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.screenshot()
        .then((buffer) => {
          msg.puppeteer.screenshot = buffer
          node.send(msg) 
        })  
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-screenshot', PuppeteerPageScreenshot)
}
