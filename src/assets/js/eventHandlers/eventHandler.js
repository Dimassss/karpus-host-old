/**
@class EventHandler
@desc give ability to to create new events to page and watch for mutations on page

@params no parameters is needed

@method watch
  @params
    @param target {String} => css selector
    @param config {Object} => {childList, attributes, characterData, subtree, attributeOldValue, characterDataOldValue, attributeFilter}
      @value {Boolean} childList => Observes changes to the children of target
      @value {Boolean} attributes => Observes changes to the attributes of target
      @value {Boolean} characterData => Observes changes to the data of target
      @value {Boolean} subtree => Tells the observer to also record changes in the subtree of target
      @value {Boolean} attributeOldValue => Tells the observer to provide the old value of the attribute (available in the MutationRecord.oldValue property)
      @value {Boolean} characterDataOldValue => Tells the observer to provide the old value of the character data (available in the MutationRecord.oldValue property)
      @value {Array<String>} attributeFilter => Tells the observer to only observe the specified attributes
    @param f {Function} => If event happend %f func will be ran
  @return {MutationObserver}
  @do watch for needed mutations in element and if they are heppened run function given to the method

@method addWatch
  @praram observer {MutationObserver} => mutation observer which was returned from watch method
  @param target {String} => css selector
  @param config {Object} => {childList, attributes, characterData, subtree, attributeOldValue, characterDataOldValue, attributeFilter}
    @value {Boolean} childList => Observes changes to the children of target
    @value {Boolean} attributes => Observes changes to the attributes of target
    @value {Boolean} characterData => Observes changes to the data of target
    @value {Boolean} subtree => Tells the observer to also record changes in the subtree of target
    @value {Boolean} attributeOldValue => Tells the observer to provide the old value of the attribute (available in the MutationRecord.oldValue property)
    @value {Boolean} characterDataOldValue => Tells the observer to provide the old value of the character data (available in the MutationRecord.oldValue property)
    @value {Array<String>} attributeFilter => Tells the observer to only observe the specified attributes
  @return {MutationObserver}
  @do the same things as the watch method. The different is that observer should be given to the method

@method bind
  @params
    @param target {String} => css selector. For which element must be created event
    @param on {String} => event name. On which event function must be ran
    @param f {Function} => event function. What to do if event happened
    @param data {*} => Optional. Parameters to the @f function which should be passed to when event occur
  @do add event to the elemnt

@method q
  @param s {String} => css selector
  @return document.querySelector(s)'s return

@method qa
  @param s {String} => css selector
  @return document.querySelectorAll(s)'s return
*/
class EventHandler{
  constructor(){
    console.log("EventHandler Created");
  }

  watch(target, config, f){
    var _this = this;
    var observer = new MutationObserver(f);
    observer.observe(_this.q(target), config);
    return observer;
  }

  addWatch(observer, target, config){
    var _this = this;
    observer.observe(_this.q(target), config)
    return observer;
  }

  bind(target, on, f, data){
    var _this = this;
    _this.q(target).addEventListener(on,
                                    e => {
                                      e.stopPropagation();
                                      f(e, data);
                                    },
                                    false);
  }

  q(s){
    return document.querySelector(s);
  }

  qa(s){
    return document.querySelectorAll(s);
  }
}
