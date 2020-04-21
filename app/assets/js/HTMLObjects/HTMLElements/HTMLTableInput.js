class HTMLTableInput extends HTMLObject{
  constructor(selector, fields, value, strArrToValArr, valArrToStrArr, onchange){
    //fields is an array of selectors to the fields
    //strArrToValArr is func
    //onchange(this.value) calls when user change data of input
    //value is an array. value[i] = value to paste in fields[i] input

    super(selector);

    this.onchage = onchange;
    this.strToVal = strArrToValArr;
    this.valToStr = valArrToStrArr;
    this.value = value;
    this.fields = fields;
    
    fields.forEach((field, i) => this.html.querySelector(field).value = value[i]?valArrToStrArr(value[i]):"");
  }

  activate(){
    this.fields.forEach(field => this.html.querySelector(field).addEventListener("change", this.onChange));
  }

  onChange(e){
    this.value = this.handler(fields.map(field => this.html.querySelector(field).value.valueOf()));
    this.onchange(this.value);
  }

  set val(value){
    this.value = value;
    let _ = this;
    fields.forEach((field, i) => _.html.querySelector(field).value = value[i]?_.valToStr(value[i]):"");
  }
}
