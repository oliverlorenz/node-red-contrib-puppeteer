module.exports = function (RED) {
    function PuppeteerDocumentQuerySelector(config) {

        RED.nodes.createNode(this, config);
        this.selector = config.selector;
        this.injectValue = config.injectValue;
        this.payloadTypeSelector = config.payloadTypeSelector;
        this.payloadTypeInjectValue = config.payloadTypeInjectValue;
        var node = this;

        // Retrieve the config node

        this.on("input", function (msg) {
            var data = msg.data;
            // console.log(this.payloadType, this.payload);
            var globalContext = this.context().global;
            let puppeteer = globalContext.get("puppeteer");

            if (this.payloadType === "str") {
                // msg.payload = res;
                node.status({
                    fill: "yellow",
                    shape: "dot",
                    text: "typing: " + this.injectValue.toString().substring(0, 10) + "..."
                });
                puppeteer.page
                    .evaluate(
                        ({ selector, injectValue }) => {
                            document.querySelector(selector).value = injectValue;
                        },
                        {
                            selector: this.selector,
                            injectValue: this.injectValue
                        }
                    )
                    .then(payload => {
                        globalContext.set("puppeteer", puppeteer);
                        msg.payload = payload;
                        node.send([msg, msg, msg]);
                    })
                    .catch(err => {
                        node.status({
                            fill: "red",
                            shape: "ring",
                            text: "error: " + err.toString().substring(0, 10) + "..."
                        });
                    });
            } else {
                var selector, injectValue;
                RED.util.evaluateNodeProperty(
                    this.selector,
                    this.payloadTypeSelector,
                    this,
                    msg,
                    function (err, res) {
                        if (err) {
                            node.error(err.msg);
                        } else {
                            selector = res;
                        }
                    }
                );
                RED.util.evaluateNodeProperty(
                    this.injectValue,
                    this.payloadTypeInjectValue,
                    this,
                    msg,
                    function (err, res) {
                        if (err) {
                            node.error(err.msg);
                        } else {
                            injectValue = res;
                        }
                    }
                );

                console.log(selector, injectValue);
                puppeteer.page
                    .evaluate(
                        ({ selector, injectValue }) => {
                            document.querySelector(selector).value = injectValue;
                        },
                        {
                            selector: selector,
                            injectValue: injectValue
                        }
                    ).then(() => {
                        globalContext.set("puppeteer", puppeteer);
                        node.send(msg);
                        node.status({});
                    })
                    .catch(err => {
                        console.log(err);
                        node.status({
                            fill: "red",
                            shape: "ring",
                            text: "error: " + err.toString().substring(0, 10) + "..."
                        });
                    });
            }
        });
        oneditprepare: function oneditprepare() {
            $("#node-input-name").val(this.name);
            $("#node-input-selector").val(this.selector);
            $("#node-input-property").val(this.injectValue);
        }
    }
    RED.nodes.registerType(
        "puppeteer-page-select-inject",
        PuppeteerDocumentQuerySelector
    );
};
