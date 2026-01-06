export default class LevelManager {
  #levels;
  #index = 0;

  constructor() {
    this.#levels = [
      { name: 'Базовый', triples: 10, seconds: 120, filler: 2 }
    ];
  }

  current() {
    return this.#levels[this.#index] ?? this.#levels.at(-1);
  }

  goNext() {
    this.#index += 1;
    return this.current();
  }

  reset() {
    this.#index = 0;
  }
}
