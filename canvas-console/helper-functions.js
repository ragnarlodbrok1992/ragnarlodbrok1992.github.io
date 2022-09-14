// Some render stuff
export function render_canvas_outlier(ctx, canvas_width, canvas_height) {
  // Draw outlier
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
  ctx.moveTo(0, 0);
  ctx.lineTo(canvas_width, 0);
  ctx.stroke();
  ctx.lineTo(canvas_width, canvas_height);
  ctx.stroke();
  ctx.lineTo(0, canvas_height);
  ctx.stroke();
  ctx.lineTo(0, 0);
  ctx.stroke();
}

export function render_rect(ctx, pos_x, pos_y, size_x, size_y, fill_style) {
  // Setting up fill style
  ctx.fillStyle = fill_style;

  // Drawing rectangle
  ctx.fillRect(pos_x, pos_y, size_x, size_y);
}