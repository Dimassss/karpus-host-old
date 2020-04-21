class HTMLCyclesBar extends HTMLObject{
  constructor(selector, callbacks){
    /*
    NOT CORRECT OLD VARIANT
    selectors = {
      talbes: {
        order,
        kit,
        product
      },
      profiles: {
        kit,
        product
      },
      alertWins: {
        order
      }
    }
    NEW VARIANT:
    callbacks = {
      selectCycle: [funk(cycleID)],
      deleteCycle: [],
      cleanCycle: []
    }
    */

    super(selector);

    this.selectedCycle = NaN; //index of slected Cycle
    this.callbacks = callbacks;
    this.dbCycle = new CycleTableSQL();

    /*this.dbKit = new KitTableSQL();
    this.dbProduct = new ProductTableSQL();
    this.dbOrder = new OrderTableSQL();
    this.kitProfile = new HTMLProfileKit(selectors.profiles.kit, {
      //fieldName: relativeSelector
    }, kit => {
      _.kitTable.addOrUpdateRow(kit);
    });
    this.productProfile = new HTMLProfileKit(selectors.profiles.product, {
      //fieldName: relativeSelector
    }, product => {
      _.productTable.addOrUpdateRow(product);
    });
    this.alertWin = new HTMLAlertWinOrder(selectors.alertWins.order, {
      //fieldName: relativeSelector
    }, win => {
      _.orderTable.addOrUpdateRow(win.order);
    });
    this.orderTable = new HTMLTableOrders(selectors.tables.order, {dblSelectRow: [orderTable => {
      _.alertWin.fillUp(orderTable.selected);
    }]});
    this.kitTable = new HTMLTableKits(selectors.tables.kit, {selectRow: [kitTable => {
      _.kitProfile.clean();
      _.kitProfile.open(kitTable.selected);
    }]});
    this.productTable = new HTMLTableProducts(selectors.tables.product, {selectRow: [productTable => {
      _.productProfile.clean();
      _.productProfile.open(productTable.selected);
    }]});*/

  }

  activate(){
    let _ = this;
    this.dbCycle.select("1=1", [], cycles => {
      _.cycles = cycles;

      //add cycles to the bar and add event listeners to the cycles
      _.cycles.forEach(cycle => {
        _.html.querySelector("div.cycles").insertAdjacentHTML("afterbegin", `<label for="cycle-${cycle.id}">${cycle.name}</label>`);
        _.html.querySelector("div.cycles label[for='cycle-" + cycle.id + "']").addEventListener("click", e => _.selectCycle.call(_, e));
      });

    });
  }

  stopScroll(e){
    // - code - stop scrolling
  }

  scrollLeft(e){
    // - code - scroll bar to the left side
  }

  scrollRight(e){
    // - code - scroll bar to the right side
  }

  selectCycle(e){
    let _ = this;
    let id = parseInt(e.target.getAttribute("for").split("-")[1]); //get id of selected cycle

    /*_.orderTable.loadOnCycleSelect(id);
    _.kitTable.loadOnCycleSelect(id);
    _.productTable.loadOnCycleSelect(id);*/
    this.callbacks.selectCycle.forEach(f => f(id));

  }

  deleteCycle(){
    /*this.orderTable.cleanTable();
    this.kitTable.cleanTable();
    this.productTable.cleanTable();
    this.productProfile.clean();
    this.kitProfile.clean();*/
    this.callbacks.cleanCycle.forEach(f => f());
    // - code - remove html cycle element

    if(isNaN(this.selectedCycle)) return;

    let cid = this.selectedCycle.valueOf();
    let _ = this;

    this.dbCycle.del([cid]);
    /*this.dbKit.select("`cycleID` = ?", [cid], records => _.dbKit.del(records.map(rec => rec.id)));
    this.dbProduct.select("`cycleID` = ?", [cid], records => _.dbProduct.del(records.map(rec => rec.id)));
    this.dbOrder.select("`cycleID` = ?", [cid], records => _.dbOrder.del(records.map(rec => rec.id)));*/
    this.callbacks.deleteCycle.forEach(f => f(cid));
    this.selectedCycle = NaN;
  }

  createCycle(e){
    this.orderTable.cleanTable();
    this.kitTable.cleanTable();
    this.productTable.cleanTable();
    this.productProfile.clean();
    this.kitProfile.clean();

    let cycleName; // - code - get from html name of cycle
    let _ = this;

    // - code - add cycle element to the html
    this.dbCycle.save([new CycleModel({name: cycleName})], cycles => _.selectedCycle = cycles[0].id);
  }
}
