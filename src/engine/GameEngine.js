import GameBoard from './GameBoard.js';
import LevelManager from './LevelManager.js';
import SeededRandom from './SeededRandom.js';
import LevelValidator from './LevelValidator.js';

export default class GameEngine{
  #hud;#levels;#board;#timerRef;#triplesLeft=0;#secondsLeft=0;#validator=new LevelValidator();#rng;#planQueue=[];
  constructor(boardNode,hud,levels){this.#hud=hud;this.#levels=new LevelManager(levels);this.#board=new GameBoard(boardNode,(box)=>this.#onTriple(box));}
  start(){this.#launch(this.#levels.current());}
  #launch(level){if(!level)return;this.#rng=new SeededRandom(level.seed||1);this.#planQueue=this.#buildPlan(level);this.#triplesLeft=level.triples;this.#secondsLeft=level.seconds;this.#hud.setLevel(level.name);this.#hud.setTriplesLeft(this.#triplesLeft);this.#hud.setTimer(this.#secondsLeft);this.#board.seed(level,this.#rng,this.#planQueue);const report=this.#validator.validate(level,this.#board.snapshot());if(!report.ok){this.#hud.flash(report.message);console.warn(report.fix);}clearInterval(this.#timerRef);this.#timerRef=setInterval(()=>this.#tick(),1000);}
  #tick(){this.#secondsLeft-=1;this.#hud.setTimer(this.#secondsLeft);if(this.#secondsLeft<=0){clearInterval(this.#timerRef);this.#hud.flash('\u0412\u0440\u0435\u043c\u044f \u0432\u044b\u0448\u043b\u043e');this.#levels.reset();setTimeout(()=>this.start(),900);}}
  #onTriple(box){this.#triplesLeft-=1;this.#hud.setTriplesLeft(this.#triplesLeft);this.#hud.flash('\u041a\u043e\u0440\u043e\u0431\u043a\u0430 \u0437\u0430\u043a\u0440\u044b\u0442\u0430!');box.markClosed();setTimeout(()=>{this.#board.replaceBox(box);if(this.#triplesLeft<=0)this.#win();},600);}
  #win(){clearInterval(this.#timerRef);this.#hud.flash('\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043f\u0440\u043e\u0439\u0434\u0435\u043d!');setTimeout(()=>this.#launch(this.#levels.goNext()),900);}
  #buildPlan(level){const types=level.types||[];const plan=[];for(let i=0;i<level.triples;i+=1)plan.push(this.#rng.pick(types));return plan.flatMap((t)=>[t,t,t]);}
}
