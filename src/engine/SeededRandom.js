export default class SeededRandom{
  #state;
  constructor(seed){this.#state=(seed>>>0)||1;}
  next(){let t=this.#state+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;}
  int(min,max){return Math.floor(this.next()*(max-min+1))+min;}
  pick(list){return list[Math.floor(this.next()*list.length)];}
  shuffle(list){const out=[...list];for(let i=out.length-1;i>0;i-=1){const j=Math.floor(this.next()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
}
