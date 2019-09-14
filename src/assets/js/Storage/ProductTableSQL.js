class ProductTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["ProductTableSQL"]) return g["Storage"]["ProductTableSQL"];
    super("id", "PRODUCTS", {});
    return g["Storage"]["ProductTableSQL"] = this;
  }

  load(keys){
    const records = this.l(keys);
    const products = [];
    for(var i = 0; i < records.length; i++) products[products.length] = new ProductModel(records[i]);
    return products;
  }

  select(where, data){
    const records = this.sl(where, data);
    const products = [];
    for(var i = 0; i < records.length; i++) products[products.length] = new ProductModel(records[i]);
    return products;
  }
}
