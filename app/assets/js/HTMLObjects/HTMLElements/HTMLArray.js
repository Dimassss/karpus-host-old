class HTMLArray extends HTMLObject{
  constructor(selector, fields, valArrToStr, fieldsToVal, onchange = () => {}){
    //fields = {fieldName: [HTMLInput, set(val)]}
    //handler convert data from html field to string
    // fieldsConverter is a func which convert data from element to string to paste it in html element of html array
    super(selector);

    this.array = []; //array = [valArr, ...]
    this.fields = fields;
    this.onchange = onchange;
    this.fieldsToVal = fieldsToVal;
    this.valArrToStr = valArrToStr;

    Object.keys(fields).forEach(key => {
      if(fields[key].activate) fields[key].activate();
    });

    let _ = this;
    this.html.querySelector("div.input-group > span.btn.input-group-btn").addEventListener("click", e => _.addNewElement.call(_, e));
  }

  addNewElement(e){
    //calls when user click on "add" button
    let _ = this,
        val = _.fieldsToVal(_.fields);

    Object.keys(_.fields).map(k => _.fields[k].value = "");
    // - code - add element to the html array
    let container = _.html.parentNode.querySelector("div[class*='container']");

    container.insertAdjacentHTML("beforeend",
          `<span class="chip">
            <chip>${_.valArrToStr(val)}</chip>
            <a href="#" class="btn btn-clear" id="id${_.list.length}" aria-label="Close" role="button"></a>
          </span>`
    );
    // - code - add event listener to a cross of the html element
    container.querySelector("#id"+_.list.length).addEventListener("click", e => _.removeElement.call(_, e));
    //add new elemnt to HTMLArray object
    this.list[this.list.length] = val;
    this.onchange(this.list);
  }

  removeElement(e){
    //calls when user click on a cross of the html elemnt
    let id = parseInt(e.target.getAttribute("id").split("id")[1]);
    e.target.parentNode.outerHTML = "";
    //delete lement from HTMLArray object
    delete this.list[id];
    this.list = this.list.filter(el => el !== undefined);
    this.onchange(this.list);
  }

  clean(){
    // - code - remove all the elemnents of html array
    this.html.parentNode.querySelector("div[class*='container']").innerHTML = "";
    this.list = [];
  }

  set array(arr){
    // - code - remove all the elemnts in array
    this.clean();
    // - code - add new elemnts to html array
    let _ = this;

    this.list = arr;
    _.html.parentNode.querySelector("div[class*='container']").insertAdjacentHTML("beforeend", arr.map((val, i) =>
              `<span class="chip">
                <chip>${_.valArrToStr(val)}</chip>
                <a href="#" class="btn btn-clear" id="id${i}" aria-label="Close" role="button"></a>
              </span>`
    ).join(""));

    arr.forEach((val, i) => _.html.parentNode.querySelector("div[class*='container'] #id" + i).addEventListener("click", e => _.removeElement.call(_, e)));
  }

  get array(){
    return this.list;
  }
}
