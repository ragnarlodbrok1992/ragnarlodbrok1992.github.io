import * as helper from "./helper-functions.js";
import * as canvasConsole from "./canvas-console.js";

console.log("This is Hex Patrician game - alpha version.");

// DEBUG
var DEBUG = false;

// Engine variables - camera
var camera_x = 0;
var camera_y = 0;

// Engine variables - mouse
var mouseLButtonOn = false;
var mouseRButtonOn = false;

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
  render(ctx, x_offset, y_offset) {
    // Render hex lines
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(this.corner_points[i].x + x_offset,
                 this.corner_points[i].y + y_offset);
      ctx.lineTo(this.corner_points[i + 1].x + x_offset,
                 this.corner_points[i + 1].y + y_offset);
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.stroke();
    }
    // Last line - different order
    ctx.beginPath();
    ctx.moveTo(this.corner_points[5].x + x_offset,
               this.corner_points[5].y + y_offset);
    ctx.lineTo(this.corner_points[0].x + x_offset,
               this.corner_points[0].y + y_offset);
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

  render(ctx, x_offest, y_offset) {
    // TODO(ragnar): Add some rendering
    for (const hex of this.hexes) {
      hex.render(ctx, x_offest, y_offset);
    }
  }
}

// Event listeners
function onClick() {
  // This event happends when button is released
  // Focus on clicked canvas - unfocus from console
  canvasConsole.setConsoleFocused(false);
  mouseLButtonOn = false;
  mouseRButtonOn = false;
}

function onKeyDown(event) {
  if (canvasConsole.consoleFocused) return;
  switch (event.key) {
    case "a":
      camera_x -= 10;
      break;
    case "d":
      camera_x += 10;
      break;
    case "w":
      camera_y -= 10;
      break;
    case "s":
      camera_y += 10;
      break;
  }
}

function onMouseDown(event) {
  if (event.buttons == 1) {
    mouseLButtonOn = true;
  }
}

function onMouseMove(event) {
  if (mouseLButtonOn) {

    // Get x and y difference to apply to camera offset
    camera_x += event.movementX;
    camera_y += event.movementY;
  }
}

// Sort of main of javascript file
(() => {
  // Getting HTML canvas
  var mainCanvas = document.getElementById('main-canvas');
  var context2d = mainCanvas.getContext('2d');
  const canvas_width = mainCanvas.width;
  const canvas_height = mainCanvas.height;

  // TODO(ragnar): If we can't get canvas - gracefully spadnij z rowerka

  let hex_map = new HexMap(20, 20, 48, 17, 20);

  // TODO(ragnar): finally adding render loop

  let start;
  function step(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const dt = (timestamp - start) * 0.001;
    start = timestamp;

    // First clear all rectangle of canvas
    context2d.clearRect(0, 0, canvas_width, canvas_height);

    // Then render stuff
    hex_map.render(context2d, camera_x, camera_y);
    if (DEBUG) helper.render_canvas_outlier(context2d, canvas_width, canvas_height);

    window.requestAnimationFrame(step);

  }
  window.requestAnimationFrame(step);

  // TODO(ragnar): Checking importing data structures from canvas-console <--- works
  mainCanvas.addEventListener('click', onClick, false);
  mainCanvas.addEventListener('mousedown', onMouseDown, false);
  mainCanvas.addEventListener('mousemove', onMouseMove, false);

  document.addEventListener('keydown', onKeyDown, false);

})();
