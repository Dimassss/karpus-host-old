var mapper = {
  tables: {
    order: {
      selector: ".customerProfile table#customer_orders",
      cols: ["customerName", "telephone", "kits", "adress", "summary", "billed", "pays", "payDates", "orderNotes", "socialMedia"],
    },
    customer: {
      selector: ".customerProfile table#customers",
        cols: ["fullName", "telephones"]
    }
  },
  profiles: {
    customer: {
      selector: ".customerProfile",
      fields: {   //fieldName: relativeSelector
        fullName: "input#js-full-name",
        telephones: "input#js-telephones",
        telephoneDiv: "div.windows > div:nth-child(2) > form > div:nth-child(2) > div:nth-child(2)",
        adresses: "input#js-addresses",
        adressDiv: "div.windows > div:nth-child(2) > form > div:nth-child(3) > div:nth-child(2)",
        email: "input#js-e-mail",
        notes: "textarea#js-notes",
        preferences: "textarea#js-preferences",
        socialMedia: "input#js-social-medias",
        socialMediaDiv: "div.windows > div:nth-child(2) > form > div:nth-child(7) > div:nth-child(2)",
        activity: "input#js-activity",
        createCycle: ".windows .window label[name='create_order']"
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

var tableOrder = new HTMLTableOrders(mapper.tables.order.selector, {}, mapper.tables.order.cols, {main:"1=2", data:[]}),
    tableCustomer = new HTMLTableCustomers(mapper.tables.customer.selector, {}, mapper.tables.customer.cols),
    alertWin = {},
    customerProfile = new HTMLProfileCustomer(mapper.profiles.customer.selector, mapper.profiles.customer.fields, customer => tableCustomer.addOrUpdateRow(customer), customer => {
      //create order
      console.log(customer, customer.id)
      alertWin.fillUp(undefined,customer.id);
    }),
    alertWin = new HTMLAlertWinOrder(mapper.alertWin.selector, mapper.alertWin.fields, (customer, order) => {
      order.customerName = customer.fullName;
      tableOrder.addOrUpdateRow(new OrderModel(order));
    }),
    contextMenu = new HTMLContextMenu(mapper.contextMenu.selector, {
      createCustomer: [e => {
        customerProfile.open();
      }, "Create Customer"],
      deleteCustomer: [e => {
        tableCustomer.deleteRow();
        //tableOrder.deleteOrdersOfCustomer(customerProfile.customer.id);
        customerProfile.clean();
      }, "Delete Customer"],
      deleteOrder: [e => {
        tableOrder.deleteRow();
      }, "Delete Order"]
    });

tableOrder.callbacks = {
    selectRow: [() => {}],
    dblSelectRow: [id => alertWin.open(id)],
    deleteRow: [id => {}]
  };
tableCustomer.callbacks = {
    selectRow: [table => {
      tableOrder.cleanTable();
      tableOrder.sqlMain = "customerID = ?";
      tableOrder.sqlData = [table.selected];
      tableOrder.loadNewRowsEvent("FL");
      customerProfile.open(table.selected);
    }],
    deleteRow: [id => {if(customerProfile.customer && id == customerProfile.customer.id) customerProfile.clean()}]
  };

customerProfile.activate();
alertWin.activate();
tableCustomer.loadNewRowsEvent("FL");
