export default class TouchController{
  #root;#onDrop;#active;
  constructor(root,onDrop){this.#root=root;this.#onDrop=onDrop;this.#bind();}
  #bind(){this.#root.addEventListener('pointerdown',(evt)=>this.#start(evt));window.addEventListener('pointermove',(evt)=>this.#move(evt));window.addEventListener('pointerup',(evt)=>this.#finish(evt));}
  #start(evt){const target=evt.target.closest('.item-node');if(!target)return;const box=target.closest('.box');const rect=target.getBoundingClientRect();const scale=1.2;const ghost=target.cloneNode(true);ghost.classList.add('item-floating');ghost.style.width=`${rect.width*scale}px`;ghost.style.height=`${rect.height*scale}px`;document.body.appendChild(ghost);target.style.opacity='0';this.#active={node:target,ghost,originBox:box?.dataset.boxId,itemId:target.dataset.itemId,scale};target.setPointerCapture?.(evt.pointerId);this.#place(ghost,evt.clientX,evt.clientY,scale);}
  #move(evt){if(!this.#active)return;this.#place(this.#active.ghost,evt.clientX,evt.clientY,this.#active.scale);}
  #finish(evt){if(!this.#active)return;const drop=document.elementFromPoint(evt.clientX,evt.clientY);const box=drop?.closest?.('.box');if(box)this.#onDrop(this.#active,box.dataset.boxId);this.#reset();}
  #reset(){const {node,ghost}=this.#active;ghost?.remove();node.style.opacity='';this.#active=null;}
  #place(el,x,y,scale){el.style.left=`${x}px`;el.style.top=`${y}px`;el.style.transform='translate(-50%, -50%)';el.style.transform+=` scale(${scale})`;}
}
