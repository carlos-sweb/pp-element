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
  // Creamos referencia para obtener un mayor minify
  var isE = _is.isElement,
  isS = _is.isString,
  isA = _is.isArray,
  isF = _is.isFunction,
  isU = _is.isUndefined;
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} styleClass - Nombre de la clase para agregar
   **/
  var addClass = function( el , styleClass ){
      isE(el,function(element){
          isS( styleClass , function( sc ){
              element.classList.add(sc);
          })
          // Se Podria extender esta clase
          // para recibir un array de clases
      })
  },
  // ===========================================================================
  /**
  *@param {NodeElement} el - Elemento DOM para ser afectado
  *@param {String} styleClass - Nombre de la clase css ha remover
  */
  removeClass = function( el , styleClass ){
        isE(el, function( element ){
            isS(styleClass,function( sc ){
                element.classList.remove( sc );
            })
        })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} styleClass - Nombre de lca clase css para verificar
   */
  hasClass = function( el , styleClass ){
    return isE(el,function(element){
      return isS(styleClass,function( sc ){
          return element.classList.contains(sc);
      })
    })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} attribute - Nombre del attributo para manipular
   *@param {String} value - Valor para el attributo
   */
  attr = function( el , attribute , value ){
      return isE( el , function( element ){
            return isS( attribute , function( attr ){
                  if( isU( value ) ){
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
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} html - Codigo html para ser insertado
   *
   **/
  html = function( el , html ){
      isE(el,function(element){
          element.innerHTML = html;
      })

  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} text - texto ha agregar
   **/
  text = function( el  , text ){
    isE(el,function(element){
        element.innerText = text;
    })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} eventName - Nombre del Evento
   *@param {Function} func - Funcion que se ejecutara
   **/
  on = function( el,  eventName , func ){
    isE( el , function( element ){

      if( isS( eventName ) && isF( func ) ){
          element.addEventListener( eventName , function( e ){
              func.bind(this)( e )
          }.bind(this) , false );
      }
    }.bind(this))
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} eventName - Nombre del evento
   **/
  trigger = function( el, eventName ){
    isE( el , function( element ){
        isS( eventName , function( name ){
             el.dispatchEvent(new Event('click'));
        } )
    })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} val - valor para ser afectado en la propiedad value
   *
   **/
  value = function( el , val ){
    return isE( el , function( element ){
        if( !_is.isNull( val ) && !isU( val ) ){
           return el.value = val;
        }else if( isF( val ) ){
           return val( el.value , val  )
        }else{
          return el.value;
        }
    })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@return {Number} - Retorna el valor del ancho del elemento
   **/
  width  = function( el ){
    return isE( el , function( element ){
        return element.offsetWidth;
    } )
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@return {Number} - Retorna el valor del alto del elemento
   **/
  height = function( el ){
    return isE( el, function( element ){
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
  /**
   *@name element#addClass
   *@function
   *@param {String} styleClass - Nombre de la clase que se desea agregar
   **/
  proto.addClass = function( styleClass ){
      if( isE( this.elem)){
          addClass( this.elem , styleClass )
      }
      if( isA( this.elem) ){
        this.elem.forEach( function( elem ){
          addClass( elem , styleClass )
        })
      }

  }
  // ===========================================================================
  /**
   *@name element#removeClass
   *@function
   *@param {String} styleClass - Nombre de la clase que se desea remover
   **/
  proto.removeClass = function( styleClass ){
      if( isE( this.elem ) ){
          removeClass( this.elem , styleClass )
      }
      if( isA( this.elem) ){
        this.elem.forEach( function( elem ){
            removeClass( elem , styleClass )
        });
      }

  }
  // ===========================================================================
  /**
   *@name element#hasClass
   *@function
   *@param {String} styleClass - Nombre de la clase que se desea verificar
   **/
  proto.hasClass = function( styleClass ){
      if( isE( this.elem ) ){
        return hasClass( this.elem ,styleClass  )
      }
      if( isA( this.elem ) ){
        this.elem.forEach(function( elem ){
          hasClass( elem ,styleClass  )
        });
        return null;
      }

  }
  // ===========================================================================
  /**
   *@name element#html
   *@function
   *@param {String} _html - Codigo html para agregar
   **/
  proto.html = function( _html ){
      if( isE( this.elem) ){
        html( this.elem , _html );
      }

      if( isA( this.elem ) ){
        this.elem.forEach(function( elem ){
           html( elem , _html)
        });
      }

  }
  // ===========================================================================
  /**
   *@name element#text
   *@function
   *@param {String} _text - Texto que se desea agregar
   **/
  proto.text = function( _text ){
      if( isE( this.elem) ){
        text( this.elem , _text );
      }
      if( isA( this.elem ) ){
        this.elem.forEach(function(elem){
          text( elem , _text);
        })
      }
  }
  // ===========================================================================
  /**
   *@name element#text
   *@function
   *@param {String} _text - Texto que se desea agregar
   **/
  proto.on = function( eventName , func ){
      if( isE( this.elem) ){
          on.bind(this)( this.elem , eventName , func );
      }
      if( isA( this.elem) ){
        this.elem.forEach(function( elem ){
            on.bind(this)( elem , eventName , func );
        }.bind(this))
      }

  }
  // ===========================================================================
  /**
   *@name element#text
   *@function
   *@param {String} _text - Texto que se desea agregar
   **/
  proto.trigger = function( eventName ){
      if( isE( this.elem ) ){
          trigger( this.elem , eventName )
      }

      if( isA( this.elem ) ){
        this.elem.forEach(function( elem ){
           trigger( elem , eventName )
        });
      }

  }
  // ===========================================================================
  /**
   *@name element#text
   *@function
   *@param {String} _text - Texto que se desea agregar
   **/
  proto.attr = function( attribute , value ){

      if( isS( attribute ) ){
          if( isA( this.elem ) ){
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
            if( isA( this.elem ) ){
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
  // ===========================================================================
  /**
   *@name element#height
   *@function
   *@return Retorna el Ancho
   **/
  proto.height = function(){
    if( isE( this.elem ) ){
        return height( this.elem );
    }
    return null;
  }
  // ===========================================================================
  /**
   *@name element#width
   *@function
   *@return Retorna el Alto
   **/
  proto.width = function(){
    if( isE( this.elem ) ){
      return width( this.elem );
    }
    return null;
  }
  // ===========================================================================
  /**
   *@name element#value
   *@function
   *@param {String} _value - valor que se desea setear
   **/
  proto.value = function( _value ){

    if( isE( this.elem ) ){
      return value( this.elem , _value );
    }

    if( isA( this.elem ) && isS( _value ) ){
      this.elem.forEach(function( elem ){
          value( elem , _value );
      });
      return null;
    }

  }
  // ===========================================================================
  var MainFunc = function( elem ){
    // =========================================================================
    if( isS( elem )  ){
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
    // =========================================================================
    if( isE( elem )  ){
        return new element( elem );
    }
    // =========================================================================
    return new element( null );
    // =========================================================================
  }
  return MainFunc;
  // ===========================================================================
})
