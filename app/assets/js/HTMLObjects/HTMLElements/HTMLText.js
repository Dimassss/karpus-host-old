class HTMLText extends HTMLObject{
  constructor(selector, text){
    super(selector);

    this.txt = text;
    this.html.innerHTML = text;
  }

  set text(text){
    this.txt = text;
    this.html.innerHTML = text;
  }
}
