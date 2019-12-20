class Page{
  constructor(options){
    for(var key in options){
      this[key] = options[key];
    }

    this.tfootFuncs = [];
  }

  inserNewData(options){
    for(var key in options){
      this[key] = options[key];
    }
  }

  setListenersToggle(){
    if(!this.toggleListeners) return false;
    var toggleListeners = this.toggleListeners,
        _this = this;

    _this.listenersFunctions = {};

    for(var k in toggleListeners){
      var toggleListener = toggleListeners[k],
          eventNames = toggleListeners[k][2];
      for(var eventKey in eventNames){
        let funcKey = "listenerKey-"+Math.random();
        _this.listenersFunctions[funcKey] = function(){
          if(toggleListeners[k][1].classList.contains("checked")){
            toggleListeners[k][1].classList.remove("checked");
          }else{
            toggleListeners[k][1].classList.add("checked");
          }
        }

        toggleListeners[k][0].addEventListener(eventNames[eventKey], _this.listenersFunctions[funcKey], false);
      }
    }
  }

  generateTableContent(tableName, tableJSON, isNewTable = false, callback = function(){}){
    /*
      tableJSON = {
        searchFields:[
          {
            name:"",
            type:"",
            val: ""
          }
        ],
        colsWidth: [1,2,3,4,5],
        thead: [
          [
            {
              val:"val1",
              colspan: 1,
              rowspan: 1
            }
          ]
        ],
        tbodies: {
            0:{
              classes: "className",
              number: 0,
              tbody: [
                [
                  {
                    val:"val1",
                    colspan: 1,
                    rowspan: 1
                  },
                  {
                    val:"val1",
                    colspan: 1,
                    rowspan: 1
                  }
                ]
              ]
            }
        },
        tfoot: [
          [
            {
              val:"val1",
              colspan: 1,
              rowspan: 1,
              funcName: function(){}
            }
          ]
        ]
        renderType:{
          thead: write,
          tbodies: [add,write],
          tfoot: write
        }
      }
    */
    var _this = this,
        table = window.document.getElementById(tableName);

    if(isNewTable){
      if(tableJSON.thead) table.insertAdjacentHTML("afterbegin", "<thead>" + createSearchFields(tableJSON.searchFields) + createINNER(tableJSON.thead, "thead", "th") + "</thead>");
      if(tableJSON.tbodies)
        tableJSON.tbodies.forEach((tbody,i) => {
          table.insertAdjacentHTML("beforeend", "<tbody class='" + tbody.classes + "'>" + createINNER(tbody, "tbody", "td") + "</tbody>");
        });
      if(tableJSON.tfoot) table.insertAdjacentHTML("beforeend", "<tfoot>" + createINNER(tableJSON.tfoot, "tfoot", "td") + "</tfoot>");
    }else{
      if(tableJSON.thead)
        if(tableJSON.renderType.thead == "write") table.tHead.innerHTML = createINNER(tableJSON.thead, "thead", "th");
        else table.tHead.insertAdjacentHTML("beforeend", createINNER(tableJSON.thead, "thead", "th"));
      if(tableJSON.tbodies) tableJSON.tbodies.forEach((tbody, i) => {
        if(tableJSON.renderType.tbodies[i] == "write") table.tBodies[tbody.number].innerHTML = createINNER(tbody, "tbody", "td");
        else table.tBodies[tbody.number].insertAdjacentHTML("beforeend", createINNER(tbody, "tbody", "td"));
      });
      if(tableJSON.tfoot)
        if(tableJSON.renderType == "write") table.tFoot.innerHTML = createINNER(tableJSON.tfoot, "tfoot", "td");
        else table.tFoot.insertAdjacentHTML("beforeend", createINNER(tableJSON.tfoot, "tfoot", "td"));
    }

    this.toggleListenersOfTable(tableName);

    table.tHead.querySelectorAll("tr:not(:first-child)").forEach(el => {
      function toggleSelectTrHead(){
        _this.allSelected = !_this.allSelected;
        this.parentNode.parentNode.querySelectorAll("input[name^='recordOfId-']").forEach(inp => inp.checked = _this.allSelected);
        this.parentNode.parentNode.querySelectorAll("tbody tr").forEach(tr => {
          if(!tr.classList.contains("checkedRecord") && _this.allSelected) tr.classList.add("checkedRecord");
          else if(!_this.allSelected) tr.classList.remove("checkedRecord")
        });
      }

      if(!el.hasAttribute("data-hasListener")){
        el.addEventListener("touch", toggleSelectTrHead, true);
        el.addEventListener("click", toggleSelectTrHead, true);

        var att = document.createAttribute("data-hasListener");
        att.value = "0";
        el.setAttributeNode(att);
      }
    });

    _this.tableWidth = tableJSON.colsWidth.reduce((partial_sum, a) => partial_sum + a + 2);

    callback();

    function escapeHTML(str) {
      return (str)?(new String(str)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):"";
    }

    function createSearchFields(searchFieldsJSON){
      var _html = "<tr>";

      searchFieldsJSON.forEach(field => {
        _html += "<th><span>";
        _html += "<input type='" + field.type + "' name='" + field.name + "' placeholder='" + field.name + "' value='" + field.val + "'/>";
        _html += "</span></th>";
      });

      return _html + "</tr>";
    }

    function createINNER(partJSON, partTag, partCellTag){
      var spanOfRows = {},
          _html = "";

      if(partJSON.tbody) partJSON = partJSON.tbody;
      partJSON.forEach((tr) => {
        _html += "<tr>";

        var curCol = 0;

        if(partTag=="tbody") _html += "<input type='checkbox' id='recordOfId-" + tr[0].val + "' name='recordOfId-" + tr[0].val + "'/>";

        tr.forEach((el, i) => {
          if(i==0 && partTag=="tbody") return false;
          var widthOfCol = 0;
          if(spanOfRows[curCol]){
            spanOfRows[curCol][0]--;
            if(spanOfRows[curCol][0] <= 1) delete spanOfRows[curCol];
            else curCol += spanOfRows[curCol][1];
          }

          if(el.rowspan > 1){
            spanOfRows[curCol] = [el.rowspan, el.colspan];
          }

          if(el.func) _this[partTag + "Funcs"][el.func.name] = el.func;
          _html += "<" + partCellTag + ((el.func)?(" data-func='" + el.func.name + "'"):"") + " colspan='" + el.colspan + "' rowspan='" + el.rowspan + "'>";
          if(partTag=="tbody") _html += "<label for='recordOfId-" + tr[0].val + "-" + el.fieldName + "'>";
          _html += "<span class='coloredScroll' style='width: " + getWidthOfCell(curCol, el.colspan) + "px;'>" + escapeHTML(el.val) + "</span>";
          if(partTag=="tbody") _html += "</label>";
          _html += "</" + partCellTag + ">";
          curCol += el.colspan;
        });

        _html += "</tr>";
      });

      return _html;
    }

    function getWidthOfCell(from, colspan){
      var width = 0;
      for(var i = 0; i < colspan; i++) width += tableJSON.colsWidth[from + i];
      return width;
    }
  }

  toggleListenersOfTable(tableName){
    var table = window.document.getElementById(tableName),
        _this = this;
    table.querySelectorAll("label[for^='recordOfId-']:not([data-haslistener])").forEach(label => {
      label.addEventListener("click", function(){
        this.parentNode.parentNode.classList.toggle("checkedRecord")
      }, true);

      label.addEventListener("dblclick", ondblclick);

      function ondblclick(){
        _this.innerChangedText = this.innerText;
        let td = this.parentNode;
        var id = this.getAttribute('for');
        this.outerHTML = "<textarea style='width:"+this.querySelector("span").style.width+";' class='coloredScroll' id='"+id+"' autofocus='autofocus'>" + this.querySelector("span").innerHTML + "</textarea>";
        setTimeout(td.querySelector("textarea").focus(),1);
        td.querySelector("textarea").addEventListener("blur", function(){
          let innerText = this.value,
              td = this.parentNode;
          if(innerText!==_this.innerChangedText)_this.saveRecord(0/*"save"*/, innerText, id, tableName, _this.positionOfNewRow, _this.saveRecordURL);
          this.outerHTML = "<label for='"+id+"' data-haslistener='0'><span class='coloredScroll' style='width:"+this.style.width+";'>"+innerText+"</span></label>";
          td.querySelector("label").addEventListener("dblclick", ondblclick);
          td.querySelector("label").addEventListener("click", function(){
            this.parentNode.parentNode.classList.toggle("checkedRecord")
          }, true);
        });
      }

      var att = document.createAttribute("data-hasListener");
      att.value = "0";
      label.setAttributeNode(att);
    });
  }

  setStylesForTables(){
    if(this.uncorrectTables){

      var _this = this,
          tables = this.uncorrectTables,
          _css = "<style>";

      for(var k in tables){
        var table = window.document.getElementById(tables[k]),
            columnsCount;

        _css += "#" + tables[k] + " tbody{"
              + "height: calc(100vh - var(--header-height) - "
              + ((document.querySelector("body .cycles-bar")?document.querySelector("body .cycles-bar").offsetHeight:0) + (table.tHead?table.querySelector("thead").offsetHeight:0) + (table.tFoot?table.querySelector("tfoot").offsetHeight:0))
              + "px + 5px);"
              + "width: "
              + table.tableWidth
              +"px;"
              + "} table { width: "
              +  _this.tableWidth
              + "px} section.page { height: calc(100vh - "
              + ((document.querySelector("body header.header")?document.querySelector("body header.header").offsetHeight:0) + (document.querySelector("body .cycles-bar")?document.querySelector("body .cycles-bar").offsetHeight:0))
              +"px); }";
      }
    }

    window.document.head.insertAdjacentHTML("beforeend", _css + "</style>");
  }

  generateCreateRow(tableName, tbodyID, position){
    var table = window.document.getElementById(tableName),
        _this = this;
    var trCreate = table.tBodies[0] && table.tBodies[0].querySelector("tr")
                  ?table.tBodies[0].querySelector("tr:first-child").cloneNode(true)
                  :table.tHead.querySelector("tr:last-child").cloneNode(true);

    if(!(table.tBodies[0] && table.tBodies[0].querySelector("tr"))){
      trCreate.querySelectorAll("th").forEach(td => {
        td.outerHTML = "<td"+td.outerHTML.split(">")[0].split("th")[1]+"><label for='recordOfId--"+td.innerText+"'>" + td.innerHTML + "</label></tr>";
        td.querySelector("span").innerHTML = "";
      });
    }

    trCreate.querySelectorAll("td span").forEach(span => span.innerHTML = "");
    trCreate.querySelectorAll("td label").forEach(label => label.setAttribute("for", "recordOfId--"+label.getAttribute("for").split("-")[2]));
    trCreate.querySelectorAll("td label").forEach(label => label.removeAttribute("data-haslistener"));
    if(table.tBodies[0]) table.tBodies[0].insertAdjacentHTML(position, trCreate.outerHTML);
    _this.positionOfNewRow = position;
    _this.toggleListenersOfTable(tableName);
  }

  setListenersForScrollButtons(){
    if(this.scrollButtons){
      var _this = this;
      //[buttons_bar, left, right]
      _this.scrollButtons[1].addEventListener("click", function(e){
        e.preventDefault();
        _this.scrollButtons[0].scrollLeft -= parseFloat(window.getComputedStyle(_this.scrollButtons[0].firstElementChild).minWidth)*Math.floor(_this.scrollButtons[0].offsetWidth/parseFloat(window.getComputedStyle(_this.scrollButtons[0].firstElementChild).minWidth)-1);
      });
      _this.scrollButtons[2].addEventListener("click", function(e){
        e.preventDefault();
        _this.scrollButtons[0].scrollLeft += parseFloat(window.getComputedStyle(_this.scrollButtons[0].firstElementChild).minWidth)*Math.floor(_this.scrollButtons[0].offsetWidth/parseFloat(window.getComputedStyle(_this.scrollButtons[0].firstElementChild).minWidth)-1);
      });
    }
  }
}
