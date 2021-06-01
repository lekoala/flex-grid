const DEBUG = (window.FlexGrid && window.FlexGrid.debug) || false;
const COMBINED = {
  g: ["gx", "gy"],
};
const ALIASES = {
  start: "flex-start",
  end: "flex-end",
};
const GRID_ATTRS = ["g", "gx", "gy", "xs", "sm", "md", "lg", "xl", "xxl", "align", "justify", "mw", "unit", "direction", "wrap"];

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
    return GRID_ATTRS;
  }

  static updateStyle(inst, attr, newVal) {
    let style = inst.getAttribute("style");
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
    inst.setAttribute("style", rules.join(";"));
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    FlexGrid.updateStyle(this, attr, newVal);
  }

  connectedCallback() {
    // This is actually called AFTER attributeChangedCallback
  }
}

class FlexCol extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["o", "w", "mw", "col", "align", "justify", "grow", "d-xs", "d-sm", "d-md", "d-lg", "d-xl", "d-xxl"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    FlexGrid.updateStyle(this, attr, newVal);
  }

  connectedCallback() {}
}

class FlexContainer extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return GRID_ATTRS;
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    let grid = this.querySelector("flex-grid");
    if (grid) {
      FlexGrid.updateStyle(grid, attr, newVal);
    }
  }

  connectedCallback() {
    // If there is no flex-grid, create it
    if (this.querySelector("flex-grid") === null) {
      this.innerHTML = "<flex-grid>" + this.innerHTML + "</flex-grid>";
    }
    let grid = this.querySelector("flex-grid");
    Array.prototype.slice.call(this.attributes).forEach((item) => {
      if (!GRID_ATTRS.includes(item.name)) {
        return;
      }
      FlexGrid.updateStyle(grid, item.name, item.value);
      grid.setAttribute(item.name, item.value);
    });
  }
}

customElements.define("flex-grid", FlexGrid);
customElements.define("flex-col", FlexCol);
customElements.define("flex-container", FlexContainer);
