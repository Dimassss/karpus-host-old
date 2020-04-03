class OrderTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["OrderTableSQL"]) return g["Storage"]["OrderTableSQL"];
    super("id",
          "ORDERS",
          {
            id: '`id` INTEGER PRIMARY KEY',
            telephone: '`telephone` VARCHAR(14)',
            socialMedia: '`socialMedia` VARCHAR(80)',
            adress: '`adress` VARCHAR(80)',
            orderNotes: '`orderNotes` TEXT',
            summary: '`summary` FLOAT',
            billed: '`billed` BOOLEAN',
            isNotThis: '`isNotThis` BOOLEAN',
            payDates: '`payDates` TIMESTAMP',
            pays: '`pays` TEXT',
            cycleID: '`cycleID` INT',
            customerID: '`customerID` INT',
            kits: '`kits` TEXT'
          });
    return g["Storage"]["OrderTableSQL"] = this;
  }

  load(keys, cb){
    this.l(keys, records => {
      const orders = [];
      for(var i = 0; i < records.length; i++) orders[orders.length] = (new OrderModel()).fromDB(records[i]);
      cb(orders);
    });
  }

  select(where, data, cb){
    this.sl(where, data, records => {
      const orders = [];
      for(var i = 0; i < records.length; i++) orders[orders.length] = (new OrderModel()).fromDB(records[i]);
      cb(orders);
    });
  }
}
