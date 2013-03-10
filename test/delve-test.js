var a = require('assert')
var delve = require('..')

// to test older browsers with es5-shimmed functionality
require('es5-shim')


suite('delve')

test('present property', function(){
    var o = { x: { y: { z: 3 } } }
    a.equal(delve(o, 'x.y.z'), 3)
})

test('short path', function(){
    var o = { x: 3 }
    a.equal(delve(o, 'x'), 3)
})

test('prop of a non-null, non-undefined primitive', function(){
    a.equal(delve('foo', 'length'), 3)
    a.equal(delve(3, 'toString'), Number.prototype.toString)
    a.equal(delve(true, 'toString'), Boolean.prototype.toString)
});

test('undefined as first argument', function(){
    a.equal(delve(undefined, 'x.y.z'), undefined)
})

test('missing prop', function(){
    var o = { x: { b: { c: 3 } } }
    a.equal(delve(o, 'x.y.z'), undefined)
})

test('empty string', function(){
    var o = { x: { y: { x: 3 } } }
    a.equal(delve(o, ''), undefined)
})

test('return is object', function(){
    var inner = { x: 3 }
    var o = { x: { y: inner } }

    a.equal(delve(o, 'x.y'), inner)
})

test('delve into an array', function(){
    var o = [1, { x: [{ y: [{ z: 3 }] }] }]

    a.equal(delve(o, '1.x.0.y.0.z'), 3)
})

test('primitive value part way through', function(){
    var cases = [
        { x: { y: 'string' } },
        { x: { y: 1 } },
        { x: { y: null } },
        { x: { y: false } }
    ]

    cases.forEach(function(o){
        a.equal(delve(o, 'x.y.z'), undefined)
        a.equal(delve.has(o, 'x.y.z'), false)
    })
})

test('delve.has on undefined as a value', function(){
    var o = { x: { y: { z: undefined } } }
    a.equal(delve.has(o, 'x.y.z'), true)
})

test('delve.has on a string', function(){
    a.equal(delve.has('foo', 'length'), true)
})
