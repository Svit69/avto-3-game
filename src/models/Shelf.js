import GameEntity from './GameEntity.js';

export default class Shelf extends GameEntity {
  #asset;
  #boxes = [];
  #host;

  constructor(id, assetPath) {
    super(id);
    this.#asset = assetPath;
  }

  setBoxes(boxes) {
    this.#boxes = boxes;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'shelf';
    const image = document.createElement('img');
    image.src = this.#asset;
    image.className = 'shelf-image';
    this.#host = document.createElement('div');
    this.#host.className = 'shelf-boxes';
    this.#boxes.forEach((box) => this.#host.appendChild(box.render()));
    wrapper.append(image, this.#host);
    return wrapper;
  }

  swapBox(index, newBox) {
    this.#boxes[index] = newBox;
    const target = this.#host.children[index];
    if (target) target.replaceWith(newBox.render());
  }
}
