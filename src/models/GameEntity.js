export default class GameEntity {
  #id;

  constructor(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  render() {
    throw new Error('Render method must be implemented.');
  }
}
