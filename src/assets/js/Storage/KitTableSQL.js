class KitTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["KitTableSQL"]) return g["Storage"]["KitTableSQL"];
    super("id", "KITS", {});
    return g["Storage"]["KitTableSQL"] = this;
  }

  load(keys){
    const records = this.l(keys);
    const kits = [];
    for(var i = 0; i < records.length; i++) kits[kits.length] = new KitModel(records[i]);
    return kits;
  }

  select(where, data){
    const records = this.sl(where, data);
    const kits = [];
    for(var i = 0; i < records.length; i++) kits[kits.length] = new KitModel(records[i]);
    return kits;
  }
}
