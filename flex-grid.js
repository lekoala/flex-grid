const DEBUG = (window.FlexGrid && window.FlexGrid.debug) || false;
const COMBINED = {
  g: ["gx", "gy"],
};
const ALIASES = {
  start: "flex-start",
  end: "flex-end",
};

class FlexGrid extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }

  static log(message) {
    if (!DEBUG) {
      return;
    }
    console.log("[flex-grid] " + message);
  }

  static get observedAttributes() {
    return ["g", "gx", "gy", "xs", "sm", "md", "lg", "xl", "xxl", "align", "justify", "mw", "unit", "direction", "wrap"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    let style = this.getAttribute("style");
    let rules = [];
    if (style) {
      rules = style.split(";");
    }
    let attrs = [attr];
    if (ALIASES[newVal]) {
      newVal = ALIASES[newVal];
    }
    if (COMBINED[attr]) {
      attrs = COMBINED[attr];
    }
    for (let i = 0; i < attrs.length; i++) {
      let dashAttr = "--" + attrs[i];
      rules = rules.filter((v) => {
        return !v.includes(dashAttr);
      });
      rules.push(dashAttr + ":" + newVal);
    }
    this.setAttribute("style", rules.join(";"));
  }

  connectedCallback() {
    // This is actually called AFTER attributeChangedCallback
    // this.innerHTML = "<div class=\"flex-grid-wrapper\">" + this.innerHTML + "</div>";
  }
}

customElements.define("flex-grid", FlexGrid);
