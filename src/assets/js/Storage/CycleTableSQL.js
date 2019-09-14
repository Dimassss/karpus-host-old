class CycleTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["CycleTableSQL"]) return g["Storage"]["CycleTableSQL"];
    super("id", "CYCLES", {});
    return g["Storage"]["CycleTableSQL"] = this;
  }

  load(keys){
    const records = this.l(keys);
    const cycles = [];
    for(var i = 0; i < records.length; i++) cycles[cycles.length] = new CycleModel(records[i]);
    return cycles;
  }

  select(where, data){
    const records = this.sl(where, data);
    const cycles = [];
    for(var i = 0; i < records.length; i++) cycles[cycles.length] = new CycleModel(records[i]);
    return cycles;
  }
}
