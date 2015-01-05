// fancy wrapping in order to use (super)global
(function(w) {
    define(function() {
        return {
            a: 'Service#1',
            b: w
        };
    });
})(window); 
