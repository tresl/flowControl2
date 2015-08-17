var five = require("johnny-five");
var raspi = require("raspi-io");
var board = new five.Board({
  io: new raspi()
});
var pulses = 0;
var lastFlowRateTimer = 0;

board.on("ready", function() {
  this.pinMode(7, five.Pin.INPUT);
  lastFlowPinState = 0;

  // Check Digital Pin to see if theres a change
  var x = this.digitalRead(7, function(value) {
    // send the pin status to flowSignal helper
    flowSignal(value);
  });

  setInterval(function() {
    var litres = pulses;
    litres /= 7.5;
    litres /= 60;
    console.log(litres);
  }, 1000);
});

// helper function to keep track of pulses
function flowSignal (value) {
  if (value === 0) {
    lastFlowRateTimer ++;
    return;
  }
  if (value === 1) {
    pulses ++;
  }
  lastFlowPinState = value;
  flowrate = 1000.0;
  flowrate /= lastFlowRateTimer;
  lastFlowRateTimer = 0;
}
