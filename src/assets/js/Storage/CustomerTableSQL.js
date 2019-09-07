class CustomerTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["CustomerTableSQL"]) return g["Storage"]["CustomerTableSQL"];
    super("id", "CUSTOMERS", {});
    return g["Storage"]["CustomerTableSQL"] = this;
  }
}
