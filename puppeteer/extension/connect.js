const controlServer = process.env.BROWSER_CONTROL ? process.env.BROWSER_CONTROL : "http://localhost:8080";
// const {MayaClient}  = require("./utils/index");
// console.log(MayaClient);

const APIFetch = require("./utils/api");
const { v4: uuidv4 } = require("uuid");

class BrowserPage {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.id = uuidv4();
  }
  async goto(url, timeout) {
    return new Promise((resolve, reject) => {
      APIFetch(this.serverUrl + "/api", "post", {
        type: "goto",
        payload: { url: url },
        timeout: timeout || 2000,
      })
        .then((result) => {
          console.log("Goto:", result.data);
          resolve(result);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
  async click(selector, timeout) {
    return new Promise((resolve, reject) => {
      APIFetch(this.serverUrl + "/api", "post", {
        type: "click",
        payload: { selector: selector },
        timeout: timeout || 1000,
      })
        .then((result) => {
          console.log("Click:", result.data);
          resolve(result);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
  async type(selector, text, timeout) {
    return new Promise((resolve, reject) => {
      APIFetch(this.serverUrl + "/api", "post", {
        type: "type",
        payload: { selector: selector, text: text },
        timeout: timeout || 1000,
      })
        .then((result) => {
          console.log("Type:", result.data);
          resolve(result);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
  async clear(selector, text, timeout) {
    return new Promise((resolve, reject) => {
      APIFetch(this.serverUrl + "/api", "post", {
        type: "clear",
        payload: { selector: selector, text: "" },
        timeout: timeout || 1000,
      })
        .then((result) => {
          console.log("Clear:", result.data);
          resolve(result);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
}

class Browser {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.id = uuidv4();
  }
  async newPage() {
    return new BrowserPage(this.serverUrl);
  }
}

class MayaClient {
  constructor() {
    this.serverUrl = null;
  }
  async launch(serverUrl) {
    this.serverUrl = serverUrl;
    // return new Browser(serverUrl);
    return new Promise((resolve, reject) => {
      APIFetch(this.serverUrl + "/api", "post", {
        type: "launch",
      })
        .then((result) => {
          console.log("Launch", result.data);
          if (result.data.status === "running") {
            let browser = new Browser(serverUrl);
            resolve(browser);
          } else {
            reject("Browser not available at ", serverUrl);
          }
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

let maya = new MayaClient()

module.exports = function (RED) {
	function MayaBrowserConnect(config) {
		RED.nodes.createNode(this, config);
    this.name = config.name;
    this.timeout = config.timeout;
		var node = this;
		node.status({
			fill: "red",
			shape: "dot",
			text: "not launched",
		});

		// Retrieve the config node
		this.on("input", function (msg) {
			node.status({
				fill: "yellow",
				shape: "dot",
				text: "launching",
			});
			var globalContext = this.context().global;
			var checkMaya = globalContext.get("maya");
			if (checkMaya) {
				// checkPuppeteer.browser.close();
				globalContext.set("maya", { browser: checkMaya.browser });
				node.send(msg);
				node.status({
					fill: "green",
					shape: "dot",
					text: "connected",
				});
			} else {
				maya
					.launch(controlServer, this.timeout)
					.then(async (browser) => {
            browser.page = await browser.newPage();
						globalContext.set("maya", {browser});
						node.send(msg);
						node.status({
							fill: "green",
							shape: "dot",
							text: "connected",
						});
					})
					.catch((err) => {
						this.log(err);
						node.status({
							fill: "red",
							shape: "ring",
							text: "error: " + err.toString().substring(0, 10) + "...",
						});
					});
			}
		});
		oneditprepare: function oneditprepare() {
			$("#node-input-headless").val(this.headless === true ? "1" : "0");
			$("#node-input-slowMo").val(this.slowMo);
			$("#node-input-name").val(this.name);
		}
	}
	RED.nodes.registerType("maya-browser-connect", MayaBrowserConnect);
};
