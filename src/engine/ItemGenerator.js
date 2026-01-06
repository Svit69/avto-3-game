import Item from '../models/Item.js';

export default class ItemGenerator{
  #assets;#idCounter=0;#maxPerType=3;
  constructor(){this.#assets=[{type:'cap-black',src:'./items/cap_black.png'},{type:'cap-red',src:'./items/cap_red.png'},{type:'cap-mix',src:'./items/cap_red_black.png'},{type:'jersey-red',src:'./items/jersey_red.png'},{type:'jersey-white',src:'./items/jersey_white.png'},{type:'puck',src:'./items/puck.png'},{type:'bag',src:'./items/school_bag.png'},{type:'sticks',src:'./items/thundersticks.png'},{type:'toy-red',src:'./items/toy_red.png'},{type:'toy-white',src:'./items/toy_white.png'},{type:'winter-ball',src:'./items/winter_ball.png'}];}
  buildPack(triplesNeeded,fillerScale,fillLimit,currentCounts=new Map()){const items=[];const counts=new Map(currentCounts);const take=(asset)=>{const used=counts.get(asset.type)||0;if(used>=this.#maxPerType)return false;counts.set(asset.type,used+1);items.push(this.#spawn(asset));return true;};const pick=(assets)=>assets[Math.floor(Math.random()*assets.length)];const available=()=>this.#assets.filter((a)=> (counts.get(a.type)||0)<this.#maxPerType);while(items.length<fillLimit){const existing=available().filter((a)=> (counts.get(a.type)||0)>0);const pool=existing.length?existing:available();if(!pool.length)break;take(pick(pool));}return this.#shuffle(items);}
  #spawn(asset){this.#idCounter+=1;return new Item(`itm-${this.#idCounter}`,asset.type,asset.src);}
  #shuffle(list){return [...list].sort(()=>Math.random()-0.5);}
}
