class KitTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["KitTableSQL"]) return g["Storage"]["KitTableSQL"];
    super("id", "KITS", {});
    return g["Storage"]["KitTableSQL"] = this;
  }
}
