
/*(function($){
 // Store a reference to the original load method.
 var loadMethod = $.fn.load;

 // Define overriding method.
 $.fn.load = function() {
 console.log( arguments );

 // Execute the original method.
 loadMethod.apply( this, arguments );
 };
 })(jQuery);*/