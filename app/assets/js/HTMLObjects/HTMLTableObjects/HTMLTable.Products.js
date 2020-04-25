class HTMLTableProducts extends HTMLTable{
  constructor(selector, callbacks, cols){
    /*
    callbacks = {func1: [cb1, cb2, ...]}
    Every callback take current HTMLTableObject obj as a parametr
    */

    super(new ProductTableSQL(), selector, cols, new ProductTableSQL());

    this.callbacks = callbacks;
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
}
