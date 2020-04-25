class HTMLList extends HTMLObject{
  constructor(selector, canWrite, list, selectedDefault, onchange){
    //canWrite  is a boolean value
    //if canWrite = true, @selected field will be a string, else is will be and index in @list array
    //if cant write: list = [[idInDBOfElemnt, StrToShowInHTMLList]]
    //if can write: list = [StrToShowInHTMLList]
    //selectedDefault is and index in @list
    //onchange = [cb(sthis.list[elected])]

    super(selector);

    this.canWrite = canWrite;
    this.sel = selectedDefault;
    this.onchangeEvent = data => onchange.forEach(f => f(data));
    this.list = list;

    //add event listener to the html list
    let _ = this;
    this.html.addEventListener("change", e => _.onChange(e));
  }

  onChange(e){
    let _ = this;
    //calls when user change or select something in the html list

    //get id of an element or str and writes it to the this.selected
    this.selected = e.target.value

    //run callback functions
    this.onchangeEvent(_.sel);
  }

  set selected(val){
    this.sel = val;
    this.html.value = val;
  }

  set array(list){
    let _ = this;
    _.list = list;
    //generate html and show the list on page
    if(_.canWrite) _.html.parentNode.querySelector("datalist").innerHTML = list.map(el => `<option>${el}</option>`).join("");
    else _.html.innerHTML = list.map((el, i) => `<option value="${el[0]}"${i==_.selected?" selected":""}>${el[1]}</option>`).join("");
  }
}
