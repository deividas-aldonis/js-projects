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

export class CardsAnimation {
  #cards = Array.from(document.querySelectorAll('[data-name="card"]'));

  #keyframes = [
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
  ];

  #options(cardIndex) {
    return {
      fill: "forwards",
      easing: "cubic-bezier(0.76, 0, 1, 1)",
      duration: 100,
      delay: cardIndex * 100,
    };
  }

  load() {
    this.#cards
      .sort(() => 0.5 - Math.random())
      .forEach((card, index) => {
        card.animate(this.#keyframes, this.#options(index));
      });
  }
}

export class TextAnimation {
  #letters = document.querySelectorAll('[data-name="letter"]');

  #keyframes = [
    {
      opacity: 0,
      transform: "translateY(40px)",
    },
    {
      opacity: 1,
      transform: "translateY(0px)",
    },
  ];

  #options(letterIndex) {
    return {
      duration: 200,
      delay: letterIndex * 100,
      fill: "forwards",
      easing: "cubic-bezier(0.7, 0, 0.7, 1.5)",
    };
  }

  async load() {
    for (const [index, letter] of this.#letters.entries()) {
      const letterAnimation = letter.animate(
        this.#keyframes,
        this.#options(index)
      );

      if (this.#letters.length === index + 1) {
        return letterAnimation.finished;
      }
    }
  }
}
