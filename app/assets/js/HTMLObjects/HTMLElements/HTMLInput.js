class HTMLInput extends HTMLObject{
  constructor(selector, value, handler, onchange){
    //handler is func which convert data from one format to another
    //  handler:input.value -> formated
    //onchange(this.value) calls when user change data of input
    //value is a str to paste in html input

    super(selector);

    this.onchage = onchange;
    this.handler = handler;
    this.value = this.handler(value);

    this.html.value = value;
  }

  activateEventListener(){
    this.html.addEventListener("change", this.onChange);
  }

  onChange(e){
    this.value = this.handler(e.target.value);
    this.onchange(this.value.valueOf());
  }
}
