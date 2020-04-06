class HTMLList extends HTMLObject{
  constructor(selector, canWrite, list, selectedDefault, onchange){
    //canWrite  is a boolean value
    //if canWrite = true, @selected field will be a string, else is will be and index in @list array
    //list = [{id:idInDBOfElemnt, str: StrToShowInHTMLList}]
    //selectedDefault is and index in @list
    //onchange = [cb(sthis.list[elected])]

    super(selector);

    this.list = list;
    this.canWrite = canWrite;
    this.selected = selectedDefault;
    this.onchangeEvent = onchange;

    //generate html and show the list on page
    //add event listener to the html list
  }

  onChange(e){
    //calls when user change or select something in the html list

    //get id of an element or str and writes it to the this.selected
    //run callback functions
  }
}
