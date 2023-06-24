class Toast {
  #defaultOptions = Object.freeze({
    closeTimer: 5000,
    hideProgressBar: false,
    autoClose: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
    state: "success",
    position: "top-right",
  });
  #defaultContent = "This is awesome!😀";

  #options = Object.seal({ ...this.#defaultOptions });
  #content;
  #toastElement;
  #progressElement;
  #closeButton;
  #parentContainer;

  constructor(content, userOptions) {
    this.#content = content ?? this.#defaultContent;
    Object.assign(this.#options, userOptions);

    this.#createToast();
    this.#addOptions();
  }

  #addOptions() {
    const {
      closeOnClick,
      autoClose,
      hideProgressBar,
      closeTimer,
      pauseOnHover,
    } = this.#options;

    if (closeOnClick) {
      this.#toastElement.addEventListener(
        "click",
        this.#removeToast.bind(this)
      );
    }

    if (!closeOnClick) {
      this.#closeButton.addEventListener("click", this.#removeToast.bind(this));
    }

    if (!autoClose) return;

    this.#progressElement.style.visibility = hideProgressBar
      ? "hidden"
      : "visible";

    const progressAnimation = this.#progressElement.animate(
      [{ width: "100%" }, { width: "0%" }],
      {
        duration: closeTimer,
        fill: "forwards",
      }
    );

    if (pauseOnHover) {
      this.#toastElement.addEventListener("mouseenter", () => {
        progressAnimation.pause();
      });
      this.#toastElement.addEventListener("mouseleave", () => {
        progressAnimation.play();
      });
    }

    progressAnimation.addEventListener("finish", this.#removeToast.bind(this));
  }

  #createToast() {
    const icon = `<i class="toast__icon fa-solid ${
      {
        success: "fa-circle-check",
        info: "fa-circle-info",
        warning: "fa-triangle-exclamation",
        error: "fa-circle-exclamation",
      }[this.#options.state]
    }"></i>`;

    const html = `<div class="toast toast--${this.#options.state} toast--${
      this.#options.theme
    }">
      ${icon}
      <div class="toast__content">${this.#content}</div>
      <i class="toast__close-btn fa-solid fa-xmark"></i>
      <div class="toast__progress"></div>
    </div>`;

    const template = document.createElement("template");
    template.innerHTML = html.trim();

    this.#toastElement = template.content.firstElementChild;
    this.#progressElement = this.#toastElement.lastElementChild;
    this.#closeButton = this.#progressElement.previousElementSibling;
    this.#parentContainer = document.querySelector(
      `.toast-container.${this.#options.position}`
    );

    if (!this.#parentContainer) {
      const newParentContainer = document.createElement("div");
      newParentContainer.classList.add(
        "toast-container",
        this.#options.position
      );
      document.querySelector(".toastify").appendChild(newParentContainer);
      this.#parentContainer = newParentContainer;
    }

    this.#parentContainer.appendChild(this.#toastElement);

    const animationPosition = {
      "top-right": {
        from: "translateX(calc(100% + 20px))",
        to: "translateX(0%)",
      },
      "top-left": {
        from: "translateX(calc(-100% - 20px))",
        to: "translateX(0%)",
      },
      "top-center": {
        from: "translateY(-100vh)",
        to: "translateY(0%)",
      },
      "bottom-right": {
        from: "translateX(calc(100% + 20px))",
        to: "translateX(0%)",
      },
      "bottom-left": {
        from: "translateX(calc(-100% - 20px))",
        to: "translateX(0%)",
      },
      "bottom-center": {
        from: "translateY(100vh)",
        to: "translateY(0%)",
      },
    }[this.#options.position];

    this.#toastElement.animate(
      [
        { transform: animationPosition.from, visibility: "visible" },
        { transform: animationPosition.to, visibility: "visible" },
      ],
      {
        duration: 300,
        fill: "both",
        easing: "cubic-bezier(0,1.18,.65,1.09)",
      }
    );
  }

  #removeToast() {
    const toastHeight = this.#toastElement.offsetHeight;
    const style = getComputedStyle(this.#toastElement);
    const marginBottom = parseInt(style.marginBottom);
    this.#toastElement.classList.add("remove");

    const animationPosition = {
      "top-right": {
        from: "translateX(0%)",
        to: "translateX(calc(100% + 20px))",
      },
      "top-left": {
        from: "translateX(0%)",
        to: "translateX(calc(-100% - 20px))",
      },
      "top-center": {
        from: "translateY(0%)",
        to: "translateY(-100vh)",
      },
      "bottom-right": {
        from: "translateX(0%)",
        to: "translateX(calc(100% + 20px))",
      },
      "bottom-left": {
        from: "translateX(0%)",
        to: "translateX(calc(-100% - 20px))",
      },
      "bottom-center": {
        from: "translateY(0%)",
        to: "translateY(100vh)",
      },
    }[this.#options.position];

    const toastAnimation = this.#toastElement.animate(
      [
        { transform: animationPosition.from },
        { transform: animationPosition.to },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "cubic-bezier(.8,-0.27,0,1.26)",
      }
    );

    toastAnimation.addEventListener("finish", () => {
      const isTop = this.#options.position.startsWith("top");
      const next = isTop
        ? this.#toastElement.nextElementSibling
        : this.#toastElement.previousElementSibling;

      this.#toastElement.classList.add("remove");
      if (next) {
        const margin = isTop
          ? `${toastHeight + marginBottom}px 0px 0px 0px`
          : `0px 0px ${toastHeight + marginBottom * 2}px 0px`;
        next.style.margin = margin;

        next.animate([{ margin: margin }, { margin: "0px 0px 10px 0px" }], {
          duration: 100,
          fill: "forwards",
        });
      }
      this.#toastElement.remove();
      this.#checkIfContainerIsEmpty();
    });
  }
  #checkIfContainerIsEmpty() {
    const children = this.#parentContainer.childElementCount;

    if (children === 0) {
      this.#parentContainer.remove();
    }
  }
}

new Toast();

new Toast("", {
  autoClose: true,
  closeOnClick: true,
  position: "top-left",
  theme: "dark",
  state: "warning",
});

new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  position: "top-left",
  theme: "dark",
  state: "error",
});

new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  position: "top-left",
  theme: "dark",
  state: "success",
});

new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  position: "top-left",
  theme: "dark",
  state: "info",
});

new Toast("This is awesome!😀", {
  autoClose: false,
  closeOnClick: true,
  position: "bottom-right",
  theme: "light",
  state: "warning",
});

new Toast("This is awesome!😀", {
  autoClose: false,
  closeOnClick: true,
  position: "bottom-right",
  theme: "light",
  state: "error",
});

new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  position: "top-right",
  theme: "colored",
  state: "success",
});

new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  position: "top-center",
  theme: "colored",
  state: "info",
});

new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  position: "bottom-center",
  theme: "colored",
  state: "error",
});

new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  position: "bottom-left",
  theme: "colored",
  state: "warning",
});
