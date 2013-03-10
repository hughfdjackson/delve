void function(root){

    var unpackOne = function(o, path){
        if ( o == null ) return
        else             return o[path]
    }

    var delve = function(o, path){
        return path.split('.').reduce(unpackOne, o)
    }

    if ( delve(module, 'exports') )
        module.exports = delve
    else
        root.delve = delve

}(this)
