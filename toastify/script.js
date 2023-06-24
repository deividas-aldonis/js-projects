class Toast {
  #defaultOptions = Object.freeze({
    closeTimer: 5000,
    hideProgressBar: false,
    autoClose: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
    state: "success",
  });

  #options = Object.seal({ ...this.#defaultOptions });
  #content;
  #toastElement;
  #progressElement;
  #closeButton;

  constructor(content, userOptions) {
    this.#content = content;
    this.#options = Object.assign(this.#options, userOptions);

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

    document.querySelector(".toastify").appendChild(this.#toastElement);

    this.#toastElement.animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(0%)" }],
      {
        duration: 300,
        fill: "forwards",
        easing: "cubic-bezier(0,1.18,.65,1.09)",
      }
    );
  }

  #removeToast() {
    const toastHeight = this.#toastElement.offsetHeight;
    const style = getComputedStyle(this.#toastElement);
    const marginBottom = parseInt(style.marginBottom);

    const toastAnimation = this.#toastElement.animate(
      [{ transform: "translateX(0%)" }, { transform: "translateX(200%)" }],
      {
        duration: 500,
        fill: "forwards",
        easing: "cubic-bezier(.8,-0.27,0,1.26)",
      }
    );

    toastAnimation.addEventListener("finish", () => {
      const next = this.#toastElement.nextElementSibling;
      if (next) {
        next.style.marginTop = `${toastHeight + marginBottom}px`;
        next.animate(
          [
            { marginTop: `${toastHeight + marginBottom}px` },
            { marginTop: "0px" },
          ],
          {
            duration: 100,
            fill: "forwards",
          }
        );
      }
      this.#toastElement.remove();
    });
  }
}

new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  theme: "colored",
  state: "error",
});
new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  theme: "colored",
  state: "error",
});
new Toast("This is awesome!😀", {
  autoClose: true,
  closeOnClick: true,
  theme: "colored",
  state: "warning",
});
