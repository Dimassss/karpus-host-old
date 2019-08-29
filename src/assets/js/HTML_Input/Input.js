/**
@class Input
@desc this class is need to get data from page
@params {Object} takes, {Object} validators, {Array} inputs
  @param {Dictionary<Function>} takes => {take_name: take_func}
    @function take_func
      @param s => css selector to the element
      @param v => validate content
      @param r => convert html to escaped string
      @return any data
  @param {Dictionary<Function>} validators => {validator_name: validator}
    @function validator
      @param s => string which will be validated
      @return boolean
  @param {Array<Array<String, String, String, String>>} inputs => [[short_name, css_selector, validator_name, take_name]]
    @value short_name {String} => short name of element. Is used to get value from the element by this class
    @value css_selector {String} => css selector of element from which you need to get value. Will be passed to the parameters of take function
    @value validotor {String} => validator name from @param validators, which will be passed to the parameters of the take function
    @value take_name {String} => is used to parse html content from element from css_selector and return data


@method takeData
  @param short_name => short name of element
  @return data from @take_func function
  @do parse content of element by @take_func and than validate it. Than return parsed data from take_func

@method addTakes
  @param takes {Object} => has key-value pairs of take functions
  @do add new takes functions to the Input object

@method deleteTakes
  @param takes_names {Array<String>} => is array of take's functions names
  @do remove takes functions by its name from Input object

@method getTakes
  @return {Object<String:Funtions>} object with key as name of take function and value as function
  @do return Array of takes functions by its name from Input object

@method addValidators
  @param validators {Object} => object with key as name of validator function and value as function
  @do add new validators functions to the Input object

@method deleteValidators
  @param validators_names {Array<String>} => is array of validator's functions names
  @do remove validators functions by its name from Input object

@method getValidators
  @return {Object<String:Funtions>} object with key as name of validator function and value as function
  @do return Array of validators functions by its name from Input object

@method addInputs
  @param {Array<Array<String, String, String, String>>} inputs => [[short_name, css_selector, validator_name, take_name]]
  @do add new elements to the tree of elements in Input object

@method deleteInputs
  @param inputs {Array<String>} => is array of inputs short names
  @do remove inputs elements by its short name from Input object

@method getInputs
  @return {Object<Object..., String, String, String>} tree of inputs elements where branches are short names of that fields

@method q
  @param s {String} => css selector
  @return document.querySelector(s)'s return

@method qa
  @param s {String} => css selector
  @return document.querySelectorAll(s)'s return
*/
class Input{
  constructor(takes, validators, inputs){
    var _this = this;
    this.takes = takes;
    this.validators = validators;
    this.inputs = {};
    this.addInputs(inputs);
  }

  takeData(short_name){
    var _this = this;
    var input = _this.inputs;

    for(var i = 0; i < short_name.length; i++){
      input = input[short_name[i]];
    }

    return _this.takes[input.take_name](input.css_selector, _this.validators[input.validator_name], str => String(str).replace(/&/g, '&amp;')
                                                                                                      .replace(/</g, '&lt;')
                                                                                                      .replace(/>/g, '&gt;')
                                                                                                      .replace(/"/g, '&quot;')
                                                                                                      .replace(/'/g, '&apos;'));
  }

  //methods for @param takes
  addTakes(takes){
    var _this = this;
    this.takes = {..._this.takes, ...takes};
  }

  deleteTakes(takes_names){
    var _this = this;
    takes_names.forEach(take_name => delete _this.takes[take_name]);
  }

  getTakes(){
    var _this = this;
    return Object.assign({}, _this.takes);
  }

  //methods for @param validators
  addValidators(validators){
    var _this = this;
    this.validators = {..._this.validators, ...validators};
  }

  deleteValidators(validators_names){
    var _this = this;
    validators_names.forEach(validator_name => delete _this.validators[validator_name]);
  }

  getValidators(){
    var _this = this;
    return Object.assign({}, _this.validators);
  }

  addInputs(inputs){
    var _this = this;

    //@func generateTree create tree with letters from short_name
    function generateTree(inputs, short_name, css_selector, validator_name, take_name){
      if(!inputs[short_name[0]]) inputs[short_name[0]] = {};
      if(short_name.length <= 1){
        inputs[short_name].css_selector = css_selector;
        inputs[short_name].validator_name = validator_name;
        inputs[short_name].take_name = take_name;
      } else {
        inputs[short_name[0]] = generateTree(inputs[short_name[0]], short_name.slice(1), css_selector, validator_name, take_name);
      }
      return inputs;
    }

    for(var i = 0; i < inputs.length; i++){
      _this.inputs = generateTree(_this.inputs, inputs[i][0], inputs[i][1], inputs[i][2], inputs[i][3]);
    }
  }

  deleteInputs(inputs){
    var _this = this;
    function deleteFromTree(inputs, short_name){
      if(Object.keys(inputs[short_name[0]]).filter(k => k.length == 1 && k != short_name[1])[0]){
        inputs[short_name[0]] = deleteFromTree(inputs[short_name[0]], short_name.slice(1));
      }else delete inputs[short_name[0]];
      return inputs;
    }

    for(var i = 0; i < inputs.length; i++) _this.inputs = deleteFromTree(_this.inputs, inputs[i]);
  }

  getInputs(){
    var _this = this;
    return JSON.parse(JSON.stringify(_this.inputs));
  }

  q(s){
    return document.querySelector(s);
  }

  qa(s){
    return document.querySelectorAll(s);
  }
}
