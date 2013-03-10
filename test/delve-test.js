var a = require('assert')
var delve = require('..')

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

test('return is object', function(){
    var inner = { x: 3 }
    var o = { x: { y: inner } }

    a.equal(delve(o, 'x.y'), inner)
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
    });
})
