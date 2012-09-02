(function() {

  if(!window.JS) {
    var JS = window.JS = {};
  }

  JS.Driver = {
    extend : function(hash) {
      if(hash.test && hash.test() == true) {
        for(var i in hash) {
          JS.Driver[i] = hash[i];
        }
      }
    };
  };

})();
