import Item from '../models/Item.js';

export default class ItemGenerator{
  #assets;#byType;#idCounter=0;#maxPerType=3;
  constructor(){this.#assets=[{type:'cap-black',src:'./items/cap_black.png'},{type:'cap-red',src:'./items/cap_red.png'},{type:'cap-mix',src:'./items/cap_red_black.png'},{type:'jersey-red',src:'./items/jersey_red.png'},{type:'jersey-white',src:'./items/jersey_white.png'},{type:'puck',src:'./items/puck.png'},{type:'bag',src:'./items/school_bag.png'},{type:'sticks',src:'./items/thundersticks.png'},{type:'toy-red',src:'./items/toy_red.png'},{type:'toy-white',src:'./items/toy_white.png'},{type:'winter-ball',src:'./items/winter_ball.png'}];this.#byType=new Map(this.#assets.map((a)=>[a.type,a]));}
  buildPack(fillLimit,counts,allowedTypes,rng,planQueue){const items=[];if(!allowedTypes?.length)return items;const take=(type)=>{const used=counts.get(type)||0;if(used>=this.#maxPerType)return false;const asset=this.#byType.get(type);if(!asset)return false;counts.set(type,used+1);items.push(this.#spawn(asset));return true;};const pick=()=>allowedTypes[Math.floor(rng.next()*allowedTypes.length)];while(items.length<fillLimit){let usedPlan=false;for(let i=0;i<(planQueue?.length||0);i+=1){const type=planQueue[0];if(take(type)){planQueue.shift();usedPlan=true;break;}planQueue.push(planQueue.shift());}if(usedPlan)continue;const type=pick();if(!take(type))break;}return rng.shuffle(items);}
  #spawn(asset){this.#idCounter+=1;return new Item(`itm-${this.#idCounter}`,asset.type,asset.src);}
}
