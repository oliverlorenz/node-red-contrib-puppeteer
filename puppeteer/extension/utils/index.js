// const APIFetch = require("./api");
// const { v4: uuidv4 } = require("uuid");

// class BrowserPage {
//   constructor(serverUrl) {
//     this.serverUrl = serverUrl;
//     this.id = uuidv4();
//   }
//   async goto(url, timeout) {
//     return new Promise((resolve, reject) => {
//       APIFetch(this.serverUrl + "/api", "post", {
//         type: "goto",
//         payload: { url: url },
//         timeout: timeout || 2000,
//       })
//         .then((result) => {
//           console.log("Goto:", result.data);
//           resolve(result);
//         })
//         .catch(({ response }) => {
//           reject(response);
//         });
//     });
//   }
//   async click(selector, timeout) {
//     return new Promise((resolve, reject) => {
//       APIFetch(this.serverUrl + "/api", "post", {
//         type: "click",
//         payload: { selector: selector },
//         timeout: timeout || 1000,
//       })
//         .then((result) => {
//           console.log("Click:", result.data);
//           resolve(result);
//         })
//         .catch(({ response }) => {
//           reject(response);
//         });
//     });
//   }
//   async type(selector, text, timeout) {
//     return new Promise((resolve, reject) => {
//       APIFetch(this.serverUrl + "/api", "post", {
//         type: "type",
//         payload: { selector: selector, text: text },
//         timeout: timeout || 1000,
//       })
//         .then((result) => {
//           console.log("Type:", result.data);
//           resolve(result);
//         })
//         .catch(({ response }) => {
//           reject(response);
//         });
//     });
//   }
//   async clear(selector, text, timeout) {
//     return new Promise((resolve, reject) => {
//       APIFetch(this.serverUrl + "/api", "post", {
//         type: "clear",
//         payload: { selector: selector, text: text },
//         timeout: timeout || 1000,
//       })
//         .then((result) => {
//           console.log("Clear:", result.data);
//           resolve(result);
//         })
//         .catch(({ response }) => {
//           reject(response);
//         });
//     });
//   }
// }

// class Browser {
//   constructor(serverUrl) {
//     this.serverUrl = serverUrl;
//     this.id = uuidv4();
//   }
//   async newPage() {
//     return new BrowserPage(this.serverUrl);
//   }
// }

// class MayaClient {
//   constructor() {
//     this.serverUrl = null;
//   }
//   async launch(serverUrl) {
//     this.serverUrl = serverUrl;
//     // return new Browser(serverUrl);
//     return new Promise((resolve, reject) => {
//       APIFetch(this.serverUrl + "/api", "post", {
//         type: "launch",
//       })
//         .then((result) => {
//           console.log("Launch", result.data);
//           if (result.data.status === "running") {
//             let browser = new Browser(serverUrl);
//             resolve(browser);
//           } else {
//             reject("Browser not available at ", serverUrl);
//           }
//         })
//         .catch(({ response }) => {
//           reject(response);
//         });
//     });
//   }
// };

// module.exports = MayaClient;
