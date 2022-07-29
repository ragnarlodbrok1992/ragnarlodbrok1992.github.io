console.log("This is Hex Patrician game - alpha version.");

// Required maths functions
function flat_hex_corner(center, size, i) {
  var angle_deg = 60 * i;
  var angle_rad = Math.PI / 180 * angle_deg;
  return new Point(center.x + size * Math.cos(angle_rad),
                   center.y + size * Math.sin(angle_rad));
}

// Point
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Hexes
class Hex {
  constructor(center, size) {
    console.log("This is center ", center);
    this.x = center.x;
    this.y = center.y;
    this.size = size;

    this.corner_points = new Array();
    this.populate_hex_corners();
  }

  populate_hex_corners() {
    for (let i = 0; i < 6; i++) {
      this.corner_points.push(flat_hex_corner(new Point(this.x, this.y), this.size, i));
    }
  }

  // Let's render this badboi
  render(ctx) {
    // Test render <--- this works - I am passing by reference!
    // ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
    // ctx.fillRect(100, 100, 20, 20);

    // Render hex lines
    for (let i = 0; i < 5; i++) {

    }
    // Last line - different order

  }
}

// Sort of main of javascript file
(() => {
  // Getting HTML canvas
  var mainCanvas = document.getElementById('main-canvas');
  var context2d = mainCanvas.getContext('2d');

  // TODO(ragnar): If we can't get canvas - gracefully spadnij z rowerka

  // Create all required classes and stuff
  let test_hex = new Hex(new Point(20, 20), 20);
  
  // Testing creation of hex
  console.log(flat_hex_corner(new Point(test_hex.x, test_hex.y), test_hex.size, 0));
  console.log(flat_hex_corner(new Point(test_hex.x, test_hex.y), test_hex.size, 1));
  console.log(test_hex.corner_points);
  test_hex.render(context2d);
    
  // Let's put some pixels on canvas
  context2d.fillStyle = 'rgba(200, 0, 0, 0.5)';
  context2d.fillRect(10, 10, 50, 50);


})();
