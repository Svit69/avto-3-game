export default class Hud {
  #levelLabel;
  #tripleLabel;
  #timerLabel;
  #messageBox;

  constructor(host) {
    this.#levelLabel = host.querySelector('[data-ui="level"]');
    this.#tripleLabel = host.querySelector('[data-ui="triples"]');
    this.#timerLabel = host.querySelector('[data-ui="timer"]');
    this.#messageBox = host.querySelector('[data-ui="message"]');
  }

  setLevel(name) {
    this.#levelLabel.textContent = name;
  }

  setTriplesLeft(value) {
    this.#tripleLabel.textContent = value;
  }

  setTimer(seconds) {
    this.#timerLabel.textContent = `${seconds}s`;
  }

  flash(text) {
    this.#messageBox.textContent = text;
    this.#messageBox.classList.add('message-show');
    setTimeout(() => this.#messageBox.classList.remove('message-show'), 1400);
  }
}
