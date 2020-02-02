module.exports = function (RED) {
  function PuppeteerPageKeyboardType (config) {
    RED.nodes.createNode(this, config)
    this.text = config.text
    var node = this

    //modifying code here
    this.on("input",function(msg) {
      msg.topic = this.topic;
      if (this.payloadType !== 'flow' && this.payloadType !== 'global') {
          try {
              if ( (this.payloadType == null && this.payload === "") || this.payloadType === "date") {
                  msg.payload = Date.now();
              } else if (this.payloadType == null) {
                  msg.payload = this.payload;
              } else if (this.payloadType === 'none') {
                  msg.payload = "";
              } else {
                  msg.payload = RED.util.evaluateNodeProperty(this.payload,this.payloadType,this,msg);
              }
              this.send(msg);
              msg = null;
          } catch(err) {
              this.error(err,msg);
          }
      } else {
          RED.util.evaluateNodeProperty(this.payload,this.payloadType,this,msg, function(err,res) {
              if (err) {
                  node.error(err,msg);
              } else {
                  msg.payload = res;
                  node.send(msg);
              }

          });
      }
  });
    
    // Retrieve the config node
    this.on('input', function (msg) {
      msg.puppeteer.page.keyboard.type(node.text)
        .then(() => {
          node.send(msg) 
        })  
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-keyboard-type', PuppeteerPageKeyboardType)
}
