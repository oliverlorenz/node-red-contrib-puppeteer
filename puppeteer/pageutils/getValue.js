async function getValue(value, valueType, msg, RED) {
  return new Promise(function (resolve, reject) {
    if (valueType === "str" || valueType === "number") {
      resolve(value);
    } else {
      RED.util.evaluateNodeProperty(value, valueType, this, msg, function (
        err,
        res
      ) {
        if (err) {
          node.error(err.msg);
          reject(err.msg);
        } else {
          resolve(res);
        }
      });
    }
  });
}

module.exports = { getValue };
