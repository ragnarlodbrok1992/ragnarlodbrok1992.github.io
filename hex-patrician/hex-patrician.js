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
    // Render hex lines
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(this.corner_points[i].x, this.corner_points[i].y);
      ctx.lineTo(this.corner_points[i + 1].x, this.corner_points[i + 1].y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.stroke();
    }
    // Last line - different order
    ctx.beginPath();
    ctx.moveTo(this.corner_points[5].x, this.corner_points[5].y);
    ctx.lineTo(this.corner_points[0].x, this.corner_points[0].y);
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.stroke();
  }
}

// HexMap container in a class
class HexMap {
  constructor(x, y, x_size, y_size, hex_size) {
    this.hexes = new Array();
    this.x = x;
    this.y = y;

    // Variables for hexmap - hex width, height, etc
    this.width_flat = 2 * hex_size;
    this.height_flat = Math.sqrt(3) * hex_size;

    for (let i = 0; i < x_size; i++) {
      for (let j = 0; j < y_size; j++) {
        let x = (3 / 4) * this.width_flat * i;
        let y = this.height_flat * j + ((1 / 2) * this.height_flat * (i % 2));
        this.hexes.push(new Hex(new Point(this.x + x, this.y + y), hex_size));
      }
    }
  }

  render(ctx) {
    console.log("Rendering hex map!");

    // TODO(ragnar): Add some rendering
    for (const hex of this.hexes) {
      hex.render(ctx);
    }
  }
}

// Sort of main of javascript file
(() => {
  // Getting HTML canvas
  var mainCanvas = document.getElementById('main-canvas');
  var context2d = mainCanvas.getContext('2d');

  // TODO(ragnar): If we can't get canvas - gracefully spadnij z rowerka

  // Create all required classes and stuff
  // let test_hex = new Hex(new Point(100, 100), 20);

  let hex_map = new HexMap(20, 20, 10, 10, 10);
  hex_map.render(context2d);

  // Testing creation of hex
  // console.log(flat_hex_corner(new Point(test_hex.x, test_hex.y), test_hex.size, 0));
  // console.log(flat_hex_corner(new Point(test_hex.x, test_hex.y), test_hex.size, 1));
  // console.log(test_hex.corner_points);
  // test_hex.render(context2d);
})();
