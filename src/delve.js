void function(root){

    'use strict'

    var isObject = function(v){ return v !== null && typeof v === 'object' }

    var unpackOne = function(o, path){
        if ( o == null ) return
        else             return o[path]
    }

    var delve = function(o, path){
        var parts = path.split('.')
        var result = o
        var part

        while ( parts.length ) {
            part = parts.shift()
            result = unpackOne(result, part)
        }

        return result
    }

    delve.has = function(o, path){
        if ( delve(o, path) !== undefined ) return true

        var parts = path.split('.')
        var unpacked = delve(o, parts.slice(0, -1).join('.'))
        var last = parts.slice(-1)

        if ( isObject(unpacked) ) return last in unpacked
        else                      return false
    }

    if ( typeof module !== 'undefined' && delve(module, 'exports') ) module.exports = delve
    else if ( typeof define === 'function' && delve(define, 'amd') ) define(function(){ return delve })
    else                                                             root.delve = delve

}(this)
