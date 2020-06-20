class HTMLTableProducts extends HTMLTable{
  constructor(selector, callbacks, cols, page = "cycles"){
    /*
    callbacks = {func1: [cb1, cb2, ...]}
    Every callback take current HTMLTableObject obj as a parametr
    */

    super(new ProductTableSQL(), selector, cols, new ProductTableSQL());

    this.callbacks = callbacks;
    this.page = page;
  }

  selectRow(){
    let _this = this;
    if(this.callbacks.selectRow) this.callbacks.selectRow.forEach(cb => cb(_this));
  }

  loadOnCycleSelect(cycleID){
    this.sqlMain = "`cycleID` = ?"
    this.sqlData = [cycleID];
    this.cleanTable();
    this.loadNewRowsEvent("FL");
  }

  load(){
    this.sqlMain = "1=1";
    this.sqlData = [];
    this.cleanTable();
    this.loadNewRowsEvent("FL");
  }

  loadNewRowsEvent(forceLoad){
    let _this = this;

    if(!this.tableIsFull) if(forceLoad == "FL" || this.html.scrollHeight - this.html.scrollTop < 400){
      if(this.page == "cycles"){
        (new CycleTableSQL).load(_this.sqlData, cycles => {
          if(!cycles[0]) return;
          let cycle = cycles[0];
          this.db.select(
              {
                order: "DESC",
                haveIDs: Object.keys(_this.body),
                searchingStr: (this.findInput && this.findInput.value)?this.findInput.value:"",
                searchCols: Object.fromEntries(_this.columns.filter(col => !["id", "count"].includes(col)).map(col => [col, "string"])),
                getCols: "*"
              },
              products => {
                let ids = [];
                products.forEach((pr, i) => {
                  if(cycle.products[pr.id] && JSON.stringify(cycle.products[pr.id]) !== JSON.stringify({"c-st":0, "c-wh":0, "c-sh":0, "c-kt":0, "c-or":0, "c-lft":0})){
                    pr = {...pr, ...cycle.products[pr.id]};
                    pr.__proto__ = ProductModel.prototype;
                    _this.addOrUpdateRow(pr);
                  }else{
                    ids[ids.length] = i;
                    products[i].count = {"c-st":0, "c-wh":0, "c-sh":0, "c-kt":0, "c-or":0, "c-lft":0};
                  }
                });
                ids.forEach(id => {
                  _this.addOrUpdateRow(products[id]);
                });
              });
            });
      }else{
        this.db.select({
                count: 30,
                order: "DESC",
                haveIDs: Object.keys(_this.body),
                searchingStr: (this.findInput && this.findInput.value)?this.findInput.value:"",
                searchCols: Object.fromEntries(_this.columns.filter(col => !["id", "count"].includes(col)).map(col => [col, "string"])),
                getCols: "*"  
              },
          products => {
            if(!products) _this.tableIsFull = true;
            else{
              products.forEach(row => _this.addOrUpdateRow(row));
            }
          })
      }
    }
  }

  deleteAllFromCycle(cycleID){}
}
