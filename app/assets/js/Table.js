class Table{
  constructor(options){
    for(var key in options){
      this[key] = options[key];
    }

    this.allowOnScrollFunction = true;

    var _this = this;

    document.querySelectorAll("header.header .nav-menu b").forEach(b => {
      b.addEventListener("click", function(){
        _this.runNavFuncButton.call(_this.page, this.getAttribute("data-func"), "", "-0-", _this.tablename, "afterbegin", _this.saveRecordURL);
      })
    });

    this.onScroll = function(){
      if(!_this.allowOnScrollFunction) return false;
      var scrollElement = document.getElementById(_this.tablename).tBodies.item(0);
    	if(this.number === -1){
    		scrollElement.removeEventListener("scroll", this.onScroll);
    		return false;
    	}
    	if((scrollElement.scrollHeight-scrollElement.scrollTop-524)<=200){
    		_this.allowOnScrollFunction = false;
    		_this.getTableContent(["tbody"], function(data){
          if(data == -1){
            _this.number = -1;
            return false;
          }
          var r = JSON.parse(data);
          r.renderType = {tbodies:["add"]};
          _this.page.generateTableContent(_this.tablename, r, false, function(){_this.allowOnScrollFunction = true;});
          _this.page.setStylesForTables();
        });
    	}
    }
    this.search = function(){
      _this.where[this.name] = this.value;
      _this.number = 0;
      _this.getTableContent(["tbody"], function(data){
        document.getElementById(_this.tablename).tBodies.item(0).innerHTML = "";
        document.querySelectorAll("section.page table#"+_this.tablename+" input[name^='recordOfId']").forEach(el => el.outerHTML = "");
        var r = JSON.parse(data);
        r.renderType = {tbodies:["add"]};
        _this.page.generateTableContent(_this.tablename, r, false);
        _this.page.setStylesForTables();
      });
    }
  }

  inserNewData(options){
    for(var key in options){
      this[key] = options[key];
    }
  }

  runNavFuncButton(action, val, field, tableName, position = "afterbegin", url){
    var _this = this,
        func = function(){},
        json = [],
        btns = [["edit", "create"], ["delete",]];

    switch(btns[action][field.split("-")[1]==""?1:0]){
      case 'create':
        json[0] = {id: -1};
        json[0]["fields"] = {};
        json[0]["fields"][field.split("-")[2]] = val;
        func = function(data){
          data = JSON.parse(data);
          window.document
              .querySelectorAll("#"+tableName+" tbody tr td label[for^='recordOfId--']")
              .forEach(l => l.setAttribute("for", "recordOfId-"+data[0]+"-"+l.getAttribute("for").split("-")[2]));
          _this.generateCreateRow(tableName, 0, position);
        };
        break;
      case 'edit':
        json[0] = {id: +field.split("-")[1]};
        json[0]["fields"] = {};
        json[0]["fields"][field.split("-")[2]] = val;
        break;
      case 'delete':
        json = Array.from(
                            document.querySelectorAll("table#"+tableName+" tr.checkedRecord td:first-child label"),
                            inp => inp = {id: +inp.getAttribute("for").split("-")[1]}
                          );
        func = function(){
          document.querySelectorAll("table#"+tableName+" tr.checkedRecord").forEach(tr => tr.outerHTML = "");
        }
        break;
    }
    this.ajax("post",
              url+tableName+"/"+btns[action][field.split("-")[1]==""?1:0],
              {json: json},
              func
            );
  }

  getTableContent(neededParts, callback){
    var data = {};
    data.count = this.countOfRecordsForRequest;
    data.table = this.tablename;
    data.number = this.number++;
    data.where = this.where;
    data.neededParts = neededParts;
    if(this.cycleID) data.cycleID = this.cycleID;
    this.ajax("GET", this.getTableContentURL, data, callback);
  }

  ajax(method, url, data, doneFunc){
    var requeststr = "?";

    for(var k in data){
      requeststr += k + "=" + ((typeof data[k] === 'object')?JSON.stringify(data[k]):data[k]) + "&";
    }

    if(method.toUpperCase() == "POST") fetch(url, {
      method: method.toUpperCase(),
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requeststr.substring(1, requeststr.length-1)
    }).then(function(response){
      response.text().then(function(val){doneFunc(val)});
    });
    else fetch(url+requeststr, {
      method: method.toUpperCase(),
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      response.text().then(function(val){doneFunc(val)});
    });
  }
}
