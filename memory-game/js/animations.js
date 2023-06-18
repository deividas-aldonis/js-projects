export class PageAnimation {
  #overlay = document.getElementById("page-overlay");
  #loader = document.getElementById("loader");
  #app = document.getElementById("app");

  #getKeyframes = (target, translateX) => {
    if (target.id === "page-overlay") {
      return {
        transform: `translateX(${translateX}%)`,
      };
    }

    if (target.id === "loader") {
      return [
        {
          transform: "scale(0)",
          opacity: "0",
        },
        {
          offset: 0.1,
          transform: "scale(0.2)",
          opacity: "0.5",
        },
        {
          offset: 0.2,
          transform: "scale(0.4)",
          opacity: "1",
        },
        {
          offset: 0.4,
          transform: "scale(0.6)",
          opacity: "1",
        },
        {
          transform: "scale(1)",
          opacity: "1",
        },
      ];
    }
  };

  #getOptions = (delay, duration) => {
    return {
      delay,
      duration,
      fill: "forwards",
      easing: "cubic-bezier(0.76, 0, 1, 1)",
    };
  };

  async load() {
    await this.#loader.animate(
      this.#getKeyframes(this.#loader),
      this.#getOptions(100, 250)
    ).finished;

    await this.#overlay.animate(
      this.#getKeyframes(this.#overlay, 0),
      this.#getOptions(1250, 500)
    ).finished;

    this.#loader.hidden = true;
    this.#app.hidden = false;

    await this.#overlay.animate(
      this.#getKeyframes(this.#overlay, -100),
      this.#getOptions(500, 500)
    ).finished;

    return true;
  }
}
