class HTMLTableInput extends HTMLObject{
  constructor(selector, fields, value, valArrRefresh, valArrToStrArr, onchange){
    //fields is an array of selectors to the fields
    //strArrToValArr is func
    //onchange(this.value) calls when user change data of input
    //value is an array. value[key] = value to paste in fields[key] input

    super(selector);

    this.onchange = onchange;
    this.valArrRefresh = valArrRefresh;
    this.valToStr = valArrToStrArr;
    this.value = valArrRefresh(value);
    this.fields = fields;
    let _ = this;
    Object.entries(_.fields).forEach(field => _.html.querySelector(field[1]).value = value[field[0]]);
  }

  activate(){
    let _ = this;
    Object.values(_.fields).forEach(field => this.html.querySelector(field).addEventListener("change", e => _.onChange(e)));
  }

  onChange(e){
    let _ = this;
    this.value[e.target.dataset.type] = e.target.value;
    this.value = _.valArrRefresh(_.value);
    Object.entries(_.fields).forEach(field => _.html.querySelector(field[1]).value = _.value[field[0]]);
    this.onchange(_.value);
  }

  set val(value){
    this.value = this.valArrRefresh(value);
    let _ = this;
    Object.entries(_.fields).forEach(field => _.html.querySelector(field[1]).value = value[field[0]]);
  }
}
