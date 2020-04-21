class HTMLAlertWin extends HTMLObject{
  constructor(selector){
    /**
    selector - selector to the AlertWin

    Methods in child class:
    ok() - calls when user click on a "ok" button
    fillUp() - fill up AlertWin by data

    */
    super(selector);

    let _ = this;
    this.html.querySelector("navbar label:nth-child(1)").addEventListener("click", e => this.ok.call(_, e));
  }

  open(id){
    this.fillUp(id);
    this.html.parentNode.querySelector("input#open-alert-window").checked = true;
  }
}
