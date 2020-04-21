class HTMLTextfield extends HTMLObject{
  constructor(selector, value, onchange){
    //onchange(this.value) calls when user change data of textfield
    //value is a str to paste in html textfield

    super(selector);

    this.onchange = onchange;
    this.val = value;

    this.html.value = value;
  }

  activate(){
    let _ = this;
    this.html.addEventListener("change", e => _.onChange(e));
  }

  onChange(e){
    this.val = e.target.value;
    this.onchange(this.val.valueOf());
  }

  set value(value){
    this.val = value;
    this.html.value = value;
  }
}
