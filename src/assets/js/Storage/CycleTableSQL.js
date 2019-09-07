class CycleTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["CycleTableSQL"]) return g["Storage"]["CycleTableSQL"];
    super("id", "CYCLES", {});
    return g["Storage"]["CycleTableSQL"] = this;
  }
}
