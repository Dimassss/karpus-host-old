/**
@class Output
@desc is needed to add/write html to the document
@params {Object} editors, {Array} outputs
  @param editors {Object<String: Function>} => {editor_name: editor_func} object whiech has keys as name of editor function and value as a funciton
    @function editor_func get data and convert it to html and than paste it in needed location in document
      @param s => css selector to the output
      @param d => data, which is used to generate html
      @return any data
  @param outputs {Array<Array<String, String, String>>} => is array of outputs which are [short_name, css_selector, editor_name]
    @value short_name {String} => short name of output. Is used to get editor function
    @value css_selector {String} => css selector of outputwhere you need to paste/write html. Will be passed to the parameters of editor function
    @value editor_name {String} => is used to generate html content from output from data and paste it into css_selector

@method insertData
  @param short_name {String} => short name of output
  @param data => data, which is used to generate html and paste/write it by the editor function
  @do generate html by editor function with data and write/paste it to the document

@method addEditors
  @param editors {Object<String: Function} => object where key is name of editor function and value is function
  @do add new editors functions to the Output object

@method deleteEditors
  @param editors {Array<String>} => array of names of editors to delete
  @do delete editors from Output object

@method getEditors
  @return {Object<String: Function>}
  @do return object where key is name of editor function and value is a function

@method addOutputs
  @param outputs {Array<Array<String, String, String>} => new outputs
  @do add new outputs to the Output object tree of outputs

@method deleteOutputs
  @param outputs {Array<String>} => array of short names of outputs to delete
  @do delete outputs from Output class object

@method getOutputs
  @return {Object<Object..., String, String, String>}
  @do return tree of outputs, where branches are letters of short name

@method q
  @param s {String} => css selector
  @return document.querySelector(s)'s return

@method qa
  @param s {String} => css selector
  @return document.querySelectorAll(s)'s return
*/
class Output{
  constructor(editors, outputs){
    this.editors = editors;
    this.outputs = {};
    this.addOutputs(outputs);
  }

  insertData(short_name, data){
    var _this = this;
    var output = _this.outputs;

    for(var i = 0; i < short_name.length; i++){
      output = output[short_name[i]];
    }

    return _this.editors[output.editor_name](output.css_selector, data);
  }

  addEditors(editors){
    var _this = this;
    this.editors = {..._this.editors, ...editors};
  }

  deleteEditors(editors){
    var _this = this;
    editors.forEach(editor => delete _this.editors[editor]);
  }

  getEditors(){
    var _this = this;
    return Object.assign({}, _this.editors);
  }

  addOutputs(outputs){
    var _this = this;

    //@func generateTree create tree with letters from short_name
    function generateTree(outputs, short_name, css_selector, editor_name){
      if(!outputs[short_name[0]]) outputs[short_name[0]] = {};
      if(short_name.length <= 1){
        outputs[short_name].css_selector = css_selector;
        outputs[short_name].editor_name = editor_name;
      } else {
        outputs[short_name[0]] = generateTree(outputs[short_name[0]], short_name.slice(1), css_selector, editor_name);
      }
      return outputs;
    }

    for(var i = 0; i < outputs.length; i++){
      if(outputs[i]) _this.outputs = generateTree(_this.outputs, outputs[i][0], outputs[i][1], outputs[i][2]);
    }
  }

  deleteOutputs(outputs){
    var _this = this;
    function deleteFromTree(outputs, short_name){
      if(Object.keys(outputs[short_name[0]]).filter(k => k.length == 1 && k != short_name[1])[0]){
        outputs[short_name[0]] = deleteFromTree(outputs[short_name[0]], short_name.slice(1));
      }else delete outputs[short_name[0]];
      return outputs;
    }

    for(var i = 0; i < outputs.length; i++) _this.outputs = deleteFromTree(_this.outputs, outputs[i]);
  }

  getOutputs(){
    var _this = this;
    return JSON.parse(JSON.stringify(_this.outputs));
  }

  q(s){
    return document.querySelector(s);
  }

  qa(s){
    return document.querySelectorAll(s);
  }
}
