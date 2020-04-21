class HTMLContextMenu extends HTMLObject{
  constructor(selector, list){
    //list = { elementName : [callback, NameInContext]}

    super(selector);

    // - code - add list to the html
    this.html.innerHTML = Object.keys(list).map(k => "<a href='#' data-el='" + k + "'>" + list[k][1] + "</a>").join("");
    // - code - add event listeners
    let _ = this;
    Object.keys(list).forEach(k => {
      _.html.querySelector("a[data-el='" + k + "']").addEventListener("click", list[k][0]);
    });
  }


}
