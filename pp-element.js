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
  //Funcion Each
  var each = function( arr , func ){
      arr.forEach( func )
  }
  // Creamos referencia para obtener un mayor minify
  var isE = _is.isElement,
  isS = _is.isString,
  isA = _is.isArray,
  isF = _is.isFunction,
  isU = _is.isUndefined,
  isO = _is.isObject;
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
      })
  },
  // ===========================================================================
  /**
  *@param {NodeElement} el - Elemento DOM para ser afectado
  *@param {String} styleClass - Nombre de la clase css ha remover
  */
  removeClass = function( el , styleClass ){
        isE(el, function( elem ){
            isS(styleClass,function( sc ){
                elem.classList.remove( sc );
            })
        })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} styleClass - Nombre de lca clase css para verificar
   */
  hasClass = function( el , styleClass ){
    return isE(el,function(elem){
      return isS(styleClass,function( sc ){
          return elem.classList.contains(sc);
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
      return isE( el , function( elem ){
            return isS( attribute , function( attr ){
                  if( isU( value ) ){
                    return elem.getAttribute( attr );
                  }else if( _is.isNull( value ) ){
                    return elem.removeAttribute( attr );
                  }else{
                    return elem.setAttribute( attr , value);
                  }
            } );
      });
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} property - Nombre del attributo css para manipular
   *@param {String} value - Valor para el attributo
   */
  css = function( el , property , value ){
      return isE( el , function( elem ){
            return isS( property , function( attr ){
                  if( isU( value ) ){
                    return elem.style[attr];
                  }else if( _is.isNull( value ) ){
                    return elem.style[attr] = "";
                  }else{
                    return elem.style[attr] = value;
                  }
            } );
      });
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} html - Codigo html para ser insertado
   *
   **/
  html = function( el , html ){
      isE(el,function(elem){
          elem.innerHTML = html;
      })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} text - texto ha agregar
   **/
  text = function( el  , text ){
    isE(el,function(elem){
        elem.innerText = text;
    })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@param {String} eventName - Nombre del Evento
   *@param {Function} func - Funcion que se ejecutara
   **/
  on = function( el,  eventName , func ){
    isE( el , function( elem ){
      if( isS( eventName ) && isF( func ) ){
          elem.addEventListener( eventName , function( e ){
              func.bind(this)( e , new element(e.currentTarget) )
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
    isE( el , function( elem ){
        isS( eventName , function( name ){
             elem.dispatchEvent(new Event(eventName));
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
    return isE( el , function( elem ){
        if( !_is.isNull( val ) && !isU( val ) ){
           return elem.value = val;
        }else if( isF( val ) ){
           return val( elem.value , val  )
        }else{
          return elem.value;
        }
    })
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@return {Number} - Retorna el valor del ancho del elemento
   **/
  width  = function( el ){
    return isE( el ) ? el.offsetWidth : null;
  },
  // ===========================================================================
  /**
   *@param {NodeElement} el - Elemento DOM para ser afectado
   *@return {Number} - Retorna el valor del alto del elemento
   **/
  height = function( el ){
    return isE( el ) ? el.offsetHeight : null;
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
      }else if( isA( this.elem) ){
        each( this.elem , function( elem ){
          addClass( elem , styleClass )
        } )
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
      }else if( isA( this.elem) ){
        each( this.elem , function( elem ){
            removeClass( elem , styleClass )
        } )
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
      return null;
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
      }else if( isA( this.elem ) ){
        each( this.elem, function( elem ){
           html( elem , _html)
        })
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
      }else if( isA( this.elem ) ){
        each( this.elem , function(elem){
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
      }else if( isA( this.elem) ){
        each( this.elem , function( elem ){
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
      }else if( isA( this.elem ) ){
        each( this.elem , function( elem ){
           trigger( elem , eventName )
        } )
      }
  }
  // ===========================================================================
  /**
   *@name element#css
   *@function
   *@param {String} property - Propiedad css
   *@param {String} value - Valor para la propoerty css
   **/
  proto.css = function( property , value ){
      // -----------------------------------------------------------------------
      if( isS( property ) ){
          if( isA( this.elem ) ){
              each( this.elem , function( elem ){
                  css( elem , property , value );
              } )
              return null;
          }else{
            return css( this.elem , property , value );
          }
      }
      // -----------------------------------------------------------------------
      if( isO( property ) ){
          var keyAttr = Object.keys( property );
          for( var i = 0; i < keyAttr.length ; i++ ){
            if( isA( this.elem ) ){
                each( this.elem , function( elem ){
                    css( elem , keyAttr[i] , property[keyAttr[i]] );
                })
            }else{
                css( this.elem , keyAttr[i] , property[keyAttr[i]] );
            }
          }
          return null;
      }
      // -----------------------------------------------------------------------
  }
  // ===========================================================================
  /**
   *@name element#text
   *@function
   *@param {String} _text - Texto que se desea agregar
   **/
  proto.attr = function( attribute , value ){
      // -----------------------------------------------------------------------
      if( isS( attribute ) ){
          if( isA( this.elem ) ){
              each( this.elem , function( elem ){
                  attr( elem , attribute , value );
              } )
              return null;
          }else{
            return attr( this.elem , attribute , value );
          }
      }
      // -----------------------------------------------------------------------
      if( isO( attribute ) ){
          var keyAttr = Object.keys( attribute );
          for( var i = 0; i < keyAttr.length ; i++ ){
            if( isA( this.elem ) ){
                each( this.elem , function( elem ){
                    attr( elem , keyAttr[i] , attribute[keyAttr[i]] );
                })
            }else{
                attr( this.elem , keyAttr[i] , attribute[keyAttr[i]] );
            }
          }
          return null;
      }
      // -----------------------------------------------------------------------
  }
  // ===========================================================================
  /**
   *@name element#data
   *@function
   *@param {String} attribute - Texto que se desea agregar
   *@param {String} value - Valor
   **/
  proto.data = function( attribute , value ){
      return isS( attribute ) ? this.attr('data-'+attribute,value) :(
        isO( attribute ) ?  this.attr(function(attr){
          var vtr = {};
          var attrKey = Object.keys( attr );
          for( var i = 0 ; i < attrKey.length ; i++ ){
              vtr[ 'data-'+attrKey[i] ] = attr[ attrKey[i] ] ;
          }
          return vtr;
        }(attribute))   : null
      );
  }
  // ===========================================================================
  /**
   *@name element#height
   *@function
   *@return Retorna el Ancho
   **/
  proto.height = function(){
    return isE( this.elem ) ?  height( this.elem ) : null;
  }
  // ===========================================================================
  /**
   *@name element#width
   *@function
   *@return Retorna el Alto
   **/
  proto.width = function(){
    return isE( this.elem ) ?  width( this.elem ) : null;
  }
  // ===========================================================================
  /**
   *@name element#value
   *@function
   *@param {String} _value - valor que se desea setear
   **/
  proto.value = function( _value ){
    // VERIFICAMOS QUE EL ELEM SEA UN ELEMENTO O UN ARRAY
    if( isE( this.elem ) ){
      return value( this.elem , _value );
    }else if( isA( this.elem ) && isS( _value ) ){
      each( this.elem , function( elem ){
          value( elem , _value );
      } )
    }
    return null;
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
