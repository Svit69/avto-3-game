export default class LevelManager {
  #levels;
  #index = 0;

  constructor() {
    this.#levels = [
      { name: 'Старт', triples: 2, seconds: 70, filler: 2 },
      { name: 'Разгон', triples: 3, seconds: 60, filler: 3 },
      { name: 'Хард', triples: 4, seconds: 50, filler: 4 }
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
