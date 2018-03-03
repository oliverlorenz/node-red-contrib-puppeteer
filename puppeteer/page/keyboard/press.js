module.exports = function (RED) {
  function PuppeteerPageKeyboardPress (config) {
    RED.nodes.createNode(this, config)
    this.key = config.key
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.keyboard.press(node.key)
        .then(() => {
          node.send(msg) 
        })  
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
      $("#node-input-key").val(this.key)
    }
  }
  RED.nodes.registerType('puppeteer-page-keyboard-press', PuppeteerPageKeyboardPress)
}
