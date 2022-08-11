// Some imports
import * as helper from "./helper-functions.js";

// DEBUG
var DEBUG = false;

// document element - console-canvas
export var consoleMem = new Array();
export var times_clicked = 0;
export var consoleFocused = false;

// Consts
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Cursor values
var cursor_x = 2;
var cursor_y = 2;
var cursor_size_x = 3;
var cursor_size_y = 12;
var cursor_render_index = 0;
var cursor_prompt_stop = 0;
var console_x = cursor_x;
var console_y = cursor_y + cursor_size_y;
var cursor_fill_style = 'DarkGreen';

// Console buffers
var console_buffer = new Array();

export function setConsoleFocused(value) {
    consoleFocused = value;
}

function write_char(ctx, char) {
    ctx.font = "12px Courier New";

    // Move cursor after writing text
    console_buffer.push(char);
    cursor_render_index += 1;
}

function write_string(ctx, string) {
    for (var i = 0; i < string.length; i++) {
        write_char(ctx, string.charAt(i));
    }
}

function write_prompt(ctx, prompt) {
    write_string(ctx, prompt);
    cursor_prompt_stop = prompt.length;
}

function render_console_buffer(ctx, buffer) {
    ctx.font = "12px Courier New";
    let console_line = buffer.join("");
    ctx.fillText(console_line, console_x, console_y);
}

function calculate_cursor_x_and_render(ctx, cursor_render_index, buffer) {
    var text_before_cursor = 0;
    var cursor_x_local = cursor_x;
    if (cursor_render_index != 0) {
        text_before_cursor = ctx.measureText(buffer.slice(-cursor_render_index).join(""));
        cursor_x_local += text_before_cursor.width;
    }
    // After all - render cursor
    helper.render_rect(ctx, cursor_x_local, cursor_y, cursor_size_x, cursor_size_y, cursor_fill_style);
}

function get_char_by_cursor_index(crs_index, buffer) {
    return console_buffer[crs_index];
}

// Event listeners
function onClick() {
    // Focus on clicked canvas
    consoleFocused = true;
}

function onKeyDown(event) {
    if (!consoleFocused) return;
    // console.log("Pressed key on console: ", event);
    switch (event.key) {
        case "ArrowLeft":
            console.log("Pressed left arrow!");
            // Move cursor left
            if (cursor_render_index <= cursor_prompt_stop) {
                return;
            }
            cursor_render_index -= 1;
            return;
        case "ArrowRight":
            console.log("Pressed right arrow!");
            // Move cursor right
            if (cursor_render_index >= console_buffer.length) {
                return;
            }
            cursor_render_index += 1;
            return;
    }
    // Cover rest of keys
}

(() => {
    var consoleCanvas = document.getElementById('console-canvas');
    var context2d = consoleCanvas.getContext('2d');
    const canvas_width = consoleCanvas.width;
    const canvas_height = consoleCanvas.height;

    // Flicker vars
    let flicker = false;
    let char_counter = 0;

    // Before rendering - prepare prompt
    write_prompt(context2d, "patrician-hex-debug-console: > ");

    // Render loop for console
    let start;
    function step(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
        const dt = (timestamp - start) * 0.001;
        start = timestamp;

        // Clearing all canvas
        context2d.clearRect(0, 0, canvas_width, canvas_height);

        // Rendering goes here
        if (DEBUG) helper.render_canvas_outlier(context2d, canvas_width, canvas_height);

        // Make cursor flicker
        if (!flicker && timestamp % 1000 > 500) flicker = !flicker;
        else if (flicker  && timestamp % 1000 < 500) flicker = !flicker;
        if (flicker) calculate_cursor_x_and_render(context2d, cursor_render_index, console_buffer);

        // Random char to test console
        if (char_counter < 30) {
            const r = characters.charAt((Math.random() * characters.length).toFixed(0)); 
            write_char(context2d, r);
            char_counter += 1;
        }

        // Rendering console buffer
        render_console_buffer(context2d, console_buffer);

        // Requesting animation frame
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

    // Adding on click event listener
    consoleCanvas.addEventListener('click', onClick, false);

    document.addEventListener('keydown', onKeyDown, false);
})();
