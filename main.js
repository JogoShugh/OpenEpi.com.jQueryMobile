(function() {

  require.config({
    paths: {
      'text': 'scripts/text'
    }
  });

  require(["modules", "app"]);

}).call(this);
