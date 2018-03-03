module.exports = function (RED) {
  function PuppeteerPageClose (config) {
    RED.nodes.createNode(this, config)
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.close()
        .then((page) => {
          node.send(msg) 
        })  
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-close', PuppeteerPageClose)
}
