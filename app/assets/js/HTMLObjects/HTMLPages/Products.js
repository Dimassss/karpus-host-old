var mapper = {
  tables: {
    product: {
      selector: "section.table-container table#products",
      cols: ["name", "unit", "price", "dimensions", "weight", "description"]
    }
  },
  profiles: {
    product: {
      selector: ".tabs-container .windows .window.w-products form",
      fields: {
        name: "input#js-product-name",
        unit: "select#js-product-unit",
        price: "table#js-product-price-set",
        dimensions: "input#js-product-dimensions",
        weight: "input#js-product-weight",
        description: "textarea#js-product-description"
      }
    }
  },
  contextMenu: {
    selector: "header .drop .dropdown-content"
  }
};

var tableProduct = new HTMLTableProducts(mapper.tables.product.selector, {}, mapper.tables.product.cols, "products"),
    productProfile = new HTMLProfileProduct(mapper.profiles.product.selector, mapper.profiles.product.fields, product => {
      tableProduct.addOrUpdateRow(product);
      tableProduct.selectRowInTable(product.id);
    }, "products"),
    contextMenu = new HTMLContextMenu(mapper.contextMenu.selector, {
      createProduct: [e => {
        productProfile.open();
        tableProduct.removeSelectionInTable();
      }, "Create Product"],
      deleteProduct: [e => {
        tableProduct.deleteRow();
        productProfile.clean();
      }, "Delete Product"]
    });

tableProduct.callbacks = {
  selectRow: [table => productProfile.open(table.selected)],
  deleteRow: [id => {if(productProfile.kit && id == productProfile.kit.id) productProfile.clean()}]
};

productProfile.activate();
tableProduct.load();
