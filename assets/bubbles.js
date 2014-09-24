String.prototype.getHashCode = function() {
  var hash = 0;
  if (this.length == 0) { return hash; }
  for (var i = 0; i < this.length; i++) {
    hash = this.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

Number.prototype.intToHSL = function() {
  var shortened = this % 360;
  return "hsl(" + shortened + ",100%,30%)";
};

String.prototype.colorize = function() {
  return this.getHashCode().intToHSL();
}

var screenWidth = screen.availWidth;

var Bubble = function() {
  var self = this;
  var el;

  self.init = function(id, type) {
    var bubble = "<div id='bubble-" + id + "' \
                 class='bubblerise bubble-container'> \
                   <div class='bubble'></div> \
                 </div>";
    $('.wrapper').append(bubble);

    // Find the bubble and place it at a random place on the X-axis
    el = $('#bubble-' + id);
    el.css({ left: Math.random() * screenWidth });

    // Color the bubble in a random, but consistent way
    el.find('.bubble').css({ "background-color": type.colorize() })

    // When the bubblerise transistion is done,
    // we apply pop and remove the bubbles
    el.one('webkitTransitionEnd', function(e) {
      el.remove();
    });

    // Makes the bubbles rise, by tricking them into transforming -Y with CSS
    setTimeout(function() {
      el.removeClass('bubblerise');
    }, 100);
  };
}

//
// =====================
// Spawn random bubbles!

// var i = 0, limit = 0;
// setInterval(function() {
//   limit += 100;
//   for(i; i < limit; i++) {
//     doSpawnBubble(i)
//   }
// }, 1000);

// function doSpawnBubble(i) {
//   setTimeout(function() {
//     type = 'errbit';
//     if (i % 3 == 0) {
//       type = 'client';
//     } else if (i % 5 == 0) {
//       type = 'provider';
//     } else if (i % 7 == 0) {
//       type = 'order';
//     }
//     new Bubble().init(i, type);
//   }, i * 100);
// }
