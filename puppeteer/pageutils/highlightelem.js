function highlightElem(document, elm, event) {
  const styles = elm.getBoundingClientRect();
  let bound = document.createElement("div");
  let label = document.createElement("div");
  label.className = "anotherClassLabel";
  label.innerText = event;
  label.style.position = "absolute";
  label.style.content = "";
  label.style.height = `${15 + "px"}`;
  label.style.width = `${30 + "px"}`;
  label.style.top = `${styles.top - 15 + "px"}`;
  label.style.right = `${styles.right + "px"}`;
  label.style.bottom = `${styles.bottom - 15 + "px"}`;
  label.style.left = `${styles.left + "px"}`;
  label.style.background = "#1a73e8";
  label.style.color = "white";
  label.style.display = "flex";
  label.style.alignItems = "center";
  label.style.justifyContent = "center";
  label.style.fontSize = "70%";
  label.style.zIndex = "100000001";
  label.style.opacity = "0.85";
  label.style.paddingLeft = "4px";
  label.style.paddingRight = "4px";
  label.style.pointerEvents = "none";
  label.style.borderRadius = "1px 1px 0px 0px";
  let box = document.createElement("div");
  box.className = "anotherClassBox";
  box.style.position = "absolute";
  box.style.content = "";
  box.style.height = `${styles.height + "px"}`;
  box.style.width = `${styles.width + "px"}`;
  box.style.top = `${styles.top + "px"}`;
  box.style.right = `${styles.right + "px"}`;
  box.style.bottom = `${styles.bottom + "px"}`;
  box.style.left = `${styles.left + "px"}`;
  box.style.background = "#09c";
  box.style.zIndex = "100000001";
  box.style.pointerEvents = "none";
  box.style.opacity = "0.25";
  box.style.borderRadius = "0px 5px 5px 5px";

  bound.appendChild(box);
  bound.appendChild(label);
  document.body.appendChild(bound);
  setTimeout(() => {
    bound.parentNode.removeChild(bound);
  }, 1000);
}

function deHighlightElem(document) {
  const anotherClass = document.getElementsByClassName("anotherClass");
  if (anotherClass) {
    anotherClass.parentNode.removeChild(anotherClass);
  }
}

const highlightPrompt = async (page, selector, prompt) => {
  await page.evaluate(
    ({ selector, prompt }) => {
      let elem = document.querySelector(selector);
      const styles = elem.getBoundingClientRect();
      let bound = document.createElement("div");
      elem.onclick = function () {
        bound.parentNode.removeChild(bound);
      };
      let label = document.createElement("div");
      label.className = "anotherClassLabel";
      label.innerText = prompt;
      label.style.position = "absolute";
      label.style.content = "";
      label.style.height = `${15 + "px"}`;
      label.style.width = `${150 + "px"}`;
      label.style.top = `${styles.top - 15 + "px"}`;
      label.style.right = `${styles.right + "px"}`;
      label.style.bottom = `${styles.bottom - 15 + "px"}`;
      label.style.left = `${styles.left + "px"}`;
      label.style.background = "rgb(30, 173, 4)";
      label.style.color = "white";
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.justifyContent = "center";
      label.style.fontSize = "70%";
      label.style.zIndex = "100000001";
      label.style.opacity = "0.85";
      label.style.paddingLeft = "4px";
      label.style.paddingRight = "4px";
      label.style.pointerEvents = "none";
      label.style.borderRadius = "1px 1px 0px 0px";
      let box = document.createElement("div");
      box.className = "anotherClassBox";
      box.style.position = "absolute";
      box.style.content = "";
      box.style.height = `${styles.height + "px"}`;
      box.style.width = `${styles.width + "px"}`;
      box.style.top = `${styles.top + "px"}`;
      box.style.right = `${styles.right + "px"}`;
      box.style.bottom = `${styles.bottom + "px"}`;
      box.style.left = `${styles.left + "px"}`;
      box.style.background = "rgb(30, 173, 4)";
      box.style.zIndex = "100000001";
      box.style.pointerEvents = "none";
      box.style.opacity = "0.25";
      box.style.borderRadius = "0px 5px 5px 5px";
      bound.appendChild(box);
      bound.appendChild(label);
      document.body.appendChild(bound);
    },
    { selector, prompt }
  );
};

const highlightElement = async (page, selector, event) => {
  if (page) {
    await page.evaluate(
      ({ selector, event }) => {
        let elem = document.querySelector(selector);
        if (elem) {
          const styles = elem.getBoundingClientRect();
          let bound = document.createElement("div");
          let label = document.createElement("div");
          label.className = "anotherClassLabel";
          label.innerText = event || "event";
          label.style.position = "absolute";
          label.style.content = "";
          label.style.height = `${15 + "px"}`;
          label.style.width = `${30 + "px"}`;
          label.style.top = `${styles.top - 15 + "px"}`;
          label.style.right = `${styles.right + "px"}`;
          label.style.bottom = `${styles.bottom - 15 + "px"}`;
          label.style.left = `${styles.left + "px"}`;
          label.style.background = "#1a73e8";
          label.style.color = "white";
          label.style.display = "flex";
          label.style.alignItems = "center";
          label.style.justifyContent = "center";
          label.style.fontSize = "70%";
          label.style.zIndex = "100000001";
          label.style.opacity = "0.85";
          label.style.paddingLeft = "4px";
          label.style.paddingRight = "4px";
          label.style.pointerEvents = "none";
          label.style.borderRadius = "1px 1px 0px 0px";
          let box = document.createElement("div");
          box.className = "anotherClassBox";
          box.style.position = "absolute";
          box.style.content = "";
          box.style.height = `${styles.height + "px"}`;
          box.style.width = `${styles.width + "px"}`;
          box.style.top = `${styles.top + "px"}`;
          box.style.right = `${styles.right + "px"}`;
          box.style.bottom = `${styles.bottom + "px"}`;
          box.style.left = `${styles.left + "px"}`;
          box.style.background = "#09c";
          box.style.zIndex = "100000001";
          box.style.pointerEvents = "none";
          box.style.opacity = "0.25";
          box.style.borderRadius = "0px 5px 5px 5px";

          bound.appendChild(box);
          bound.appendChild(label);
          document.body.appendChild(bound);
          setTimeout(() => {
            bound.parentNode.removeChild(bound);
          }, 1000);
        }
      },
      { selector, event }
    );
  }
};

module.exports = {
  highlightElem,
  deHighlightElem,
  highlightElement,
  highlightPrompt,
};
