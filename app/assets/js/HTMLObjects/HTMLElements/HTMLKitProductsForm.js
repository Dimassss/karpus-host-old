class HTMLKitProductForm extends HTMLObject{
  constructor(selector, callbacks, fullMode){
    //callbacks = {funcName: [callbacks]}
    //fullMode is boolean value. If true form will be generated like in alert win orders. If false it will generate only product form
    /*
    Needed callbakcs to funks:
      updateFormEvent(KitModel)

    */
    super(selector);

    this.fullMode = fullMode;
    this.selector = selector;
    this.callbacks = callbacks;
  }

  fillKitForm(kit, products, maxWeight = 10, maxVolume = 10){
    /**
    @kit is object of KitModel class
    */
    //kit = {id, cycleID, name, count, price, weight, products: {id: {priceSelected: price_type, count}}}
    //products = {id: productModel}
    let idMap = products.constructor.name == "array"?Object.fromEntries(products.map(pr => [pr.id, pr])):products;
    let _ = this;

    this.productsLIST = products;
    this.id = kit.id ? kit.id : NaN;
    this.cycleID = kit.cycleID ? kit.cycleID : NaN;
    this.name = kit.name ? kit.name : undefined;
    this.count = kit.count ? kit.count : 0;
    this.products = Object.fromEntries(Object.values(kit.products).filter(pr => idMap[pr.id] != undefined).map(pr => [pr.id, pr]));
    this.pcPrice = Object.values(products).filter(pr => kit.products[pr.id]).map(pr => pr.price[kit.products[pr.id].selected?kit.products[pr.id].selected:"p-kt"] * kit.products[pr.id].count).reduce((a, b) => a + b, 0);
    this.price = kit.price ? kit.price : this.pcPrice;
    this.pcWeight = Object.keys(this.products).map(k => (_.products[k].weight?_.products[k].weight:0) * (_.products[k].count?_.products[k].count:0)).reduce((a, b) => a + b, 0);
    this.weight = kit.weight ? kit.weight : this.pcPrice;
    this.maxVolume = maxVolume;
    this.maxWeight = maxWeight;

    let html = `<h6 class="columns">
                  ${_.fullMode
                    ?`<div class="col-3 pcWeight"></div>
                      <div class="col-3 pcPrice"></div>
                      <div class="col-3"><input value="${_.price}" placeholder="Price" class="form-input price" type="number" min="0"/></div>
                      <div class="col-3"><input value="${_.count}" placeholder="Count" class="form-input count" type="number" min="0" step="1"/></div>`
                    :``
                  }
                  <progress class="progress col-12" value="${600/maxVolume}" min="0" max="100"></progress>
                  <progress class="progress col-12" value="${(_.weight/maxWeight)*100}" min="0" max="100"></progress>
                </h6>
                <div class="products-container unique-scroll"></div>`;

    this.html.innerHTML = html;

    this.fields = {};
    if(_.fullMode){
      this.fields.price = new HTMLInput(
                            _.selector + " h6 .price",
                            0,
                            str => Math.round(parseFloat(str)*100)/100,
                            val => val.toFixed(2),
                            val => {
                              _.price = val;
                              _.callbacks.updateFormEvent();
                            }
                          );
      this.fields.count = new HTMLInput(
                            _.selector + " h6 .count",
                            0,
                            str => parseInt(str),
                            val => val,
                            val => {
                              _.count = val;
                              _.callbacks.updateFormEvent();
                            }
                          );
      this.fields.pcPrice = new HTMLText(_.selector + " h6 .pcPrice", _.pcPrice.toFixed(2) + " uah");
      this.fields.pcWeight = new HTMLText(_.selector + " h6 .pcWeight", _.pcWeight.toFixed(2) + " kg");

      Object.values(_.fields).forEach(f => {
        if(f.activate) f.activate();
      });

      _.fields.price.value = _.price;
      _.fields.count.value = _.count;
    }

    this.productsForm = new HTMLProductsOfKit(_.selector + " .products-container", maxWeight, maxVolume, {
      addOrUpdateProductEvent: kit => {
        _.products = kit.products;
        _.pcPrice = Object.keys(_.products).map(k => _.products[k].price[(_.products[k].price.selected)?(_.products[k].price.selected):("p-kt")] * (_.products[k].count?_.products[k].count:0)).reduce((a, b) => a + b, 0);
        _.pcWeight = Object.keys(_.products).map(k => (_.products[k].weight?_.products[k].weight:0) * (_.products[k].count?_.products[k].count:0)).reduce((a, b) => a + b, 0);

        if(_.fullMode){
          _.fields.pcPrice.text = _.pcPrice.toFixed(2) + "uah";
          _.fields.pcWeight.text = _.pcWeight.toFixed(2) + "kg";
        }

        _.callbacks.updateFormEvent();
      },
      deleteProductInFormEvent: kit => {
        _.products = kit.products;
        _.pcPrice = Object.keys(_.products).map(k => _.products[k].price[(_.products[k].price.selected)?(_.products[k].price.selected):("p-kt")] * (_.products[k].count?_.products[k].count:0)).reduce((a, b) => a + b, 0);
        _.pcWeight = Object.keys(_.products).map(k => (_.products[k].weight?_.products[k].weight:0) * (_.products[k].count?_.products[k].count:0)).reduce((a, b) => a + b, 0);

        if(_.fullMode){
          _.fields.pcPrice.text = _.pcPrice + " uah";
          _.fields.pcWeight.text = _.pcWeight + " kg";
        }

        _.callbacks.updateFormEvent();
      }
    });
    this.productsForm.fillForm(_.kit, _.productsLIST,);
  }

  deleteKitProductForm(){
    this.html.outerHTML = "";
    delete this;
  }

  onChangeForm(e){
    //calls when user change kit data, for example count of kit or smth like this

    //- code - get count, and price if it is possible
    //of it is possible to get that data, it writes it to this object
  }

  hideZeroProductsInForm(productID){
    if(this.products[productID]){
      // - code - hide the current product in htm form
    }
  }

  showProductsInForm(productID){
    if(this.products[productID]){
      // - code - show the current product in htm form
    }
  }

  get kit(){
    let _ = this;
    return new KitModel({
      id: _.id,
      name: _.name,
      count: _.count,
      products: _.products,
      price: _.price == _.pcPrice? 0 : _.price,
      weight: _.weight == _.pcWeight? 0 : _.weight,
      pcPrice: _.pcPrice,
      pcWeight: _.pcWeight
    });
  }
}
