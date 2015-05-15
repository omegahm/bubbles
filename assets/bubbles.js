String.prototype.getHashCode = function() {
  var hash = 0;

  if (this.length !== 0) {
    for (var i = 0; i < this.length; i++) {
      hash += this.charCodeAt(i)
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

var Legend = function(type, color) {
  var self = this;
  self.type      = ko.observable(type);
  self.color     = ko.observable(color);
  self.count     = ko.observable(1);
  self.timestamp = ko.observable(Date.now());

  self.legendStyle = ko.pureComputed(function() {
    return {
      backgroundColor: self.color()
    };
  });

  self.text = ko.pureComputed(function() {
    return self.type().substring(0, 25) + " (" + self.count() + ")";
  });
}

var BubblesViewModel = function() {
  var self = this;
  self.bubbles = ko.observableArray([]);
  self.legends = ko.observableArray([]);

  self.incrementOrCreateLegend = function(type, color) {
    if ($.grep(self.legends(), function(legend) { return legend.type() == type; }).length === 0) {
      self.legends.push(new Legend(type, color));
    } else {
      self.incrementLegend(type);
    }
  };

  self.incrementLegend = function(type) {
    $.each(self.legends(), function(i, legend) {
      if (legend.type() == type) {
        legend.count(legend.count() + 1);
        legend.timestamp(Date.now());
      }
    });
  };

  self.compactLegend = function() {
    var one_hour_ago = Date.now() - 3600000;
    self.legends(self.legends().filter(function(legend) {
      return legend.timestamp() > one_hour_ago;
    }));
  };

  setInterval(function() {
    self.compactLegend();
  }, 2000);
};

var screenWidth = screen.availWidth - 24; // subtract size of bubble
var bubblesViewModel = new BubblesViewModel();
ko.applyBindings(bubblesViewModel);

var Bubble = function(params) {
  var self = this;
  self.type = ko.observable(params.type.toString());
  self.bubblerise = ko.observable(true);

  self.color = ko.observable(params.color)
  if (self.color() === undefined) {
    self.color(self.type().colorize());
  }

  self.size = ko.observable(params.size)
  self.containerStyle = ko.pureComputed(function() {
    return {
      left: Math.random() * screenWidth + "px",
      top: parseFloat(self.size()) + "px"
    };
  });

  self.bubbleStyle = ko.pureComputed(function() {
    var style = {
      backgroundColor: self.color()
    }

    if (self.size() !== undefined) {
      style['borderWidth'] = parseFloat(self.size()) / 10 + 2;
    }

    return style
  });

  self.fire = function() {
    bubblesViewModel.incrementOrCreateLegend(self.type(), self.color());
    bubblesViewModel.bubbles.push(self);

    setTimeout(function() {
      // Makes the bubbles rise, by tricking them into transforming -Y with CSS
      self.bubblerise(false);
    }, 100);

    setTimeout(function() {
      // The CSS transistion takes 15s.
      // Remove the bubble from DOM after 20s.
      bubblesViewModel.bubbles.remove(self);
    }, 20000);
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
