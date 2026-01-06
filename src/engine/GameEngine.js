import GameBoard from './GameBoard.js';
import LevelManager from './LevelManager.js';

export default class GameEngine {
  #hud;#levels=new LevelManager();#board;#timerRef;#triplesLeft=0;#secondsLeft=0;
  constructor(boardNode,hud){this.#hud=hud;this.#board=new GameBoard(boardNode,(box)=>this.#onTriple(box));}
  start(){this.#launch(this.#levels.current());}
  #launch(level){this.#triplesLeft=level.triples;this.#secondsLeft=level.seconds;this.#hud.setLevel(level.name);this.#hud.setTriplesLeft(this.#triplesLeft);this.#hud.setTimer(this.#secondsLeft);this.#board.seed(level);clearInterval(this.#timerRef);this.#timerRef=setInterval(()=>this.#tick(),1000);}
  #tick(){this.#secondsLeft-=1;this.#hud.setTimer(this.#secondsLeft);if(this.#secondsLeft<=0){clearInterval(this.#timerRef);this.#hud.flash('Время вышло');this.#levels.reset();setTimeout(()=>this.start(),900);}}
  #onTriple(box){this.#triplesLeft-=1;this.#hud.setTriplesLeft(this.#triplesLeft);this.#hud.flash('Коробка закрыта!');box.markClosed();setTimeout(()=>{this.#board.refill(box);if(this.#triplesLeft<=0)this.#win();},600);}
  #win(){clearInterval(this.#timerRef);this.#hud.flash('Уровень пройден!');setTimeout(()=>this.#launch(this.#levels.goNext()),900);}
}
