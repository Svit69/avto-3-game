import Item from '../models/Item.js';

export default class ItemGenerator{
  #assets;#idCounter=0;
  constructor(){this.#assets=[{type:'cap-black',src:'./items/cap_black.png'},{type:'cap-red',src:'./items/cap_red.png'},{type:'cap-mix',src:'./items/cap_red_black.png'},{type:'jersey-red',src:'./items/jersey_red.png'},{type:'jersey-white',src:'./items/jersey_white.png'},{type:'puck',src:'./items/puck.png'},{type:'bag',src:'./items/school_bag.png'},{type:'sticks',src:'./items/thundersticks.png'},{type:'toy-red',src:'./items/toy_red.png'},{type:'toy-white',src:'./items/toy_white.png'},{type:'winter-ball',src:'./items/winter_ball.png'}];}
  buildPack(triplesNeeded,fillerScale,fillLimit){const items=[];const addTriple=(asset)=>{for(let i=0;i<3&&items.length<fillLimit;i+=1)items.push(this.#spawn(asset));};for(let i=0;i<triplesNeeded&&items.length<fillLimit;i+=1)addTriple(this.#pickAsset());while(items.length<Math.min(fillLimit,triplesNeeded*fillerScale*3)){const asset=this.#pickAsset();if(items.length+3<=fillLimit){addTriple(asset);}else{items.push(this.#spawn(asset));}}while(items.length<fillLimit)items.push(this.#spawn(this.#pickAsset()));return this.#shuffle(items);}
  #spawn(asset){this.#idCounter+=1;return new Item(`itm-${this.#idCounter}`,asset.type,asset.src);}
  #pickAsset(){return this.#assets[Math.floor(Math.random()*this.#assets.length)];}
  #shuffle(list){return [...list].sort(()=>Math.random()-0.5);}
}
