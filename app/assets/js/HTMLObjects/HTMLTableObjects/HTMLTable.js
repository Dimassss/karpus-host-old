/**
class Object looks like:
{
  html: HTMLObject,
  cols: [cols],
  body:{
    rowID: {col: data}
  }
  findInput: htmlObject,
  selected: idOfRow
}

Child class has function, wich will be used by Parent class. That function is like select() trigger for event of selection of the row.
Following function must be in child:
@selectRow()
Following function can be in child:
@dblSelectRow()
@find(str)
*/

class HTMLTable extends HTMLObject{
  constructor(db, selector, tableColumns/*, db*/){
    /**
    tableColumns = ["col1", "col2"]
    */
    super(selector);

    this.tableIsFull = false; //if true, when user scroll table, it wouldnt liod new rows. Sets true when all the rows from db are loaded.
    this.columns = tableColumns;
    this.db = db;
    this.body = {};
    this.selected = NaN; //means that nothing is selected
    this.sqlMain = ""; //sqlMain is str which always is added to start of the load sql request
    this.sqlData = []; //data to select(). (To "?" places in sqlMain)
    this.db = db;

    this.findInput = this.html.parentElement.parentElement.parentElement.querySelector("input.search");
    if(this.findInput) this.findInput.addEventListener("change", e => this.findEvent(e));
    this.html.addEventListener("scroll", e => this.loadNewRowsEvent());
  }

  loadNewRowsEvent(forceLoad){
    let _this = this;

    if(!this.tableIsFull) if(forceLoad == "FL" || this.html.scrollHeight - this.html.scrollTop < 400)
      this.db.select(
        {
          sqlMain: _this.sqlMain,
          sqlData: _this.sqlData,
          count: 30,
          order: "DESC",
          haveIDs: Object.keys(this.body),
          searchingStr: (_this.findInput && _this.findInput.value)?_this.findInput.value:"",
          searchCols: Object.fromEntries(_this.columns.filter(col => !["id"].includes(col)).map(col => [col, "string"])),
          getCols: "*"
        },
        rows => {
          if(!rows) _this.tableIsFull = true;
          else{
            rows.forEach(row => _this.addOrUpdateRow(row));
          }
        }
      );
  }

  addOrUpdateRow(row){
    /**
    Add a row to the Table
    If row exist it will be updated.
    row is a Model object
    row = {id:23, data1:d1, ...}
    */
   
    if(!row || (!row.id && row.id != 0)){
      console.assert(0, {text: "Row without id", class: this.valueOf(), row: row.valueOf()});
      return;
    }

    let rowHTML = "";
    this.columns.forEach(col => {
      rowHTML += `<td data-rowID="${row.id}" data-col-name="${col}">${row.getCellOfRow(col)}</td>`;
    });

    const isNew = this.body[row.id]?false:true;

    if(this.body[row.id]) this.html.querySelector(`tr[data-rowID='${row.id}']`).innerHTML = rowHTML;
    else this.html.querySelector("tbody").insertAdjacentHTML("beforeend", `<tr data-rowID='${row.id}'>${rowHTML}</tr>`);

    this.body[row.id] = row;

    let tr = this.html.querySelector("tr[data-rowID='" + row.id + "']");
    let _ = this;
    //Maybe i need to update all the cells
    if(!isNew) return;
    tr.addEventListener("click", e => this.selectRowEvent(e));
    if(this.dblSelectRow) tr.addEventListener("dblclick", e => this.dblSelectRow(e));
  }

  deleteRow(rowID = this.selected){
    //if row exist it will be deleted
    //rowID is an element id (for example, id of customer or order)

    if(!rowID) return;

    let _ = this;
    let row = this.html.querySelector("tr[data-rowID='" + rowID + "']");
    if(row) row.outerHTML = "";
    if(_.body[rowID]) delete _.body[rowID];
    this.db.del([rowID]);
    if(this.callbacks.deleteRow) this.callbacks.deleteRow.forEach(cb => cb(rowID));
    this.selected = NaN;
  }

  deleteAllFromCycle(cycleID){
    let _ = this;
    _.db.select({
      searchingStr: cycleID,
      searchCols: {"cycleID":"number"},
      getCols: ["id"]
    }, records => _.db.del(records.map(rec => rec.id)));
  }

  selectRowEvent(e){
    this.removeSelectionInTable();
    this.selectRowInTable(e.target.getAttribute("data-rowID"))
    if(this.selectRow) this.selectRow(); //Use this.selected to get rowID
  }

  selectRowInTable(id){
    this.selected = id;
    this.html.querySelector("tr[data-rowID='" + this.selected + "']").classList.add("selected");
  }

  removeSelectionInTable(){
    if(!isNaN(this.selected)) this.html.querySelector("tr[data-rowID='" + this.selected + "']").classList.remove("selected");
  }

  findEvent(){
    this.cleanTable();
    this.loadNewRowsEvent("FL");
  }

  cleanTable(){
    this.body = {};
    this.html.querySelector("tbody").innerHTML = "";
    this.tableIsFull = false;
    this.selected = NaN;
  }
}
