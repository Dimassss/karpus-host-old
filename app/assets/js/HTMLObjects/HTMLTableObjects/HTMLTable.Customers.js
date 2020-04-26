class HTMLTableCustomers extends HTMLTable{
  constructor(selector, callbacks, cols){
    /*
    callbacks = {func1: [cb1, cb2, ...]}
    Every callback take current HTMLTableObject obj as a parametr
    */

    super(new CustomerTableSQL(), selector, cols, new CustomerTableSQL());

    this.callbacks = callbacks;
    this.sqlMain = "1=1";
  }

  selectRow(){
    let _this = this;
    if(this.callbacks.selectRow) this.callbacks.selectRow.forEach(cb => cb(_this));
  }
}
