export class Game {
  #cardContainer = document.querySelector('[data-name="cards"]');
  #cards = document.querySelectorAll('[data-name="card"]');
  #cardNames = [
    "circle",
    "face",
    "heart",
    "keyboard",
    "lightbulb",
    "puzzle",
    "square",
    "star",
    "circle",
    "face",
    "heart",
    "keyboard",
    "lightbulb",
    "puzzle",
    "square",
    "star",
  ];
  #pickedCards = [];
  #cardsWon = [];

  #addCards() {
    this.#cardNames.sort(() => 0.5 - Math.random());

    for (let i = 0; i < this.#cards.length; i++) {
      const img = document.createElement("img");
      const path = `./assets/${this.#cardNames[i]}.svg`;

      img.classList.add("game__card-icon");
      img.hidden = true;
      img.src = path;
      img.draggable = false;
      img.dataset.card = this.#cardNames[i];
      this.#cards[i].appendChild(img);
    }
  }

  #addListeners() {
    this.#cardContainer.addEventListener("click", (e) => {
      if (this.#pickedCards.length === 2) return;

      const gameCard = e.target.closest(".game__card");

      if (!gameCard) return;

      const card = gameCard.firstElementChild;

      if (card.classList.contains("success")) return;

      this.#pickCard(card);
    });
  }

  #pickCard(card) {
    card.hidden = false;

    if (this.#pickedCards.includes(card)) return;

    this.#pickedCards.push(card);

    if (this.#pickedCards.length === 2) this.#checkCards();
  }

  #checkCards() {
    const [first, second] = this.#pickedCards;

    if (first.dataset.card === second.dataset.card) {
      first.classList.add("success");
      second.classList.add("success");
      this.#cardsWon.push(first, second);

      if (this.#cardsWon.length === this.#cardNames.length) {
        // Show message that the user has won
      } else {
        this.#pickedCards = [];
      }
    } else {
      setTimeout(() => {
        first.hidden = true;
        second.hidden = true;
        this.#pickedCards = [];
      }, 1000);
    }
  }

  init() {
    this.#addCards();
    this.#addListeners();
  }
}
