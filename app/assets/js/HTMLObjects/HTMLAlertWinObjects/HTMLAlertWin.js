class HTMLAlertWin extends HTMLObject{
  constructor(selector){
    /**
    selector - selector to the AlertWin

    Methods in child class:
    ok() - calls when user click on a "ok" button
    fillUp() - fill up AlertWin by data

    */
    super(selector);

    this.html.querySelector("navbar label:nth-child(1)").addEventListener("click", this.ok);
  }

  open(){
    this.fillUp();
    this.html.querySelector("input#open-alert-window[name=open-alert-window]").checked = true;
  }
}
