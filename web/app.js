(function() {
 
  var loc = window.location
    , w = document.documentElement.clientWidth
    , h = document.documentElement.clientHeight
    , eb = new vertx.EventBus(loc.protocol + '//' + loc.hostname + ':' + loc.port + '/eventbus')
    , colors = ['#dabca6', '#808ca2', '#a1c699']
    , addWord = function(message) {
      var x = Math.round(Math.random() * w) - 100 // Start location, x
        , y = - Math.round(Math.random() * h) - 100 // Start location, y
        , opacity = 0.7 + Math.random() * 0.3
        , startRotation = Math.round(Math.random() * 20) + 350
        , endRotation = Math.round(Math.random() * 20) + 350
        , text = document.createElement('div');

      // Set initial element attributes and content
      text.className = 'word';
      text.style.color = colors[_.random(0, colors.length - 1)];
      text.style.opacity = opacity;
      text.style.left = x + 'px';
      text.style.top = y + 'px';
      text.style.webkitTransform = "rotate("+startRotation+"deg)";
      text.innerHTML = message.word;  

      // On next tick, set the values at the end of the animation.
      // This will start animating the attributes.
      setTimeout(function() {
        text.style.top = (h + 500)+'px';
        text.style.webkitTransform = "rotate("+endRotation+"deg)";
      }, 0);

      /// Add the element to the document
      document.body.appendChild(text);

      // After 5 seconds, remove from the document
      setTimeout(function() {
        document.body.removeChild(text);
      }, 7000);
    };

  // Wait for event bus to connect
  eb.onopen = function() {
    // Start listening for words
    eb.registerHandler('tweetWords', _.throttle(addWord, 50));
  }

})();
