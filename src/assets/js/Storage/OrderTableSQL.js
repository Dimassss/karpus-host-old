class OrderTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["OrderTableSQL"]) return g["Storage"]["OrderTableSQL"];
    super("id", "ORDERS", {});
    return g["Storage"]["OrderTableSQL"] = this;
  }
}
