class HTMLTableCustomers extends HTMLTable{
  constructor(selector, callbacks){
    /*
    callbacks = {func1: [cb1, cb2, ...]}
    Every callback take current HTMLTableObject obj as a parametr
    */

    this.callbacks = callbacks;

    super(new CustomerTableSQL(), selector, [/*cols*/]);
  }

  selectRow(){
    let _this = this;
    if(this.callbacks.selectRow) this.callbacks.selectRow.forEach(cb => cb(_this));
  }
}
