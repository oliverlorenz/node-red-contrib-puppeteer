module.exports = function (RED) {
  function PuppeteerPageClick (config) {
    RED.nodes.createNode(this, config)
    this.selector = config.selector
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.click(node.selector)
        .then(() => {
          node.send(msg) 
        })  
        .catch((err) => {
          node.error(err)
        })
    })
  }
  RED.nodes.registerType('puppeteer-page-click', PuppeteerPageClick)
}
