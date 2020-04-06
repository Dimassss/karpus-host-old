class HTMLKitProductForm extends HTMLObject{
  constructor(selector, kit, products, maxWeight, maxVolume, callbacks){
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
    this.productsLIST = products;

    this.id = kit.id ? kit.id : NaN;
    this.cycleID = kit.cycleID ? kit.cycleID : NaN;
    this.name = kit.name ? kit.name : undefined;
    this.count = kit.count ? kit.count : 0;
    this.products = kit.products ? kit.products : {};
    this.pcPrice = this.products.map(pr => pr.price[pr.price.selected?pr.price.selected:"p-kt"] * (pr.count?pr.count*:0)).reduce((a, b) => a + b, 0);
    this.price = kit.price ? kit.price : this.pcPrice;
    this.pcWeight = this.products.map(pr => (pr.weight?pr.weight:0) * (pr.count?pr.count*:0)).reduce((a, b) => a + b, 0);
    this.weight = kit.weight ? kit.weight : this.pcPrice;
    this.maxVolume = maxVolume;
    this.maxWeight = maxWeight;

    super(selector);
  }

  createKitForm(){
    // - code - take data from @this and generate by it html for kit form
    //id of form is the same as id of kit
    // - code - paste generated html to the @this.html
  }

  deleteKitProductForm(){
    this.html.outerHTML = "";
    delete this;
  }

  addOrUpdateProduct(productID, selectedPrice, count){
    let _this = this;
    // - code - add or update product in the html form
    // - code - add event listeners
    this.products[productID] = {priceSelected: selectedPrice, count: count};
    this.pcPrice += count * productsLIST[productID].price[selectedPrice];
    this.pcWeight += count * productsLIST[productID].weight;
    // - code - update progress bar of html form
    if(count <= 0) this.hideProduct(product.id);

    this.callbacks.addOrUpdateProductEvent.forEach(cb => cb(new KitModel({
      id: _this.id,
      cycleID: _this.cycleID,
      name: _this.name?_this.name:"",
      count: this.count,
      products: _this.products,
      price: _this.price == _this.pcPrice?0:_this.price,
      weight: : _this.weight == _this.pcWeight?0:_this.weight;
    })));
  }

  onChangeForm(e){
    //calls when user change kit data, for example count of kit or smth like this

    //- code - get count, and price if it is possible
    //of it is possible to get that data, it writes it to this object
  }

  onChangeProduct(e){
    //calls when something is changed by user in html form

    let id, count, selectedPrice;
    //- code - get id, count and which price was selected from changed product
    this.addOrUpdateProduct(id, count, selectedPrice);

  }

  hideProductInForm(productID){
    if(this.products[productID]){
      // - code - hide the current product in htm form
    }
  }

  showProductInForm(productID){
    if(this.products[productID]){
      // - code - show the current product in htm form
    }
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
