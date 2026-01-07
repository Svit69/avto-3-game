import Box from '../models/Box.js';
import Shelf from '../models/Shelf.js';
import ItemGenerator from './ItemGenerator.js';
import TouchController from './TouchController.js';

export default class GameBoard{
  #board;#boxes=new Map();#generator=new ItemGenerator();#onTriple;#boxAssets={back:'./box.png',front:'./box_front.png'};#boxCapacity=3;#shelves=[];#positions=new Map();#rng;#allowedTypes;#planQueue=[];#level;
  constructor(boardNode,onTriple){this.#board=boardNode;this.#onTriple=onTriple;this.#build();new TouchController(this.#board,(drag,targetId)=>this.moveItem(drag,targetId));}
  seed(level,rng,planQueue){this.#level=level;this.#rng=rng;this.#allowedTypes=level.types;this.#planQueue=planQueue;[...this.#boxes.values()].forEach((box)=>box.resetBox());const counts=this.#currentCounts();this.#boxes.forEach((box)=>{const fill=this.#fillCount(this.#level);this.#ensurePlan(fill);this.#generator.buildPack(fill,counts,this.#allowedTypes,this.#rng,this.#planQueue).forEach((item)=>box.pushItem(item.createNode(),item));});}
  moveItem(active,targetId){const source=this.#boxes.get(active.originBox);const target=this.#boxes.get(targetId);if(!source||!target)return;const item=source.pullById(active.itemId);if(!item)return;const node=active.node;if(!target.pushItem(node,item)){source.pushItem(node,item);return;}if(target.isTripleReady())this.#onTriple(target);}
  replaceBox(oldBox){const meta=this.#positions.get(oldBox.id);if(!meta)return;const shelf=this.#shelves[meta.shelfIndex];const newBox=this.#createBox(oldBox.id);this.#boxes.set(newBox.id,newBox);this.#positions.set(newBox.id,meta);shelf.swapBox(meta.boxIndex,newBox);this.#seedSingle(newBox);}
  snapshot(){const out=[];this.#boxes.forEach((box)=>out.push({types:box.typesSnapshot(),counts:box.countByType(),free:box.capacity-box.size()}));return out;}
  #seedSingle(box){const counts=this.#currentCounts();const fill=this.#fillCount(this.#level||{fillMin:1,fillMax:this.#boxCapacity-1});this.#ensurePlan(fill);this.#generator.buildPack(fill,counts,this.#allowedTypes,this.#rng,this.#planQueue).forEach((item)=>box.pushItem(item.createNode(),item));}
  #build(){for(let i=0;i<3;i+=1){const shelf=new Shelf(`shelf-${i}`,'./shelf.png');const boxes=[0,1].map((n)=>{const box=this.#createBox(`box-${i}-${n}`);this.#positions.set(box.id,{shelfIndex:i,boxIndex:n});return box;});boxes.forEach((box)=>this.#boxes.set(box.id,box));shelf.setBoxes(boxes);this.#shelves.push(shelf);this.#board.appendChild(shelf.render());}}
  #createBox(id){return new Box(id,this.#boxAssets,this.#boxCapacity);}
  #currentCounts(){const counts=new Map();this.#boxes.forEach((box)=>{box.typesSnapshot().forEach((type)=>{counts.set(type,(counts.get(type)||0)+1);});});return counts;}
  #fillCount(level){const min=Math.max(1,Math.min(this.#boxCapacity,level.fillMin||1));const max=Math.max(min,Math.min(this.#boxCapacity,level.fillMax||this.#boxCapacity-1));return this.#rng.int(min,max);}
  #ensurePlan(minItems){while(this.#planQueue.length<minItems){const type=this.#rng.pick(this.#allowedTypes||[]);this.#planQueue.push(type,type,type);}}
}
