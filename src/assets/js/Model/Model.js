/**
@class Model, parent
@params
  @param {Object} k => pair of columnName of primaryKey and its value for current object. Example: k = {id: 5}
  @param {String} table => table name of current object in db. Example: table = "customers"
  @param {Object} v => HashMap of column names in object and sql string to create this column. Example: v = {name: "	`name` VARCHAR(80) NOT NULL"}
                  v = {columnName: sqlString}
@methods
  @method save
    @do update current object to db by its primary key or create new in db
  @method del
    @do delete current object from db

*/
class Model{
  constructor(k, table, v){
    var _this = this;
    _this.constructorData = {k: k, table: table, v: v};

    websql.process(`CREATE TABLE IF NOT EXISTS ${table}(${(function(){
      var columns = ""
      for(var c in v){
        columns += v[c][2] + ",";
      }
      return columns;
    })()} PRIMARY KEY (\`${Object.keys(k)[0]}\`))`);

    if(!k[Object.keys(k)[0]]){
      var record;
      websql.process({
                      "sql": `INSERT INTO ${table} ${(function(){
                        var cols = "(", vals = "(";
                        for(var c in v){
                          cols += _this[c] + ",";
                          vals += "?,";
                        }

                        cols = cols.slice(0, -1) + ")", vals = vals.slice(0, -1) + ")";
                        return `${cols} VALUES ${vals}`;
                      })()}`,
                      "data": (function(){
                        var r = [];
                        for(var c in v){
                          r[r.length] = _this[c];
                        }
                        return r;
                      })(),
                      "success": (tr, r) => {
                        if(r.rows.length > 1) throw new Error("Model.js have more than 1 selected answer from table");
                        var row = results.rows.item(0);
                        for(var col in row){
                          _this[col] = row[col];
                        }
                      }
                    });
    }

  }

  save(){
    var _this = this, k = _this.constructorData.k, table = _this.constructorData.table, v = _this.constructorData.v;
    if(k[Object.keys(k)[0]]) websql.process({
                      "sql": `INSERT INTO ${table} ${(function(){
                        var cols = "(", vals = "(";
                        for(var c in v){
                          cols += c + ",";
                          vals += "?,";
                        }
                        cols = cols.slice(0, -1) + ")", vals = vals.slice(0, -1) + ")";
                        return `${cols} VALUES ${vals}`;
                      })()}`,
                      "data": (function(){
                        var r = [];
                        for(var c in v){
                          r[r.length] = _this[c];
                        }
                        return r;
                      })(),
                      "success": (tr, r) => {
                        _this[Object.keys(k)[0]] = r.insertedId;
                      }
                    });
    else websql.process({
                      "sql": `UPDATE ${table} SET ${(function(){
                        var vals = "";
                        for(var c in v){
                          if(c != Object.keys(k)[0]) vals += `${c} = ?,`;
                        }
                        return vals.slice(0, -1);
                      })()} WHERE ${Object.keys(k)[0]} = ${k[Object.keys(k)[0]]}`,
                      "data": (function(){
                        var r = [];
                        for(var c in v){
                          r[r.length] = _this[c];
                        }
                        return r;
                      })()
                    });
  }

  del(){
    var _this = this, k = _this.constructorData.k, table = _this.constructorData.table, v = _this.constructorData.v;
    if(k[Object.keys(k)[0]]) websql.process({
      "sql": `DELETE FROM ${table} WHERE ${Object.keys(k)[0]} = ${k[Object.keys(k)[0]]}`,
      "data": [k[Object.keys(k)[0]]],
      "success" () => delete _this;
    });
  }
}
