# delve
Delve recursively into a value to retrieve a property; without erroring.

[![browser support](https://ci.testling.com/hughfdjackson/delve.png)](http://ci.testling.com/hughfdjackson/delve)

## Why
It sucks to have to do `if ( obj && obj.prop && obj.prop.secondProp ) { ... }`.

## Example

### delve

```javascript
var delve = require('delve')

var o = { x: { y: { z: 'my val' } } }

delve(o, 'x.y')               //= { z: 'my val' }
delve(o, 'x.y.z')             //= 'my val'
delve(o, 'x.y.z.foo')         //= undefined
delve(undefined, 'x.y.z.foo') //= undefined
delve(null, 'x.y.z.foo')      //= undefined
delve('foo', 'length')        //= 3
```
### delve.has

```javascript
var delve = require('delve')

delve.has({ x: { y: undefined } }, 'x.y') //= true
delve.has('foo', 'length')                //= true
delve.has(null, 'foo')                    //= false
delve.has({ x: { } }, 'x.y')              //= false
```

For more examples, see tests/delve-test.js.

## Install

### npm

```bash
npm install delve
```

### browser

Download src/delve.js, and include it as a script tag.

### AMD/require.js

Download src/delve.js, and require it in:

```javascript
require(['libs/delve'], function(delve){
  // ... assuming delve is in libs/delve, now it's ready to use
})
```
