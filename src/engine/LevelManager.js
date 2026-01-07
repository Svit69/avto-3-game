export default class LevelManager{
  #levels;#index=0;
  constructor(levels){this.#levels=levels||[];}
  current(){return this.#levels[this.#index]??this.#levels.at(-1);}
  goNext(){this.#index+=1;return this.current();}
  reset(){this.#index=0;}
}
