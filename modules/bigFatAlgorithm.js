(function() {

  define({
    execute: function(base, exp) {
      ' Pretend that this \nhas a lot of really complicated calculations\nand that it is the sort off 30 KB script\nthat you don\'t want to burden a web or mobile\nuser from having to download at start-up time.';
      return Math.pow(base, exp);
    }
  });

}).call(this);
