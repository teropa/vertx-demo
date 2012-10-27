(function() {
 
  var loc = window.location
    , w = document.documentElement.clientWidth
    , h = document.documentElement.clientHeight
    , centerX = w / 2
    , centerY = h / 2
    , eb = new vertx.EventBus(loc.protocol + '//' + loc.hostname + ':' + loc.port + '/eventbus')
    , addWord = function(message) {
      var x = Math.round(Math.random() * w) - 200 // Start location, x
        , y = Math.round(Math.random() * h) - 50 // Start location, y
        , startRotation = Math.round(Math.random() * 16) + 352
        , endRotation = Math.round(Math.random() * 16) + 352
        , text = document.createElement('div');

      // Set initial element attributes and content
      text.className = 'word';
      text.style.left = x + 'px';
      text.style.top = y + 'px';
      text.style.webkitTransform = "rotate("+startRotation+"deg)";
      text.innerHTML = message.word;  

      // On next tick, set the values at the end of the animation.
      // This will start animating the attributes.
      setTimeout(function() {
        text.className = 'word word-end';
        text.style.left = (centerX - text.offsetWidth / 2) + 'px';
        text.style.top = centerY + 'px';
        text.style.webkitTransform = "scale(0.01) rotate("+endRotation+"deg)";
      }, 0);

      /// Add the element to the document
      document.body.appendChild(text);

      // After 5 seconds, remove from the document
      setTimeout(function() {
        document.body.removeChild(text);
      }, 5000);
    };

  // Wait for event bus to connect
  eb.onopen = function() {
    // Start listening for words
    eb.registerHandler('tweetWords', _.throttle(addWord, 50));
  }

})();
