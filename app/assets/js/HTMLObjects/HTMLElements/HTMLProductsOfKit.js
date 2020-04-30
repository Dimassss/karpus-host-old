class HTMLProductsOfKit extends HTMLObject{
  constructor(selector, maxWeight = 10, maxVolume = 10, callbacks){
    /**
    @kit is object of KitModel class
    */
    //kit = {id, cycleID, name, count, price, weight, products: {id: {priceSelected: price_type, count}}}
    //products = {id: productModel}
    //callbacks = {funcName: [callbacks]}
    /*
    Needed callbakcs to funks:
      addOrUpdateProductEvent(KitModel)
      deleteProductInFormEvent(KitModel)

    */
    super(selector);

    let _ = this;

    this.callbacks = callbacks;
    this.maxVolume = maxVolume;
    this.maxWeight = maxWeight;
  }

  fillForm(kit, products){
    let _ = this;
    this.productsLIST = Object.values(products);
    //setting products
    let prs = JSON.parse(JSON.stringify(Object.fromEntries(products.map(pr => [pr.id, pr]))));
    Object.keys(prs).forEach(id => {
      prs[id].count = 0;
      prs[id].price.selected = "p-kt";
    });
    Object.keys(kit.products).forEach(id => {
      if(!prs[id])return;
      prs[id].count = kit.products[id].count;
      prs[id].price.selected = kit.products[id].price.selected;
    });
    this.products = prs;
    //end setting products
    this.pcPrice = Object.keys(_.products).map(k => _.products[k].price[_.products[k].price.selected?_.products[k].price.selected:"p-kt"] * (_.products[k].count?_.products[k].count:0)).reduce((a, b) => a + b, 0);
    this.price = kit.price ? kit.price : this.pcPrice;
    this.pcWeight = Object.keys(_.products).map(k => (_.products[k].weight?_.products[k].weight:0) * (_.products[k].count?_.products[k].count:0)).reduce((a, b) => a + b, 0);
    this.weight = kit.weight ? kit.weight : this.pcPrice;

    //generate html of products and paste it to the container
    let html = this.productsLIST.map(pr => {
                                          pr = _.products[pr.id]?_.products[pr.id]:pr;
                                          return `<div data-product_id='${pr.id}' class="product columns" ${(pr.count>0)?"":'style="display:none"'}>
                                              <div class="col-5">${pr.name}</div>
                                              <div class="col-1">${pr.unit}</div>
                                              <div class="col-3">
                                                <select class="form-select prices">
                                                  <option value="p-kt" title="kit"${pr.price.selected == "p-kt"?" selected":""}>k-${pr.price["p-kt"]}</option>
                                                  <option value="p-wh" title="wholesale"${pr.price.selected == "p-wh"?" selected":""}>w-${pr.price["p-wh"]}</option>
                                                  <option value="p-sh" title="shop"${pr.price.selected == "p-sh"?" selected":""}>s-${pr.price["p-sh"]}</option>
                                                  <option value="p-rst" title="restaurant"${pr.price.selected == "p-rst"?" selected":""}>r-${pr.price["p-rst"]}</option>
                                                </select>
                                              </div>
                                              <div class="col-3"><input value="${pr.count>0?pr.count:0}" min="0" placeholder="Count" class="form-input count" type="number"/></div>
                                            </div>`;
                                          }).join("");

    _.html.innerHTML = html;
    //add event listeners to fields
    Array.apply(null, _.html.querySelectorAll(".product")).forEach(htmlPr => {
      htmlPr.querySelector(".prices").addEventListener("change", e => {
        let prID = parseInt(e.target.parentNode.parentNode.dataset.product_id);
        if(!_.products[prID]) _.products[prID] = _.productsLIST.find(pr => pr.id == prID);
        _.products[prID].count = parseInt(e.target.parentNode.parentNode.querySelector("input.count").value);
        _.products[prID].price.selected = e.target.parentNode.parentNode.querySelector("select.prices").value;

        _.callbacks.addOrUpdateProductEvent(new KitModel({
          products: _.products,
          pcPrice: _.pcPrice,
          price: _.price,
          weight: _.weight,
          pcWeight: _.pcWeight,
        }));
      });
      htmlPr.querySelector(".count").addEventListener("change", e => {
        let prID = parseInt(e.target.parentNode.parentNode.dataset.product_id);
        if(!_.products[prID]) _.products[prID] = _.productsLIST.find(pr => pr.id == prID);
        _.products[prID].count = parseInt(e.target.parentNode.parentNode.querySelector("input.count").value);
        _.products[prID].price.selected = e.target.parentNode.parentNode.querySelector("select.prices").value;

        _.callbacks.addOrUpdateProductEvent(new KitModel({
          products: _.products,
          pcPrice: _.pcPrice,
          price: _.price,
          weight: _.weight,
          pcWeight: _.pcWeight,
        }));
      });
    });

    _.html.addEventListener("contextmenu", e => {
      e.preventDefault();
      _.toggleProductsInForm();
    })
  }

  addOrUpdateProduct(productID, selectedPrice, count, fromInp /*means that method calls from onChangeProduct method*/){
    let _this = this;

    if(!fromInp){
      // - code - add or update product in the html form
      // - code - add event listeners
    }

    this.products[productID] = {priceSelected: selectedPrice, count: count};
    this.pcPrice = this.products.map(pr => pr.price[pr.price.selected?pr.price.selected:"p-kt"] * (pr.count?pr.count:0)).reduce((a, b) => a + b, 0);
    this.pcWeight = this.products.map(pr => (pr.weight?pr.weight:0) * (pr.count?pr.count:0)).reduce((a, b) => a + b, 0);
    // - code - update progress bar of html form
    if(count <= 0) this.hideProduct(product.id);

    if(fromInp) this.callbacks.addOrUpdateProductEvent.forEach(cb => cb({
      products: _this.products,
      pcPrice: _this.pcPrice,
      price: _this.price,
      pcWeight: _this.pcWeight,
      weight: _this.weight
    }));
  }

  onChangeProduct(e){
    //calls when something is changed by user in html form

    let id, count, selectedPrice;
    //- code - get id, count and which price was selected from changed product
    this.addOrUpdateProduct(id, count, selectedPrice, true);

  }

  toggleProductsInForm(){
    //hide products which has count = 0
    let _ = this;
    Array.apply(null, _.html.querySelectorAll(".product")).forEach(pr => {
      if(parseInt(pr.querySelector("input.count").value) <= 0){
        pr.style.display = {flex: "none", none: "flex"}[pr.style.display];
      }
    });
  }

  deleteProductInForm(productID){
    if(this.products[productID]){
      let product = this.products[productID];

      // - code - delete the current product in htm form
      this.pcPrice -= product.count * productsLIST[productID].price[product.priceSelected];
      this.pcWeight -= product.count * productsLIST[productID].weight;
      delete this.products[productID];
      // - code - update progress bar of html form
    }
  }
}
