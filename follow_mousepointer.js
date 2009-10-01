var draw_interval = 50;
var shuffle_interval = 1000;
var speed    = 0.1;
var pointer  = [300, 300];
var followers = [];
var margin   = [5, 5];

function draw() {
  // fisherYates(followers);
  // iterate trough elements to reposition them
  for (var i = 0, len = followers.length; i < len; ++i) {
    var elem = followers[i];

    // determine current element position
    var cur_pos = [ parseInt(elem.style.left), parseInt(elem.style.top) ];

    // determine a new position for the element
    var delta =  [ (pointer[0] - cur_pos[0]) * speed,
                   (pointer[1] - cur_pos[1]) * speed];
    
    // try to find a new position that is without a collision - each has a
    // limited tries
    for (var tries = 1; tries < 3; tries ++) {
      var new_pos = [ (cur_pos[0] + delta[0] / tries),
                      (cur_pos[1] + delta[1] / tries) ];

      // determine collisions with already moved object
      var col = false;
      for (var j = 0; j < i; ++j) {
        if (i == j) { continue; }
        if (collision(followers[j], new_pos)) {
          col = true;
          break;
        }
      }

      // no colision - use the value of new_pos for the movement
      if (false == col) { 
        // redraw element at new position
        elem.style.left = (new_pos[0]) + "px";
        elem.style.top  = (new_pos[1]) + "px";
        break;
      }
    }

  }

}

function trackmouse(event) {
  pointer = [ event.pointerX(), event.pointerY() ];
}


function collision(element, position) {
  if (Math.abs(position[0] - parseInt(element.style.left)) >
      (element.getWidth() + margin[0])) {
      return false;
      }
  if (Math.abs(position[1] - parseInt(element.style.top)) >
      (element.getHeight() + margin[1])) {
      return false;
      }
  return true;
}

function shuffle() {
  var i = followers.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = followers[i];
     var tempj = followers[j];
     followers[i] = tempj;
     followers[j] = tempi;
   }
}

Event.observe(window, 'load', function() {
  Event.observe(document, 'mousemove', trackmouse);
  viewport = document.viewport.getDimensions();
  followers = $$('.follow');
  followers.each(function(elem) {
    elem.style.left = (Math.random() * viewport.width) + "px"
    elem.style.top  = (Math.random() * viewport.height) + "px"
    });
  setInterval(draw, draw_interval);
  // setInterval(shuffle, shuffle_interval);
});

