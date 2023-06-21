class DOM {
  static elementFromHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }
}

class Validator {
  static validKeys = [
    "position",
    "autoClose",
    "hideProgressBar",
    "closeOnClick",
    "pauseOnHover",
    "draggable",
    "theme",
  ];

  static allowedValues = {
    positions: ["top-right", "top-center", "top-left"],
    themes: ["colored", "light", "dark"],
    autoClose: 100,
  };

  static allowedTypes = {
    position: (position) => typeof position === "string",
    autoClose: (autoClose) => typeof autoClose === "number",
    hideProgressBar: (hideProgressBar) => typeof hideProgressBar === "boolean",
    closeOnClick: (closeOnClick) => typeof closeOnClick === "boolean",
    pauseOnHover: (pauseOnHover) => typeof pauseOnHover === "boolean",
    draggable: (draggable) => typeof draggable === "boolean",
    theme: (theme) => typeof theme === "string",
  };

  static isObject(obj) {
    if (typeof obj === "object" && !Array.isArray(obj) && obj !== null) {
      return true;
    }
    return false;
  }

  static isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  static containsInvalidKeys(obj) {
    const keys = Object.keys(obj);
    const invalidKeys = [];
    const validKeys = Validator.validKeys;

    for (let i = 0; i < keys.length; i++) {
      if (!validKeys.includes(keys[i])) {
        invalidKeys.push(keys[i]);
        break;
      }
    }
    if (invalidKeys.length === 0) {
      return {
        error: false,
        message: "All good.",
      };
    }
    return {
      error: true,
      message: `Allowed keys: ${[validKeys.join(" ")]}.`,
    };
  }

  static areTypesValid(obj) {
    const allowedTypes = Validator.allowedTypes;
    const invalidTypes = [];

    for (const [key, value] of Object.entries(obj)) {
      const isValid = allowedTypes[key](value);

      if (!isValid) {
        invalidTypes.push({ key, value });
      }
    }

    if (invalidTypes.length === 0) {
      return {
        error: false,
        message: "All good.",
      };
    }

    const errorMessage = Validator.generateTypeError(invalidTypes[0].key);
    return {
      error: true,
      message: errorMessage,
    };
  }

  static generateTypeError(type) {
    return {
      position: "position needs to be a string",
      autoClose: "autoClose needs to be a number",
      hideProgressBar: "hideProgressBar needs to be a boolean",
      closeOnClick: "closeOnClick needs to be a boolean",
      pauseOnHover: "pauseOnHover needs to be a boolean",
      draggable: "draggable needs to be a boolean",
      theme: "theme needs to be a string",
    }[type];
  }

  static areValuesValid(options) {
    const allowed = Validator.allowedValues;

    if ("theme" in options) {
      const isThemeValid = allowed.themes.find(
        (theme) => theme === options.theme
      );

      if (!isThemeValid) {
        return {
          error: true,
          message: `theme allowed values: ${[allowed.themes.join(" ")]}`,
        };
      }
    }

    if ("position" in options) {
      const isPositionValid = allowed.positions.find(
        (pos) => pos === options.position
      );

      if (!isPositionValid) {
        return {
          error: true,
          message: `position allowed values: ${[allowed.positions.join(" ")]}`,
        };
      }
    }

    if ("autoClose" in options) {
      const isAutoCloseValid = options.autoClose > allowed.autoClose;

      if (!isAutoCloseValid) {
        return {
          error: true,
          message: `autoClose minimum allowed value: ${allowed.autoClose}`,
        };
      }
    }

    return {
      error: false,
      message: "All good",
    };
  }
}

class Toast {
  #defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
  };

  #options;
  #content;

  constructor(content, userOptions) {
    this.content = content;
    this.options = userOptions;
  }

  get content() {
    return this.#content;
  }

  set content(c) {
    this.#content = c;
  }

  get options() {
    return this.#options;
  }

  set options(userOptions) {
    const V = Validator;

    const isObject = V.isObject(userOptions);
    if (!isObject) {
      // TODO
      this.#options = this.#defaultOptions;
      console.log("No options object");
      return;
    }

    const isEmpty = V.isObjectEmpty(userOptions);
    if (isEmpty) {
      // TODO
      this.#options = this.#defaultOptions;
      console.log("Empty object provided");
      return;
    }

    const containsInvalidKeys = V.containsInvalidKeys(userOptions);
    if (containsInvalidKeys.error) {
      console.error(containsInvalidKeys.message);
      return;
    }

    const areTypesValid = V.areTypesValid(userOptions);
    if (areTypesValid.error) {
      console.error(areTypesValid.message);
      return;
    }

    const areValuesValid = V.areValuesValid(userOptions);
    if (areValuesValid.error) {
      console.error(areValuesValid.error);
      return;
    }

    // TODO
  }

  createNewToast() {
    const html = `<div class="toast">
                    <i class="toast__icon fa-solid fa-circle-exclamation"></i>
                    <div class="toast__content">This is a toast!</div>
                    <i class="toast__close-btn fa-solid fa-xmark"></i>
                  </div>`;
    const toastElement = DOM.elementFromHtml(html);
  }
}

const t = new Toast("Asdsa", {
  hideProgressBar: true,
  theme: "dark",
  autoClose: 1000,
  draggable: false,
  position: "top-left",
});
