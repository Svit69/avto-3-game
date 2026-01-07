import ItemGenerator from './ItemGenerator.js';
import SeededRandom from './SeededRandom.js';
import LevelValidator from './LevelValidator.js';

export default class LevelInspector{
  #validator=new LevelValidator();#boxCount;#capacity;#maxPerType=3;
  constructor(boxCount,capacity){this.#boxCount=boxCount;this.#capacity=capacity;}
  inspect(levels){const issues=[];for(const level of levels){const config=this.#validator.validateConfig(level,this.#boxCount,this.#capacity,this.#maxPerType);if(!config.ok){issues.push({level,report:config});continue;}const rng=new SeededRandom(level.seed||1);const planQueue=this.#buildPlan(level,rng);const generator=new ItemGenerator();const counts=new Map();const snapshot=[];for(let i=0;i<this.#boxCount;i+=1){const fill=this.#fillCount(level,rng);const items=generator.buildPack(fill,counts,level.types,rng,planQueue);snapshot.push(this.#snapshot(items));}const report=this.#validator.validateState(level,snapshot,planQueue,this.#maxPerType);if(!report.ok)issues.push({level,report});}return issues;}
  #buildPlan(level,rng){const types=level.types||[];const plan=[];for(let i=0;i<level.triples;i+=1)plan.push(rng.pick(types));return plan.flatMap((t)=>[t,t,t]);}
  #fillCount(level,rng){const min=Math.max(1,Math.min(this.#capacity,level.fillMin||1));const max=Math.max(min,Math.min(this.#capacity,level.fillMax||this.#capacity-1));return rng.int(min,max);}
  #snapshot(items){const types=items.map((item)=>item.type);const counts=new Map();types.forEach((t)=>counts.set(t,(counts.get(t)||0)+1));return{types,counts,free:this.#capacity-types.length};}
}
