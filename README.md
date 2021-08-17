# pp-element

## Getting Started
In the web project include pp-element.js with:

```html
<script src="https://cdn.jsdelivr.net/npm/pp-element@latest/pp-element.min.js" ></script>
```

Or

## Install

```console
npm i pp-element --save
```
## Methods

### addClass
Add class the element.

```javascript
var elem = ppElement("#title")
//Option1 - Single class
elem.addClass('title')
//Option2 - Array Class
elem.addClass(['primary','center','middle'])
//Options3 - String multi class
elem.addClass('text-blue text-xs text-bold')
```
### removeClass
Remove class the element.

```javascript
var elem = ppElement("#title")
//Option1 - Single class
elem.removeClass('title')
//Option2 - Array Class
elem.removeClass(['primary','center','middle'])
//Options3 - String multi class
elem.removeClass('text-blue text-xs text-bold')
```

### hasClass
Check if exists the class name

```javascript
var elem = ppElement("#title")
if( elem.hasClass('active') ){

}
```

### attr
Read , set or remove attributes.

```javascript
var elem = ppElement("#title")
//Read attribute
console.log( elem.attr('myAttribute') );
//Set Attributes
elem.attr('myAttribute','myValue')
//OR
elem.attr({
  'myAttribute1':'myValue1',
  'myAttribute2':'myValue2'
})
//remove Attribute
elem.attr('myAttribute',null);
```



### data
### css
### text
### html
### on  
### trigger
