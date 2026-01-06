import Box from '../models/Box.js';
import Shelf from '../models/Shelf.js';
import ItemGenerator from './ItemGenerator.js';
import TouchController from './TouchController.js';

export default class GameBoard {
  #board;#boxes=new Map();#generator=new ItemGenerator();#onTriple;
  constructor(boardNode,onTriple){this.#board=boardNode;this.#onTriple=onTriple;this.#build();new TouchController(this.#board,(drag,targetId)=>this.moveItem(drag,targetId));}
  seed(level){const pack=this.#generator.buildPack(level.triples,level.filler,this.#boxes.size*3);[...this.#boxes.values()].forEach((box)=>box.resetBox());let cursor=0;this.#boxes.forEach((box)=>{for(let i=0;i<3;i+=1){const item=pack[cursor];if(!item)return;box.pushItem(item.createNode(),item);cursor+=1;}});}
  moveItem(active,targetId){const source=this.#boxes.get(active.originBox);const target=this.#boxes.get(targetId);if(!source||!target)return;const item=source.pullById(active.itemId);if(!item)return;const node=active.node;if(!target.pushItem(node,item)){source.pushItem(node,item);return;}if(target.isTripleReady())this.#onTriple(target);}
  refill(box){box.resetBox();this.#generator.buildPack(1,1,3).forEach((item)=>box.pushItem(item.createNode(),item));}
  #build(){const boxAssets={back:'./box.png',front:'./box_front.png'};for(let i=0;i<3;i+=1){const shelf=new Shelf(`shelf-${i}`,'./shelf.png');const boxes=[0,1].map((n)=>new Box(`box-${i}-${n}`,boxAssets));boxes.forEach((box)=>this.#boxes.set(box.id,box));shelf.setBoxes(boxes);this.#board.appendChild(shelf.render());}}
}
