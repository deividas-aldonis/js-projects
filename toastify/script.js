class DOM {
  static elementFromHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }
}

class Validator {
  static validKeys = [
    "autoClose",
    "hideProgressBar",
    "closeOnClick",
    "pauseOnHover",
    "draggable",
    "theme",
    "stayOpen",
  ];

  static allowedValues = {
    themes: ["colored", "light", "dark"],
    autoClose: 500,
  };

  static allowedTypes = {
    autoClose: (autoClose) => typeof autoClose === "number",
    hideProgressBar: (hideProgressBar) => typeof hideProgressBar === "boolean",
    closeOnClick: (closeOnClick) => typeof closeOnClick === "boolean",
    pauseOnHover: (pauseOnHover) => typeof pauseOnHover === "boolean",
    draggable: (draggable) => typeof draggable === "boolean",
    stayOpen: (stayOpen) => typeof stayOpen === "boolean",
    theme: (theme) => typeof theme === "string",
  };

  static isObject(obj) {
    if (typeof obj === "object" && !Array.isArray(obj) && obj !== null) {
      return true;
    }
    return false;
  }

  static isValidString(str) {
    if (typeof str !== "string") {
      return {
        error: true,
        message: "First argument has to be of type string",
      };
    }

    if (str.trim().length === 0) {
      return {
        error: true,
        message: "First argument cannot be set to empty",
      };
    }

    return {
      error: false,
    };
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

    if ("autoClose" in options) {
      const isAutoCloseValid = options.autoClose >= allowed.autoClose;

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

  static generateTypeError(type) {
    return {
      stayOpen: "stayOpen needs to be a boolean",
      autoClose: "autoClose needs to be a number",
      hideProgressBar: "hideProgressBar needs to be a boolean",
      closeOnClick: "closeOnClick needs to be a boolean",
      pauseOnHover: "pauseOnHover needs to be a boolean",
      draggable: "draggable needs to be a boolean",
      theme: "theme needs to be a string",
    }[type];
  }
}

class Toast {
  #container = document.querySelector(".toastify");
  #defaultOptions = {
    autoClose: 5000,
    hideProgressBar: false,
    stayOpen: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
  };

  #options = this.#defaultOptions;
  #content = "Awesome Toast!";

  constructor(content, userOptions) {
    // TODO
    // Rewrite setter, just validate in the constructor userOptions
    this.content = content;
    this.options = userOptions;
    this.createNewToast();
  }

  get content() {
    return this.#content;
  }

  set content(content) {
    const isValidString = Validator.isValidString(content);

    if (isValidString.error) {
      console.error(isValidString.message);
      return;
    }

    this.#content = content;
  }

  set options(userOptions) {
    const V = Validator;

    const isObject = V.isObject(userOptions);
    if (!isObject) {
      console.log("No options object");
      return;
    }

    const isEmpty = V.isObjectEmpty(userOptions);
    if (isEmpty) {
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
      console.error(areValuesValid.message);
      return;
    }

    Object.assign(this.#options, userOptions);
    // TODO
  }

  createNewToast() {
    const {
      autoClose,
      closeOnClick,
      draggable,
      hideProgressBar,
      pauseOnHover,
      position,
      stayOpen,
      theme,
    } = this.#options;

    const html = `<div class="toast toast--success">
                    <i class="toast__icon fa-solid fa-circle-exclamation"></i>
                    <div class="toast__content">This is a toast!</div>
                    <i class="toast__close-btn fa-solid fa-xmark"></i>
                    <div class="toast__progress"></div>
                  </div>`;
    const toastElement = DOM.elementFromHtml(html);
    const progressBar = toastElement.lastElementChild;
    const closeBtn = toastElement.children[2];
    this.#container.appendChild(toastElement);

    if (closeOnClick) {
      toastElement.addEventListener(
        "click",
        () => {
          toastElement.remove();
        },
        {
          once: true,
        }
      );
    } else {
      closeBtn.addEventListener(
        "click",
        () => {
          toastElement.remove();
        },
        {
          once: true,
        }
      );
    }

    if (stayOpen) {
      progressBar.style.visibility = "hidden";
      return;
    }

    const progressAnimation = progressBar.animate(
      [
        {
          visibility: hideProgressBar ? "hidden" : "visible",
          width: "100%",
        },
        {
          visibility: hideProgressBar ? "hidden" : "visible",
          width: "0%",
        },
      ],
      {
        duration: autoClose,
        fill: "forwards",
      }
    );

    if (pauseOnHover) {
      toastElement.addEventListener("mouseenter", () => {
        progressAnimation.pause();
      });

      toastElement.addEventListener("mouseleave", () => {
        progressAnimation.play();
      });
    }

    progressAnimation.addEventListener("finish", () => {
      toastElement.remove();
    });
  }
}

document.addEventListener("visibilitychange", () => {
  const animations = document.getAnimations();

  if (document.visibilityState === "visible" && animations.length > 0) {
    animations.forEach((animation) => animation.play());
    return;
  }

  if (document.visibilityState !== "visible" && animations.length > 0) {
    animations.forEach((animation) => animation.pause());
  }
});

document.querySelector(".new-toast").addEventListener("click", () => {
  new Toast("Hello", {
    stayOpen: false,
    hideProgressBar: false,
    pauseOnHover: false,
    autoClose: 5000,
    closeOnClick: false,
  });
});
