(function(factory) {
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global;
  if (typeof define === 'function' && define.amd) {
    define(['ppIs', 'ppEvents' , 'exports'], function(ppIs,ppEvents,exports) {
      root.ppElement = factory(root, exports, ppIs , ppEvents );
    });
  } else if (typeof exports !== 'undefined') {
    var ppEvents = {}, ppIs = {};
    try { ppEvents = require('pp-events'); } catch (e) {}
    try { ppIs = require('pp-is'); } catch (e) {}
    factory(root, exports, ppIs , ppEvents );

  } else {
    root.ppElement = factory(root, {},  root.ppIs , root.ppEvents );
  }

})(function( root , exports , _is , _events) {

  var addClass = function( el , styleClass ){
        el.classList.add(styleClass);
  }

  var removeClass = function( el , styleClass ){
        el.classList.remove(styleClass);
  }

  var hasClass = function( el , styleClass ){
       return el.classList.contains(styleClass);
  }
  var attr = function( el , attribute , value ){
      /*
      var form = $('form')
      form.attr('action')             //=> read value
      form.attr('action', '/create')  //=> set value
      form.attr('action', null)       //=> remove attribute

      // multiple attributes:
      form.attr({
      action: '/create',
      method: 'post'
      })
      */
      //////////////////////////////////////////////77
  }
  var css = function(){
    /*
    var elem = $('h1')
    elem.css('background-color')          // read property
    elem.css('background-color', '#369')  // set property
    elem.css('background-color', '')      // remove property

    // set multiple properties:
    elem.css({ backgroundColor: '#8EE', fontSize: 28 })

    // read multiple properties:
    elem.css(['backgroundColor', 'fontSize'])['fontSize']
    */
  }
  var html = function( el , html ){
      el.innerHTML = html;
  }

  var element = function( elem ){
      this.elem = elem;
      this.addClass = function( styleClass){
          addClass( this.elem , styleClass )
      }
      this.hasClass = function( styleClass){
        return hasClass( this.elem ,styleClass  )
      }

      this.html = function( _html ){
        html( this.elem , _html );
      }

  }


  return function(  elem ){
      return new element( elem );
  }


})
