class HTMLInput extends HTMLObject{
  constructor(selector, text){
    super(selector);

    this.text = text;
    this.html.innerHTML = text;
  }

  set text(text){
    this.text = text;
    this.html.innerHTML = text;
  }
}
