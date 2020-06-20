class KitTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["KitTableSQL"]) return g["Storage"]["KitTableSQL"];
    super("id",
          "KITS",
          {
            id: '`id` INTEGER PRIMARY KEY',
            cycleID: '`cycleID` INT',
            name: '`name` VARCHAR(90)',
            price: '`price` FLOAT',
            pcPrice: '`pcPrice` FLOAT',
            weight: '`weight` FLOAT',
            pcWeight: '`pcWeight` FLOAT',
            products: '`products` TEXT',
            progress_bars: '`progress_bars` TEXT',
            dimensions: '`dimensions` TEXT',
            type: '`type` VARCHAR(40)',
            size: '`size` VARCHAR(30)',
            description: '`description` TEXT',
          });
    return g["Storage"]["KitTableSQL"] = this;
  }

  load(keys, cb){
    this.l(keys, records => {
      const kits = [];
      for(var i = 0; i < records.length; i++) kits[kits.length] = (new KitModel()).fromDB(records[i]);

      cb(kits);
    });
  }

  select(where, cb){
    this.sl(where, records => {
      const kits = [];
      for(var i = 0; i < records.length; i++) kits[kits.length] = (new KitModel()).fromDB(records[i]);
      cb(kits);
    });
  }
}
