import Box from '../models/Box.js';
import Shelf from '../models/Shelf.js';
import ItemGenerator from './ItemGenerator.js';
import TouchController from './TouchController.js';

export default class GameBoard{
  #board;#boxes=new Map();#generator=new ItemGenerator();#onTriple;#boxAssets={back:'./box.png',front:'./box_front.png'};#boxCapacity=3;#shelves=[];#positions=new Map();
  constructor(boardNode,onTriple){this.#board=boardNode;this.#onTriple=onTriple;this.#build();new TouchController(this.#board,(drag,targetId)=>this.moveItem(drag,targetId));}
  seed(level){const fillPerBox=Math.max(1,this.#boxCapacity-1);const pack=this.#generator.buildPack(level.triples,level.filler,this.#boxes.size*fillPerBox);[...this.#boxes.values()].forEach((box)=>box.resetBox());let cursor=0;this.#boxes.forEach((box)=>{for(let i=0;i<fillPerBox;i+=1){const item=pack[cursor];if(!item)return;box.pushItem(item.createNode(),item);cursor+=1;}});}
  moveItem(active,targetId){const source=this.#boxes.get(active.originBox);const target=this.#boxes.get(targetId);if(!source||!target)return;const item=source.pullById(active.itemId);if(!item)return;const node=active.node;if(!target.pushItem(node,item)){source.pushItem(node,item);return;}if(target.isTripleReady())this.#onTriple(target);}
  replaceBox(oldBox){const meta=this.#positions.get(oldBox.id);if(!meta)return;const shelf=this.#shelves[meta.shelfIndex];const newBox=this.#createBox(oldBox.id);this.#boxes.set(newBox.id,newBox);this.#positions.set(newBox.id,meta);shelf.swapBox(meta.boxIndex,newBox);this.#seedSingle(newBox);}
  #seedSingle(box){const fill=Math.max(1,this.#boxCapacity-1);this.#generator.buildPack(0,1,fill).forEach((item)=>box.pushItem(item.createNode(),item));}
  #build(){for(let i=0;i<3;i+=1){const shelf=new Shelf(`shelf-${i}`,'./shelf.png');const boxes=[0,1].map((n)=>{const box=this.#createBox(`box-${i}-${n}`);this.#positions.set(box.id,{shelfIndex:i,boxIndex:n});return box;});boxes.forEach((box)=>this.#boxes.set(box.id,box));shelf.setBoxes(boxes);this.#shelves.push(shelf);this.#board.appendChild(shelf.render());}}
  #createBox(id){return new Box(id,this.#boxAssets,this.#boxCapacity);}
}
