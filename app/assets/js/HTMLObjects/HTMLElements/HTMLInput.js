class HTMLInput extends HTMLObject{
  constructor(selector, value, strToVal, valToStr, onchange){
    //strToVal is func which convert data from one format to another
    //  strToVal:input.value -> formated
    //onchange(this.value) calls when user change data of input
    //value is a str to paste in html input

    super(selector);

    this.onchange = onchange;
    this.valToStr = valToStr;
    this.strToVal = strToVal;
    this.val = value;

    if(this.html.getAttribute("type") == "checkbox") this.html.checked = valToStr(value);
    else this.html.value = valToStr(value);
  }

  activate(){
    let _ = this;
    this.html.addEventListener("change", e => _.onChange.call(_, e));
  }

  onChange(e){
    this.val = this.strToVal(e.target.value);
    this.onchange(this.val.valueOf());
  }

  get value(){
    return this.val;
  }

  set value(val){
    this.val = val;
    if(this.html.getAttribute("type") == "checkbox") this.html.checked = this.valToStr(val);
    else this.html.value = this.valToStr(val);
  }
}
