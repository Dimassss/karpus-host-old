class ProductTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["ProductTableSQL"]) return g["Storage"]["ProductTableSQL"];
    super("id", "PRODUCTS", {});
    return g["Storage"]["ProductTableSQL"] = this;
  }
}
