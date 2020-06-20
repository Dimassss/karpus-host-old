class CustomerTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["CustomerTableSQL"]) return g["Storage"]["CustomerTableSQL"];
    super("id", "CUSTOMERS", {"id": '`id` INTEGER PRIMARY KEY', "fullName": '`fullName` VARCHAR(80)', "telephones": '`telephones` TEXT NOT NULL', "adresses": '`adresses` TEXT', "email": '`email` VARCHAR(90)', "notes": '`notes` TEXT', "preferences": '`preferences` TEXT', "socialMedia": '`socialMedia` TEXT', "activity": '`activity` VARCHAR(90)'});
    return g["Storage"]["CustomerTableSQL"] = this;
  }

  load(keys, cb){
    this.l(keys, records => {
      const customers = [];
      for(var i = 0; i < records.length; i++) customers[customers.length] = (new CustomerModel()).fromDB(records[i]);
      cb(customers)
    });
  }

  select(where, cb){
    this.sl(where, (records) => {
      const customers = [];
      for(var i = 0; i < records.length; i++) customers[customers.length] = (new CustomerModel()).fromDB(records[i]);
      cb(customers);
    });
  }
}
