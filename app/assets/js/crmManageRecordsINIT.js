init();

function init(){
  var page = new Page({
        toggleListeners:[
          [
            window.document.body.querySelector("header.header .upper>b:last-child i"),
            window.document.body.querySelector("header.header > .nav-menu"),
            ["click"]
          ]
        ],
        uncorrectTables:[
          "order"
        ],
        scrollButtons: [
          document.querySelector("body div.cycles-bar .cycles"),
          document.querySelector("body div.cycles-bar div.scrollButton i:first-child"),
          document.querySelector("body div.cycles-bar div.scrollButton i:nth-child(2)")
        ],
        saveRecordURL: "/crm/functions/runManageOrdersNavFuncButton/"
      }),
      table = new Table({
        tablename: "order",
        countOfRecordsForRequest: 1000,
        number: 0,
        where: {},
        getTableContentURL: "/crm/functions/getManageOrdersTable",
        saveRecordURL: "/crm/functions/runManageOrdersNavFuncButton/"
      });

  table.inserNewData({
    navFunc: table.sendRequestFromNavMenu,
    page: page
  });
  page.inserNewData({
    saveRecord: table.runNavFuncButton,
    ajax: table.ajax
  });
  page.setListenersToggle();
  table.getTableContent(["tbody","thead", "searchFields"], function(data){
    var r = JSON.parse(data);
    r.renderType = {tbody:"write", thead:"write"};
    table.page = page;
    page.generateTableContent(table.tablename, r, true, function(){
      page.generateCreateRow(table.tablename, 0, "beforeend")
    });
    page.setStylesForTables();
    document.querySelectorAll("table#"+table.tablename+" thead tr:first-child th input").forEach(field => field.addEventListener("change", table.search));
  });
  document.querySelectorAll("body div.cycles-bar .cycles div[class^='datefrom-']").forEach(btn => btn.addEventListener("click", function(){
        table.number = 0;
        document.querySelector("table#"+table.tablename+" tbody").outerHTML = "";
        table.cycleID = +btn.className.split("-")[1];
        table.getTableContent(["tbody"], function(data){
          var r = JSON.parse(data);
          r.renderType = {tbody:"write"};
          page.generateTableContent(table.tablename, r, true, function(){
            page.generateCreateRow(table.tablename, 0, "beforeend")
          });
          page.setStylesForTables();
          document.querySelectorAll("table#"+table.tablename+" thead tr:first-child th input").forEach(field => field.addEventListener("change", table.search));
        });
      })
    );
  document.addEventListener("touch", unsetChecked, true);
  document.addEventListener("mouseup", unsetChecked, true);
  page.setListenersForScrollButtons();
}

function unsetChecked(){
  window.document.body.querySelector("header.header > .nav-menu").classList.remove("checked");
}
