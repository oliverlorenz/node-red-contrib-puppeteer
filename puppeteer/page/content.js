module.exports = function (RED) {
  function PuppeteerPageContent (config) {
    RED.nodes.createNode(this, config)
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.content()
        .then((content) => {
          msg.puppeteer.content = content
          node.send(msg) 
        })  
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-content', PuppeteerPageContent)
}
