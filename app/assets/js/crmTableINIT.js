init();

function init(){
  var options = {
        toggleListeners:[
          [
            window.document.body.querySelector("header.header .upper>b:last-child i"),
            window.document.body.querySelector("header.header > .nav-menu"),
            ["click"]
          ]
        ],
        uncorrectTables:[
          window.document.querySelector("header.header .upper b:first-child a").innerHTML.split("/").pop()
        ],
        saveRecordURL: "/crm/functions/runNavFuncButton/"
      },
      page = new Page(options),
      table = new Table({
        tablename: window.document.querySelector("header.header .upper b:first-child a").innerHTML.split("/").pop(),
        countOfRecordsForRequest: 20,
        number: 0,
        where: {},
        getTableContentURL: "/crm/functions/getTableContent",
        saveRecordURL: "/crm/functions/runNavFuncButton/"
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
      document.getElementById(table.tablename).tBodies.item(0).addEventListener("scroll", table.onScroll);
      page.generateCreateRow(table.tablename, 0, "afterbegin")
    });
    page.setStylesForTables();
    document.querySelectorAll("table#"+table.tablename+" thead tr:first-child th input").forEach(field => field.addEventListener("change", table.search));
  });
  document.addEventListener("touch", unsetChecked, true);
  document.addEventListener("mouseup", unsetChecked, true);
}

function unsetChecked(){
  window.document.body.querySelector("header.header > .nav-menu").classList.remove("checked");
}
