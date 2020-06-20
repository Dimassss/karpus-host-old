class HTMLCyclesBar extends HTMLObject{
  constructor(selector, fields, callbacks){
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

    this.fields = fields;
    this.selectedCycle = NaN; //index of selected Cycle
    this.callbacks = callbacks;
    this.dbCycle = new CycleTableSQL();
  }

  activate(){
    let _ = this;

    this.html.querySelector(_.fields.newCycleAdd).addEventListener("click", e => _.createCycle(e));

    this.dbCycle.select({}, cycles => {
      _.cycles = cycles;

      //add cycles to the bar and add event listeners to the cycles
      _.cycles.forEach(cycle => {
        _.html.querySelector("div.cycles").insertAdjacentHTML("afterbegin", `<label for="cycle-${cycle.id}">${cycle.name}</label>`);
        _.html.querySelector("div.cycles label[for='cycle-" + cycle.id + "']").addEventListener("click", e => _.selectCycle.call(_, e));
        _.html.querySelector("div.cycles label[for='cycle-" + cycle.id + "']").addEventListener("dblclick", e => _.editCycle(e));
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

  selectCycle(e, cycleID){
    let _ = this;
    let id = cycleID?cycleID:parseInt(e.target.getAttribute("for").split("-")[1]); //get id of selected cycle

    this.removeSelectionInBar();
    this.selectCycleInBar(id);

    this.callbacks.selectCycle.forEach(f => f(id));

  }

  selectCycleInBar(id){
    this.selectedCycle = id;
    this.html.querySelector("div.cycles label[for='cycle-"+id+"']").classList.add("selected");
  }

  removeSelectionInBar(){
    if(!isNaN(this.selectedCycle)) this.html.querySelector("div.cycles label[for='cycle-"+this.selectedCycle+"']").classList.remove("selected");
  }

  deleteCycle(){
    this.callbacks.cleanCycle.forEach(f => f());
    if(isNaN(this.selectedCycle)) return;
    let cid = this.selectedCycle.valueOf();

    this.html.querySelector("label[for='cycle-"+cid+"']").outerHTML = "";
    this.dbCycle.del([cid]);
    this.callbacks.deleteCycle.forEach(f => f(cid));
    this.selectedCycle = NaN;
  }

  createCycle(e){
    this.callbacks.cleanCycle.forEach(f => f());
    this.removeSelectionInBar();

    let _ = this;
    let cycleName = this.html.querySelector(_.fields.newCycleInput).value.valueOf(); //get from html name of cycle
    if(cycleName == "")return;
    else this.html.querySelector(_.fields.newCycleInput).value = "";
    // save and add cycle element to the html
    this.dbCycle.save([new CycleModel({name: cycleName})], cycles => {
      _.html.querySelector(_.fields.cycles).insertAdjacentHTML("afterbegin", `<label for="cycle-${cycles[0].id}">${cycles[0].name}</label>`);
      _.html.querySelector(_.fields.cycles + " label[for='cycle-" + cycles[0].id + "']").addEventListener("click", e => _.selectCycle(e));
      _.html.querySelector(_.fields.cycles + " label[for='cycle-" + cycles[0].id + "']").addEventListener("dblclick", e => _.editCycle(e));
      _.selectCycleInBar(cycles[0].id);
      _.selectCycle(null, cycles[0].id);
    });
  }

  editCycle(e){
    //at the moment this function only rename cycle
    //activates on double click on cycle-el in cycles-bar

    let _ = this;
    let id = parseInt(e.target.getAttribute("for").split("-")[1]); //get id of selected cycle
    let db = new CycleTableSQL();

    db.load([id], cycles => {
      if(!cycles[0]) throw "WTF. Why this cycle isnt in DB?????!!";

      let cycle = cycles[0];
      
      cycle.name = prompt("Give new name for cycle:", cycle.name);
      e.target.innerText = cycle.name;

      db.save([cycle]);

    });

  }
}
