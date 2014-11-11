String.prototype.getHashCode = function() {
  var hash = 0;

  if (this.length !== 0) {
    for (var i = 0; i < this.length; i++) {
      hash = this.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
  }

  return hash;
};

Number.prototype.intToHSL = function() {
  return "hsl(" + (this % 360) + ", 100%, 30%)";
};

String.prototype.colorize = function() {
  return this.getHashCode().intToHSL();
};

var screenWidth = screen.availWidth - 24; // subtract size of bubble
var id = 0;
var legends = [];
var legendDiv;

function pushToLegend(type, color) {
  if (legends.indexOf(type) === -1) {
    caption = type.substring(0, 25) // Truncate to 25 chars
    legendDiv = "<div class='item' id='type-" + type + "' \
                    <div style='background-color: " + color + "'> \
                      " + caption + " \
                    </div> \
                  </div>";

    $('#legends').append(legendDiv);
    legends.push(type);

    return true;
  }

  return false;
};

var Bubble = function() {
  var self = this;
  var el, bubble, color, size, parsedSize;

  self.init = function(params) {
    id += 1;

    bubble = "<div id='bubble-" + id + "' \
                 class='bubblerise bubble-container'> \
                   <div class='bubble'></div> \
                 </div>";
    $('#wrapper').append(bubble);

    // Find the bubble and place it at a random place on the X-axis
    el = $('#bubble-' + id);
    el.css({ left: Math.random() * screenWidth });

    // Color the bubble in a random, but consistent way
    color = params.color;
    if (color === undefined) {
      color = params.type.toString().colorize();
    }
    el.find('.bubble').css({ "background-color": color })

    size = params.size
    if (size !== undefined) {
      parsedSize = parseFloat(size);
      el.css({ 'top': -parsedSize + 'px' });
      el.find('.bubble').css({ 'border-width': ((parsedSize/10)+2) + 'px' });
      el.width(size);
      el.height(size);
    }

    pushToLegend(params.type.toString(), color);

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
