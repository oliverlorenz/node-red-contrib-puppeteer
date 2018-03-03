module.exports = function (RED) {
  function PuppeteerPageGoto (config) {
    RED.nodes.createNode(this, config)
    this.url = config.url
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.goto(node.url)
        .then((page) => {
          node.send(msg) 
        })  
        .catch((err) => {
          node.error(err)
        })
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-goto', PuppeteerPageGoto)
}
