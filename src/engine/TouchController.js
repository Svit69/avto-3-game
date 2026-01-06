export default class TouchController{
  #root;#onDrop;#active;
  constructor(root,onDrop){this.#root=root;this.#onDrop=onDrop;this.#bind();}
  #bind(){this.#root.addEventListener('pointerdown',(evt)=>this.#start(evt));window.addEventListener('pointermove',(evt)=>this.#move(evt));window.addEventListener('pointerup',(evt)=>this.#finish(evt));}
  #start(evt){const target=evt.target.closest('.item-node');if(!target)return;const box=target.closest('.box');const rect=target.getBoundingClientRect();const scale=1.2;this.#active={node:target,originBox:box?.dataset.boxId,itemId:target.dataset.itemId,halfX:(rect.width*scale)/2,halfY:(rect.height*scale)/2,scale};target.setPointerCapture?.(evt.pointerId);target.classList.add('item-floating');this.#place(target,evt.clientX,evt.clientY);}
  #move(evt){if(!this.#active)return;this.#place(this.#active.node,evt.clientX,evt.clientY);}
  #finish(evt){if(!this.#active)return;const drop=document.elementFromPoint(evt.clientX,evt.clientY);const box=drop?.closest?.('.box');if(box)this.#onDrop(this.#active,box.dataset.boxId);this.#reset();}
  #reset(){const {node}=this.#active;node.style.transform='';node.classList.remove('item-floating');this.#active=null;}
  #place(node,x,y){const {halfX,halfY,scale}=this.#active;node.style.left=`${x-halfX}px`;node.style.top=`${y-halfY}px`;node.style.transform=`scale(${scale})`;}
}
