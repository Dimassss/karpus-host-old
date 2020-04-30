class CycleTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["CycleTableSQL"]) return g["Storage"]["CycleTableSQL"];
    super("id", "CYCLES", {"id": '`id` INTEGER PRIMARY KEY', "name": '`name` VARCHAR(80) NOT NULL', "productsID": '`productsID` TEXT'});
    return g["Storage"]["CycleTableSQL"] = this;
  }

  load(keys, cb){
    this.l(keys, records => {
      const cycles = [];
      for(var i = 0; i < records.length; i++) cycles[cycles.length] = (new CycleModel()).fromDB(records[i]);
      cb(cycles);
    });
  }

  select(where, data, cb){
    this.sl(where, data, records => {
      const cycles = [];
      for(var i = 0; i < records.length; i++) cycles[cycles.length] = (new CycleModel()).fromDB(records[i]);
      cb(cycles);
    });
  }
}
