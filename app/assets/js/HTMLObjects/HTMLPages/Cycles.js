var mapper = {
  cycleBar: "body > main > section.cycles-tab-container",
  tables: {
    order: {
      selector: ".w-orders table#orders",
      cols: ["customerName", "telephone", "kits", "adress", "summary", "billed", "payDates", "pays", "orderNotes", "socialMedia"],
      //cols: ["customer.name", "order.telephone", "order.kits", "order.products", "order.adress", "order.summary", "order.billed", "order.pays", "order.payDates", "order.orderNotes", "order.socialMedia"]
    },
    kit: {
      selector: ".w-kits table#kits",
        cols: ["name", "type", "price"]
    },
    product: {
      selector: ".w-products table#products",
      cols: ["name", "unit", "price", "count", "dimensions", "weight", "description"]
    }
  },
  profiles: {
    kit: {
      selector: ".cycles-container .w-kits form",
      fields: {   //fieldName: relativeSelector
        name: "input#js-kit-name",
        pcPrice: "#js-kit-pc-price",
        price: "input#js-kit-price",
        type: "input#js-kit-type",
        size: "input#js-kit-size",
        dimensions: "input#js-kit-dimensions",
        pcWeight: "#js-kit-pc-weight",
        weight: "input#js-kit-weight",
        description: "textarea#js-kit-description",
        products: ".kits"
      }
    },
    product: {
      selector: ".cycles-container .w-products form",
      fields: {
        name: "input#js-product-name",
        unit: "select#js-product-unit",
        price: "table#js-product-price-set",
        count: "table#js-product-count-set",
        dimensions: "input#js-product-dimensions",
        weight: "input#js-product-weight",
        description: "textarea#js-product-description"
      }
    }
  },
  alertWin: {
    selector: ".alert-window",
    fields: {
      customerName: "h2:first-child" ,
      anotherName: "input#js-another-full-name",    //I need to add this field in db.order
      anotherTelephone: "input#js-another-telephone",
      isNotThis: "input#js-is-not-this",
      telephone: "input#js-telephones",
      socialMedia: "input#js-social-media",
      orderNotes: "textarea#js-order-notes",
      preferences: "textarea#js-order-preferences",
      addresses: "input#js-addresses",
      summary: "input#js-summary",
      sumPCText: "#js-summary-pc",
      billed: "input#js-is-billed",
      paysDiv: "form > div:nth-child(4) > div:nth-child(6) > div.input-group",
      pays: "input#js-order-paid",
      payDates: "input#js-order-pay-date",
      cycleID: "select#js-cycle",
      kits: ".kits",
    }
  },
  contextMenu: {
    selector: "header .drop .dropdown-content"
  }
}

var tableOrder = new HTMLTableOrders(mapper.tables.order.selector, {}, mapper.tables.order.cols),
    tableProduct = new HTMLTableProducts(mapper.tables.product.selector, {}, mapper.tables.product.cols),
    tableKit = new HTMLTableKits(mapper.tables.kit.selector, {}, mapper.tables.kit.cols),
    kitProfile = new HTMLProfileKit(mapper.profiles.kit.selector, mapper.profiles.kit.fields, tableKit.addOrUpdateRow),
    productProfile = new HTMLProfileProduct(mapper.profiles.product.selector, mapper.profiles.product.fields, tableProduct.addOrUpdateRow),
    alertWin = new HTMLAlertWinOrder(mapper.alertWin.selector, mapper.alertWin.fields, (customer, order) => {
      order.customerName = customer.fullName;
      tableOrder.addOrUpdateRow(new OrderModel(order));
    }),
    cycleBar = new HTMLCyclesBar(mapper.cycleBar, {
              selectCycle: [cycleID => tableOrder.loadOnCycleSelect(cycleID),
                            cycleID => tableProduct.loadOnCycleSelect(cycleID),
                            cycleID => tableKit.loadOnCycleSelect(cycleID)],
              deleteCycle: [tableOrder.deleteAllFromCycle, tableProduct.deleteAllFromCycle, tableKit.deleteAllFromCycle],
              cleanCycle: [tableOrder.cleanTable, tableProduct.cleanTable, tableKit.cleanTable]
            }),
    contextMenu = new HTMLContextMenu(mapper.contextMenu.selector, {
      deleteCycle: [cycleBar.deleteCycle, "Delete Cycle"],
      createProduct: [productProfile.open, "Create Product"],
      createKit: [kitProfile.open, "Create Kit"],
      deleteOrder: [tableOrder.deleteRow, "Delete Order"],
      deleteKit: [tableKit.deleteRow, "Delete Kit"],
      deleteProduct: [tableProduct.deleteRow, "Delete Product"]
    });

tableOrder.callbacks = {
    selectRow: [() => {}],
    dblSelectRow: [id => alertWin.open(id)],
    deleteRow: [id => {}]
  };
tableKit.callbacks = {
    selectRow: [kitProfile.open],
    deleteRow: [id => {if(kitProfile.kit && id == kitProfile.kit.id) kitProfile.clean()}]
  };
tableProduct.callbacks = {
  selectRow: [productProfile.open],
  deleteRow: [id => {if(productProfile.kit && id == productProfile.kit.id) productProfile.clean()}]
};

cycleBar.activate();
kitProfile.activate();
productProfile.activate();
alertWin.activate();
