/**
@class CustomerProfileController

@methods
  @method addCyclesToNavBar
    @param {Event} e
    @do on scroll in cycles nav bars it add new cycles names to that nav bars
  @method scrollNavBarLeft
    @param {Event} e
    @do scroll nav bar of cycles to left side on click on left side arrow
  @method scrollNavBarRight
    @param {Event} e
    @do scroll nav bar of cycles to right side on click on right side arrow
  @method endScroll
    @param {Event} e
    @do set g.Controller.Cycles.toScroll = false to stop scrolling in .cycles container
  @method createCycle
    @param {Event} e
    @do on click on "tick" save button in cycles-footer to create cycle it take value from field and add it to db and select nav bars
  @method selectCycle
    @param {Event} e
    @do on click on cycle name in cycles nav bar it load cycle's orders, kits and prodcts to the windows
  @method editOrder
    @param {Event} e
    @do on double click on order row it shows alertWindow, where fields are filled out with values of current order
  @method saveOrder
    @param {Event} e
    @do on click on "tick" save button in alertWindow it take all data from alertWindow and save it as order to db and change data in orders nav table if it is needed
  @method deleteRecord
    @param {Event} e
    @do delete selected record from db and from nav table
  @method displayKitsOnCycleSelect
    @param {Event} e
    @do when user select cycle in alertWindow in display all kits from that cycle in kits-container
*/
class CycleController{
  constructor(){
    if(g.Controller.Cycles.instance) return g.Controller.Cycles.instance;
    this.dao = new CyclesDAO();
    this.in = new CyclesInput();
    return g.Controller.Cycles.instance = this;
  }

  addCyclesToNavBar(e, cb){
    let _this = g.Controller.Cycles.instance;
    _this.dao.dispalyCycles('TRUE ORDER BY id DESC LIMIT ?, ?', [
            g.Controller.Cycles.cyclesNavBarScrollCounter * g.Controller.Cycles.cyclesNavBarCountToSelect,
            g.Controller.Cycles.cyclesNavBarCountToSelect
          ], cb);
  }

  scrollNavBarLeft(e){
    g.Controller.Cycles.toScroll = setInterval(() => document.querySelector(".cycles-tab-container .cycles").scrollBy(-3, 0), 6);
  }

  scrollNavBarRight(e){
    g.Controller.Cycles.toScroll = setInterval(() => document.querySelector(".cycles-tab-container .cycles").scrollBy(3, 0), 6);
  }

  endScroll(e){
    clearInterval(g.Controller.Cycles.toScroll);
    g.Controller.Cycles.toScroll = undefined;
  }

  createCycle(e){
    let _this = g.Controller.Cycles.instance;

    var cycleName = _this.in.takeData("add_c");
    if(cycleName != ""){
      _this.dao.createCycle(false?_this.in.takeData("C_ID"):-1, cycleName, cycleID => {
        _this.dao.dispalyCycles('id = ?', [cycleID], () => {
          _this.selectCycle(e, cycleID);
        });
      });
    }

  }

  selectCycle(e, id, cb){
    let _this = g.Controller.Cycles.instance;
    id = typeof id !== "undefined"?id:e.target.getAttribute("for").split("-")[1];
    _this.dao.fillCycleWindows(id, cb);
  }

  editOrder(e){
    let _this = g.Controller.Cycles.instance;
    _this.dao.openOrderCreatingWindow();
    _this.dao.fillOrderCreatingWin(parseInt(e.target.parentNode.getAttribute("data-id")));
  }

  closeOrder(e){
    let _this = g.Controller.Cycles.instance;
    _this.dao.closeOrderCreatingWindow();
  }

  saveOrder(e, cb){
    let _this = g.Controller.Cycles.instance;
    _this.dao.getOrderFromPage((order, customer) => {
      _this.dao.saveOrder(order, cb);
      _this.dao.saveCustomer(customer);
      _this.dao.closeOrderCreatingWindow();

    });
  }

  displayKitsOnCycleSelect(e){
    let _this = g.Controller.Cycles.instance;
    _this.dao.displayKits(_this.in.takeData("AW_c_id"));
  }

  deleteCycle(e){
    let _this = g.Controller.Cycles.instance;
    let cycleID = _this.in.takeData("C_ID");
    _this.dao.cleanCycleWindows(cycleID);
    _this.dao.deleteCycle(cycleID)
  }

