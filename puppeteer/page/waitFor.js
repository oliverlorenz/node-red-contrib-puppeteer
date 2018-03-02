module.exports = function (RED) {
  function PuppeteerPageWaitFor (config) {
    RED.nodes.createNode(this, config)
    this.selector = config.selector
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.waitFor(node.selector)
        .then(() => {
          node.send(msg) 
        }) 
        .catch((err) => {
          node.error(err)
        }) 
    })
  }
  RED.nodes.registerType('puppeteer-page-waitFor', PuppeteerPageWaitFor)
}
