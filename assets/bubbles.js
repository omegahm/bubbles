var bubbleSound = new Audio("data:audio/wav;base64,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fkwUQPIibeTIyAlSROiWaySrWTZRksm18gw9CRssJHFxZRQu0jojfMz7YIzlGxVVmv+aUxMZwys4St3+ej6odiyg/7Rv84TvPWt3Ckf+d5ymXsRtr9Dspnf/zncIyxjNeTzQkuVSq/S//+YqdGfnxoaknSYCKVbNat3///MdHAKFCQEFwJuZiAbjvmtf///+YmpGAjxlqAbTJBACYyLGUf/7ksSYABcKCQTVhIAE/b7YgzuwAAf/jcy7j////5gJAZ+3Hb/AABQANmgL5jyeELg8NfjNVr+NXnf/////zHTIUOxJMMTPDPyQLgbCAcNGVNpm8gdfIf+///yq/z///////NHAjDCkzBFNmiTCSQycoMvODCSwx0RNgkTCBcw9yPD+jVKE3QHrVr9WrzLLuO7M1TZ//////////mXpRp0qaYZG3txn0ecMbmQsBhpMYGanJbIXBTRl0FMBki6a8VgkeJRk2CfPM7//////8N41tf+OV2rey1ldq4TNTEFNRTMuOTJVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45MlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5LEYoPAAAGkHAAAAAAANIAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVEFHUG9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGhvZW5peEoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEJyb3VnaHQgdG8geW91IGJ5IGZsYXNoa2l0LmNvbf8=");

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

    self.legends(self.legends().sort(function(a, b) {
      if (a.count() > b.count())
        return -1;
      if (a.count() < b.count())
        return 1;

      var aHash = a.type().getHashCode(),
          bHash = b.type().getHashCode();
      if (a.type() < b.type())
        return 1;
      if (a.type() > b.type())
        return -1;
      return 0;
    }));
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
      // Remove the bubble from DOM after 15.05s.
      bubblesViewModel.bubbles.remove(self);
      if (bubbleSound) bubbleSound.play();
    }, 15050);
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
