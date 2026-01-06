import GameEntity from './GameEntity.js';

export default class Box extends GameEntity{
  #items=[];#itemNodes=new Map();#capacity;#node;#itemsHost;#assets;
  constructor(id,assets,capacity=3){super(id);this.#assets=assets;this.#capacity=capacity;}
  render(){const shell=document.createElement('div');shell.className='box';shell.dataset.boxId=this.id;const back=document.createElement('img');back.src=this.#assets.back;back.className='box-back';this.#itemsHost=document.createElement('div');this.#itemsHost.className='box-items';const front=document.createElement('img');front.src=this.#assets.front;front.className='box-front';shell.append(back,this.#itemsHost,front);this.#node=shell;return shell;}
  canAccept(){return this.#items.length<this.#capacity;}
  pushItem(itemNode,item){if(!this.canAccept())return false;this.#items.push(item);this.#itemNodes.set(item.id,itemNode);this.#itemsHost.appendChild(itemNode);return true;}
  popItem(){const item=this.#items.pop();if(!item)return null;const node=this.#itemNodes.get(item.id);node?.remove();this.#itemNodes.delete(item.id);return item;}
  pullById(itemId){const index=this.#items.findIndex((item)=>item.id===itemId);if(index<0)return null;const [item]=this.#items.splice(index,1);this.#itemNodes.get(itemId)?.remove();this.#itemNodes.delete(itemId);return item;}
  isTripleReady(){return this.#items.length===this.#capacity&&new Set(this.#items.map((item)=>item.type)).size===1;}
  resetBox(){this.#items=[];this.#itemsHost.innerHTML='';this.#node.classList.remove('box-closed');}
  markClosed(){this.#node.classList.add('box-closed');}
  get capacity(){return this.#capacity;}
  typesSnapshot(){return this.#items.map((item)=>item.type);}
}
