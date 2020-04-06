class HTMLTableInput extends HTMLObject{
  constructor(selector, fields, value, handler, onchange){
    //fields is an array of selectors to the fields
    //handler is func which convert data from one format to another
    //  handler:{fieldName:value} -> formated
    //onchange(this.value) calls when user change data of input
    //value is an array. value[i] = value to paste in fields[i] input

    super(selector);

    this.onchage = onchange;
    this.handler = handler;
    this.value = this.handler(value);
    this.fields = fields;

    fields.forEach((field, i) => this.html.querySelector(field).value = value[i]?value[i]:"");
  }

  activateEventListener(){
    this.fields.forEach(field => this.html.querySelector(field).addEventListener("change", this.onChange));
  }

  onChange(e){
    this.value = this.handler(fields.map(field => this.html.querySelector(field).value.valueOf()));
    this.onchange(this.value);
  }
}
