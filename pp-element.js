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

})(function( root , exports , _is , _events ) {

  // ===========================================================================
  var addClass = function( el , styleClass ){
      _is.isElement(el,function(element){
          element.classList.add(styleClass);
      })

  }
  // ===========================================================================
  var removeClass = function( el , styleClass ){
        _is.isElement(el, function( element ){
            _is.isString(styleClass,function( sc ){
                element.classList.remove( sc );
            })
        })
  }
  // ===========================================================================
  var hasClass = function( el , styleClass ){
    return _is.isElement(el,function(element){
      return _is.isString(styleClass,function( sc ){
          return element.classList.contains(sc);
      })
    })
  }
  // ===========================================================================
  var attr = function( el , attribute , value ){
      return _is.isElement( el , function( element ){
            return _is.isString( attribute , function( attr ){
                  if( _is.isUndefined( value ) ){
                    return element.getAttribute( attr );
                  }else if( _is.isNull( value ) ){
                    return element.removeAttribute( attr );
                  }else{
                    return element.setAttribute( attr , value);
                  }
            } );
      });
      
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
  // ===========================================================================
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
  // ===========================================================================
  var html = function( el , html ){
      _is.isElement(el,function(element){
          element.innerHTML = html;
      })

  }
  // ===========================================================================
  var text = function( el  , text ){
    _is.isElement(el,function(element){
        element.innerText = text;
    })
  }
  // ===========================================================================
  var on = function( el,  eventName , func ){
    _is.isElement( el , function( element ){

      if( _is.isString( eventName ) && _is.isFunction( func ) ){
          element.addEventListener( eventName , function( e ){
              func.bind(this)( e )
          }.bind(this) , false );
      }
    }.bind(this))
  }
  // ===========================================================================
  var trigger = function( el, eventName ){
    _is.isElement( el , function( element ){
        _is.isString( eventName , function( name ){
             el.dispatchEvent(new Event('click'));
        } )
    })
  }
  // ===========================================================================
  // Main Object
  var element = function( elem ){
    this.elem = elem;
  }
  // ===========================================================================
  var proto = element.prototype;
  // ===========================================================================
  proto.addClass = function( styleClass ){
      addClass( this.elem , styleClass )
  }
  // ===========================================================================
  proto.removeClass = function( styleClass ){
      removeClass( this.elem , styleClass )
  }
  // ===========================================================================
  proto.hasClass = function( styleClass ){
      return hasClass( this.elem ,styleClass  )
  }
  // ===========================================================================
  proto.html = function( _html ){
      html( this.elem , _html );
  }
  // ===========================================================================
  proto.text = function( _text ){
      text( this.elem , _text );
  }
  // ===========================================================================
  proto.on = function( eventName , func ){
      on.bind(this)( this.elem , eventName , func );
  }
  // ===========================================================================
  proto.trigger = function( eventName ){
      trigger( this.elem , eventName )
  }
  // ===========================================================================
  proto.attr = function( attribute , value ){

      if( _is.isString( attribute ) ){
          return attr( this.elem , attribute , value );
      }

  }
  proto.height = function(){}

  proto.width = function(){}

  proto.val = function(){
    /*
    val
    val()  ⇒ string
    val(value)  ⇒ self
    val(function(index, oldValue){ ... })  ⇒ self
    */
  }

  // ===========================================================================
  return function(  elem ){
        // =====================================================================
        if( _is.isString( elem )  ){
              try{
                return new element( document.queryselector( elem ) );
              }catch(e){
                return new element( null );
              }
        }
        // =====================================================================
        if( _is.isElement( elem )  ){
            return new element( elem );
        }
        // =====================================================================
        return new element( null );
        // =====================================================================
  }
  // ===========================================================================
})
