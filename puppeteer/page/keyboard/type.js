module.exports = function (RED) {
  function PuppeteerPageKeyboardType (config) {
    RED.nodes.createNode(this, config)
    this.text = config.text
    this.payload = config.payload;
    this.payloadType = config.payloadType;
    var node = this

    //modifying code here
    this.on("input",function(msg) {
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
                  msg.puppeteer.page.keyboard.type(node.text)
                  .then(() => {
                  node.send(msg) 
                }) 
              }

          });
      }
  });

  oneditprepare: function oneditprepare() {
    $("#node-input-payload").val(this.name)
  }
    
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