  deleteRecord(e){
    let _this = g.Controller.Cycles.instance;
    let sl = _this.in.takeData("Tbl_Slct");
    let db = ({"orders": new OrderTableSQL(), "products": new ProductTableSQL(), "kits": new KitTableSQL()})[sl[0]];
    let dbCycle = new CycleTableSQL();

    (new CyclesOutput()).insertData(sl[0][0].toUpperCase() + "_Tbl", {body:[[{id: sl[1]}]]});
    db.del([sl[1]]);
  }

  selectRecord(e){
    let _this = g.Controller.Cycles.instance;
    let sl = _this.in.takeData("Tbl_Slct");
    if(sl[2]) sl[2].classList.remove("selected");
    e.target.parentNode.classList.add("selected");
    sl = _this.in.takeData("Tbl_Slct");
    let fillProfile = ({"orders": undefined, "products": _this.dao.fillProductProfile, "kits": _this.dao.fillKitProfile})[sl[0]];
    if(fillProfile != undefined) fillProfile(sl[1], _this.in.takeData("C_ID"));
  }

  addToArray(e){
    let _this = g.Controller.Cycles.instance;
    _this.dao.addToArray(...({
              "Paid":["AW_P", ["", ""]],
              "Date":["AW_P", ["", ""]]
            })[e.target.parentNode.querySelector("input").getAttribute("placeholder")]);
  }

  saveProduct(e, cb){
    let _this = g.Controller.Cycles.instance;
    let out = new CyclesOutput();
    var product = _this.dao.takeProductFromPage();
    const id = product["id"] + 1;
    var db = new ProductTableSQL();
    var dbCycle = new CycleTableSQL();

    if(e.path[4].id == "js-product-count-set"){
      Object.keys(product.count).forEach(k => {
        if(!product.count[k]) product.count[k] = 0;
      });
      product.count["c-kt"] = product.count["c-st"] - product.count["c-wh"] - product.count["c-sh"];
      product.count["c-lft"] = product.count["c-kt"] - product.count["c-or"];

      out.insertData("P_C", product.count);
    }

    db.save([product], products => {
      if(products[0]["id"] != id - 1){
        dbCycle.load([products[0]["cycleID"]], cycles => {
          if(cycles[0]){
            cycles[0]["productsID"][cycles[0]["productsID"].length] = products[0]["id"];
            dbCycle.save(cycles, () => {});
          }
        });
        (new CyclesOutput()).insertData("P_ID", products[0]["id"]);
      }
      _this.dao.fillProductsWin([products[0]["id"]], cb);
    });

  }

  saveKit(e, cb, t){
    let _this = g.Controller.Cycles.instance;
    var kit = _this.dao.takeKitFromPage();
    const id = kit["id"] + 1;
    var db = new KitTableSQL();

    db.save([kit], kits => {
      let out = new CyclesOutput();
      if(kits[0]["id"] != id - 1){
        out.insertData("K_ID", kits[0]["id"]);
      }
      _this.dao.fillKitsWin([kits[0]["id"]], cb);

      out.insertData("K_PcPr", parseFloat(kits[0].pcPrice).toFixed(2));
      out.insertData("K_PcW", parseFloat(kits[0].pcWeight).toFixed(2));
    });
  }

  createKit(e){
    let _this = g.Controller.Cycles.instance;
    Array.from(document.querySelectorAll("table .selected")).forEach(s => s.classList.remove("selected"));
    _this.dao.cleanKitProfile(_this.in.takeData("C_ID"));
  }

  createProduct(e){
    let _this = g.Controller.Cycles.instance;
    Array.from(document.querySelectorAll("table .selected")).forEach(s => s.classList.remove("selected"));
    _this.dao.cleanProductProfile();
  }

  search(e){
    let _this = g.Controller.Cycles.instance;
    let table = e.target.parentNode.querySelector("table");
    let str = e.target.value;
    let s = (str==="")?(() => true):(tr => Array.from(tr.querySelectorAll("td")).filter(td => td.innerHTML.search(str) > -1).length > 0);
    Array.from(table.querySelectorAll("tbody tr")).forEach(tr => tr.style.display = s(tr)?"table":"none");
  }

  updateOrderForm(e){
    let _this = g.Controller.Cycles.instance;
    let kits = _this.dao.getOrderFromPage(undefined,1);
    _this.dao.updateOrderForm(kits);
  }
}
