module.exports = function (RED) {
    function PuppeteerDocumentSelectorInjector(config) {

        RED.nodes.createNode(this, config);
        this.selector = config.selector;
        this.injectValue = config.injectValue;
        this.payloadTypeSelector = config.payloadTypeSelector;
        this.payloadTypeInjectValue = config.payloadTypeInjectValue;
        var node = this;

        // Retrieve the config node

        this.on("input", async function (msg) {
            var data = msg.data;
            // console.log(this.payloadType, this.payload);
            var globalContext = this.context().global;
            let puppeteer = globalContext.get("puppeteer");

            if (this.payloadTypeSelector === "str" && this.payloadTypeInjectValue === "str") {
                // msg.payload = res;
                node.status({
                    fill: "yellow",
                    shape: "dot",
                    text: "typing: " + this.injectValue.toString().substring(0, 10) + "..."
                });
                await puppeteer.page
                    .evaluate(
                        async ({ selector, injectValue }) => {
                            document.querySelector(selector).value = await injectValue;
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
                        node.status({})
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
                            if(this.payloadTypeSelector === "str"){
                                selector = this.selector;
                            } else {
                            node.error(err.msg);
                            }
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
                            if(this.payloadTypeInjectValue === "str"){
                                injectValue = this.injectValue;
                            } else {
                            node.error(err.msg);
                            }
                        } else {
                            injectValue = res;
                        }
                    }
                );

                console.log(selector, injectValue);
                await puppeteer.page
                    .evaluate(
                        async ({ selector, injectValue }) => {
                            document.querySelector(selector).value = await injectValue;
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
        PuppeteerDocumentSelectorInjector
    );
};
