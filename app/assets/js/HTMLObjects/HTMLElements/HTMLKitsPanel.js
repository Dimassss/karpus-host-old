class HTMLKitsPanel extends HTMLObject{
  constructor(selector, callbacks){
    /*
    callbacks to HTMLKitProductForm
    */
    super(selector);

    this.selector = selector;
    this.kits = []; // HTMLKit array
    this.dbKit = new KitTableSQL;
    this.dbProduct = new ProductTableSQL;
    this.dbCycle = new CycleTableSQL;
    this.callbacks = callbacks;
  }

  addKit(kit, products){
    let _ = this;

    _.html.insertAdjacentHTML("afterbegin", `<div class="kit js-to-save" data-kit-id="${kit.id}"></div>`);

    let kitForm = new HTMLKitProductForm(_.selector + ` div[data-kit-id='${kit.id}']`, {
      updateFormEvent: () => {
        _.callbacks.updateFormEvent(Object.fromEntries(_.kits.map(htmlKit => {
          let k = htmlKit.kit;
          return [k.id, k];
        })));
      },
      updateKitCount: () => {
        (new DBAccess()).getLeftCountOfProductsNotInOrder(_.orderID, _.cycleID, counts => {
          let c = {};

          _.kits.forEach(kitHTML => {
            kitHTML.productsLIST.forEach(pr => {
              if(!c[pr.id]) c[pr.id] = 0;
              c[pr.id] += (kitHTML.kit.count?kitHTML.kit.count:0)*(kitHTML.kit.products[pr.id].count);
            });
          });

          _.kits.forEach(kitHTML => {
            kitHTML.productsLIST.forEach(pr => {
              kitHTML.updateLeftCountOfProduct(pr.id, (counts[pr.id]?counts[pr.id]:0)-(c[pr.id]?c[pr.id]:0));
            });
          });
        });
      },
      updateProductCountEvent: prID => {
        (new DBAccess()).getLeftCountOfProduct(prID, _.orderID, _.cycleID, count => {
          let c = 0;

          _.kits.forEach(kit => {
            const l = kit.kit.products[prID].count*kit.kit.count;
            c += l?l:0;
          });

          _.kits.forEach(kit => {
            kit.updateLeftCountOfProduct(prID, count-c);
          });
        });
      }
    }, true);
    kitForm.fillKitForm(kit, products);
    _.kits[_.kits.length] = kitForm;
  }

  loadKits(cycleID, preparedKits = [], cb = () => {}){
    /*
    preparedKits = [kit, ...]
    cb(kits, products)
    */

    let _ = this;
    _.cycleID = cycleID;

    _.clean();

    _.dbProduct.select({}, products => {
      _.products = products;
      _.dbCycle.load([cycleID], cycles => {
        if(!cycles[0]) return;
        products.forEach((pr, i) => {
          if(cycles[0].products[pr.id]){
            products[i] = {...pr, ...cycles[0].products[pr.id]};
            products[i].__proto__ = ProductModel.prototype;
          }
        });
        _.dbKit.select({
          searchingStr: cycleID,
          searchCols: {"cycleID": "number"},
          getCols: "*"
        }, kits => {
          let idMap = {};
          preparedKits.forEach(kit => idMap[kit.id] = kit);
          kits = kits.map(kit => {
            if(idMap[kit.id]) return new KitModel(idMap[kit.id]);
            return kit;
          });

          (new DBAccess()).getLeftCountOfProducts(cycleID, counts => {
            products.forEach((pr,i) => {
              products[i].countLeft = counts[pr.id]?counts[pr.id]:0;
            });

            kits.forEach(kit => _.addKit(kit, products));

            cb(kits, products);
          });
        });
      });
    });
  }

  clean(){
    let _ = this;

    _.kits.forEach(kit => kit.deleteKitProductForm());
    _.kits = [];

    Array.apply(_.html.querySelectorAll(".kit.js-to-save")).forEach(kit => kit.outerHTML = "");
  }
}
