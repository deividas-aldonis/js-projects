import { game } from "./script.js";

export class Popup {
  constructor() {
    this.popup = document.querySelector('[data-name="popup"]');
    this.popupBtn = document.querySelector('[data-name="popup-btn"]');

    this.popup.classList.remove("hidden");
    this.popupBtn.addEventListener(
      "click",
      () => {
        this.popup.classList.add("hidden");
        game.reset();
      },
      { once: true }
    );
  }
}
