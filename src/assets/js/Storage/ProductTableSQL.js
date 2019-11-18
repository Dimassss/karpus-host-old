class ProductTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["ProductTableSQL"]) return g["Storage"]["ProductTableSQL"];
    super("id", "PRODUCTS", {"id": '`id` INTEGER PRIMARY KEY', "cycleID": '`cycleID` INT', "name": '`name` VARCHAR(80)', "unit": '`unit` VARCHAR(80)', "price": '`price` TEXT', "count": '`count` TEXT', "dimensions": '`dimensions` VARCHAR(20)', "weight": '`weight` INT', "description": '`description` TEXT'});
    return g["Storage"]["ProductTableSQL"] = this;
  }

  load(keys, cb){
    this.l(keys, records => {
      const products = [];
      for(var i = 0; i < records.length; i++) products[products.length] = (new ProductModel()).fromDB(records[i]);
      cb(products);
    });
  }

  select(where, data){
    this.sl(where, data, records => {
      const products = [];
      for(var i = 0; i < records.length; i++) products[products.length] = (new ProductModel()).fromDB(records[i]);
      cb(products);
    });
  }
}
