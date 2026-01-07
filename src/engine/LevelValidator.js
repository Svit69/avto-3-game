export default class LevelValidator{
  validate(level,snapshot){const counts=new Map();snapshot.forEach((box)=>box.types.forEach((t)=>counts.set(t,(counts.get(t)||0)+1)));const canMove=this.#hasStartMove(snapshot,counts);if(!canMove)return{ok:false,message:'Плохой уровень: нет стартовых ходов',fix:'Увеличь fillMax или добавь больше типов.'};if(!level.types?.length)return{ok:false,message:'Плохой уровень: нет типов',fix:'Добавь types в конфиг.'};return{ok:true};}
  #hasStartMove(snapshot,counts){for(const box of snapshot){if(box.free<=0)continue;for(const t of box.types){if((counts.get(t)||0)>box.counts.get(t))return true;}}return false;}
}
