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

  },
  // ===========================================================================
  removeClass = function( el , styleClass ){
        _is.isElement(el, function( element ){
            _is.isString(styleClass,function( sc ){
                element.classList.remove( sc );
            })
        })
  },
  // ===========================================================================
  hasClass = function( el , styleClass ){
    return _is.isElement(el,function(element){
      return _is.isString(styleClass,function( sc ){
          return element.classList.contains(sc);
      })
    })
  },
  // ===========================================================================
  attr = function( el , attribute , value ){
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
  },
  // ===========================================================================
  css = function(){
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
  },
  // ===========================================================================
  html = function( el , html ){
      _is.isElement(el,function(element){
          element.innerHTML = html;
      })

  },
  // ===========================================================================
  text = function( el  , text ){
    _is.isElement(el,function(element){
        element.innerText = text;
    })
  },
  // ===========================================================================
  on = function( el,  eventName , func ){
    _is.isElement( el , function( element ){

      if( _is.isString( eventName ) && _is.isFunction( func ) ){
          element.addEventListener( eventName , function( e ){
              func.bind(this)( e )
          }.bind(this) , false );
      }
    }.bind(this))
  },
  // ===========================================================================
  trigger = function( el, eventName ){
    _is.isElement( el , function( element ){
        _is.isString( eventName , function( name ){
             el.dispatchEvent(new Event('click'));
        } )
    })
  },
  // ===========================================================================
  value = function( el , val ){
    return _is.isElement( el , function( element ){
        if( !_is.isNull( val ) && !_is.isUndefined( val ) ){
           return el.value = val;
        }else if( _is.isFunction( val ) ){
           return val( el.value , val  )
        }else{
          return el.value;
        }
    })
  },
  width  = function( el ){
    return _is.isElement( el , function( element ){
        return element.offsetWidth;
    } )
  },
  height = function( el ){
    return _is.isElement( el, function( element ){
      return element.offsetHeight;
    })
  },
  // ===========================================================================
  // Main Object
  element = function( elem ){
    this.elem = elem;
  },
  // ===========================================================================
  proto = element.prototype;
  // ===========================================================================
  proto.addClass = function( styleClass ){
      if( _is.isElement( this.elem)){
          addClass( this.elem , styleClass )
      }
      if( _is.isArray( this.elem) ){
        this.elem.forEach( function( elem ){
          addClass( elem , styleClass )
        })
      }

  }
  // ===========================================================================
  proto.removeClass = function( styleClass ){
      if( _is.isElement( this.elem ) ){
          removeClass( this.elem , styleClass )
      }
      if( _is.isArray( this.elem) ){
        this.elem.forEach( function( elem ){
            removeClass( elem , styleClass )
        });
      }

  }
  // ===========================================================================
  proto.hasClass = function( styleClass ){
      if( _is.isElement( this.elem ) ){
        return hasClass( this.elem ,styleClass  )
      }
      if( _is.isArray( this.elem ) ){
        this.elem.forEach(function( elem ){
          hasClass( elem ,styleClass  )
        });
        return null;
      }

  }
  // ===========================================================================
  proto.html = function( _html ){
      if( _is.isElement( this.elem) ){
        html( this.elem , _html );
      }

      if( _is.isArray( this.elem ) ){
        this.elem.forEach(function( elem ){
           html( elem , _html)
        });
      }

  }
  // ===========================================================================
  proto.text = function( _text ){
      if( _is.isElement( this.elem) ){
        text( this.elem , _text );
      }
      if( _is.isArray( this.elem ) ){
        this.elem.forEach(function(elem){
          text( elem , _text);
        })
      }
  }
  // ===========================================================================
  proto.on = function( eventName , func ){
      if( _is.isElement( this.elem) ){
          on.bind(this)( this.elem , eventName , func );
      }
      if( _is.isArray( this.elem) ){
        this.elem.forEach(function( elem ){
            on.bind(this)( elem , eventName , func );
        }.bind(this))
      }

  }
  // ===========================================================================
  proto.trigger = function( eventName ){
      if( _is.isElement( this.elem ) ){
          trigger( this.elem , eventName )
      }

      if( _is.isArray( this.elem ) ){
        this.elem.forEach(function( elem ){
           trigger( elem , eventName )
        });
      }

  }
  // ===========================================================================
  proto.attr = function( attribute , value ){

      if( _is.isString( attribute ) ){
          if( _is.isArray( this.elem ) ){
              this.elem.forEach( function( elem ){
                  attr( elem , attribute , value );
              } );
              return null;
          }else{
            return attr( this.elem , attribute , value );
          }
      }

      if( _is.isObject( attribute ) ){
          var keyAttr = Object.keys( attribute );
          for( var i = 0; i < keyAttr.length ; i++ ){
            if( _is.isArray( this.elem ) ){
                this.elem.forEach( function( elem ){
                    attr( elem , keyAttr[i] , attribute[keyAttr[i]] );
                } );
            }else{
                attr( this.elem , keyAttr[i] , attribute[keyAttr[i]] );
            }
          }
          return null;
      }

  }
  proto.height = function(){
    if( _is.isElement( this.elem ) ){
        return height( this.elem );
    }
    return null;
  }
  proto.width = function(){
    if( _is.isElement( this.elem ) ){
      return width( this.elem );
    }
    return null;
  }
  // ===========================================================================
  proto.value = function( _value ){

    if( _is.isElement( this.elem ) ){
      return value( this.elem , _value );
    }

    if( _is.isArray( this.elem ) && _is.isString( _value ) ){
      this.elem.forEach(function( elem ){
          value( elem , _value );
      });
      return null;
    }

  }
  // ===========================================================================
  return function(  elem ){
        // =====================================================================
        if( _is.isString( elem )  ){
              try{
                var querySelectorAll = document.querySelectorAll( elem );
                if( querySelectorAll.length === 1 ){
                  return new element( querySelectorAll[0] );
                }else{
                  return new element( Array.from(querySelectorAll) );
                }
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
