module.exports = function (RED) {
  function PuppeteerPageKeyboardType (config) {
    RED.nodes.createNode(this, config)
    this.text = config.text
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.keyboard.type(node.text)
        .then(() => {
          node.send(msg) 
        })  
    })
  }
  RED.nodes.registerType('puppeteer-page-keyboard-type', PuppeteerPageKeyboardType)
}
