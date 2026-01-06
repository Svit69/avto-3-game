import GameEntity from './GameEntity.js';

export default class Item extends GameEntity {
  #type;
  #assetPath;

  constructor(id, type, assetPath) {
    super(id);
    this.#type = type;
    this.#assetPath = assetPath;
  }

  get type() {
    return this.#type;
  }

  createNode() {
    const node = document.createElement('img');
    node.src = this.#assetPath;
    node.dataset.type = this.#type;
    node.dataset.itemId = this.id;
    node.className = 'item-node';
    node.draggable = false;
    return node;
  }
}
