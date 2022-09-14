// Some imports
import * as helper from "./helper-functions.js";

// DEBUG
var DEBUG = false;

// document element - console-canvas
export var consoleMem = new Array();
export var times_clicked = 0;
export var consoleFocused = false;
export var prompt_default = ": > ";
var prompt_set = false;

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

// Control keys booleans
var ctrl_pressed = false;
var shift_pressed = false;
var alt_pressed = false;

// Console buffers
var console_buffer_line = new Array();
var console_buffer = new Array();

export function set_prompt(value) {
    console.log("Setting prompt");
    prompt = value + prompt_default;
    prompt_set = true;
}

export function setConsoleFocused(value) {
    consoleFocused = value;
}

function write_char(ctx, char) {
    ctx.font = "12px Courier New";

    // Move cursor after writing text
    // Check if character is newline
    if (char == "\n") {
        console.log("Found new line in string to render");
        // console_y += cursor_size_y;
    }
    console_buffer.push(char);
    cursor_render_index += 1;
}

export function write_string(ctx, string) {
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
    var cursor_y_local = cursor_y;
    if (cursor_render_index != 0) {
        text_before_cursor = ctx.measureText(buffer.slice(-cursor_render_index).join(""));
        cursor_x_local += text_before_cursor.width;
    }
    // After all - render cursor
    helper.render_rect(ctx,
        cursor_x_local, cursor_y_local,
        cursor_size_x, cursor_size_y, cursor_fill_style);
}

function get_char_by_cursor_index(crs_index, buffer) {
    return console_buffer[crs_index];
}

// Event listeners
function onClick() {
    // Focus on clicked canvas
    consoleFocused = true;

    // Move cursor to the front
    cursor_render_index = console_buffer.length;
}

function onKeyDown(event) {
    if (!consoleFocused) return;
    // console.log("Pressed key on console: ", event);

    // Somehow get boolean values of pressed ctrl/shift/alt keys
    switch (event.key) {
        case "Control":
            ctrl_pressed = true;
            return;
        case "Alt":
            alt_pressed = true;
            return;
        case "Shift":
            shift_pressed = true;
            return;
    }

    switch (event.key) {
        case "ArrowLeft":
            // Check if somone pressed CTRL before
            if (ctrl_pressed) console.log("Moving left with ctrl!");
            if (cursor_render_index <= cursor_prompt_stop) {
                return;
            }
            cursor_render_index -= 1;
            return;
        case "ArrowRight":
            // Check if somone pressed CTRL before
            if (ctrl_pressed) console.log("Moving right with ctrl!");
            if (cursor_render_index >= console_buffer.length) {
                return;
            }
            cursor_render_index += 1;
            return;
        // Cover rest of keys
        // Backspace
        case "Backspace":
            if (cursor_render_index <= cursor_prompt_stop) return;
            console_buffer.splice(cursor_render_index - 1, 1);
            cursor_render_index -= 1;
            return;
        // Space
        case " ":
            // Add space character before
            console_buffer.splice(cursor_render_index, 0, ' ');
            cursor_render_index += 1;
            return;
        // Delete
        case "Delete":
            if (cursor_render_index >= console_buffer.length) return;
            console_buffer.splice(cursor_render_index, 1);
            return;
        // Home
        case "Home":
            cursor_render_index = cursor_prompt_stop;
            return;
        // End
        case "End":
            cursor_render_index = console_buffer.length;
            return;
    }
}

function onKeyPressed(event) {
    // console.log(event);
    if (!consoleFocused) return;

    // Handle alphanumerics
    if ((event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode >= 97 && event.keyCode <= 122)) {
            // console.log("Pressed: ", String.fromCharCode(event.keyCode));

            // Add character to console buffer
            console_buffer.splice(cursor_render_index, 0, String.fromCharCode(event.keyCode));
            cursor_render_index += 1;
        }
}

function onKeyUp(event) {
    // console.log("Key has gone up! ", event);
    switch (event.key) {
        case "Control":
            ctrl_pressed = false;
            return;
        case "Alt":
            alt_pressed = false;
            return;
        case "Shift":
            shift_pressed = false;
            return;
    }
}

(() => {
    var consoleCanvas = document.getElementById('console-canvas');
    var context2d = consoleCanvas.getContext('2d');
    const canvas_width = consoleCanvas.width;
    const canvas_height = consoleCanvas.height;

    // Flicker vars
    let flicker = false;
    let char_counter = 0;

    // Render loop for console
    let start;
    function step(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
        const dt = (timestamp - start) * 0.001;
        start = timestamp;

        // Setting prompt with boolean guard
        if (prompt_set) {
            write_prompt(context2d, prompt);
            prompt_set = false;
        }

        // Clearing all canvas
        context2d.clearRect(0, 0, canvas_width, canvas_height);

        // Rendering goes here
        if (DEBUG) helper.render_canvas_outlier(context2d, canvas_width, canvas_height);

        // Make cursor flicker
        if (!flicker && timestamp % 1000 > 500) flicker = !flicker;
        else if (flicker  && timestamp % 1000 < 500) flicker = !flicker;
        if (flicker) calculate_cursor_x_and_render(context2d, cursor_render_index, console_buffer);

        // Rendering console buffer
        render_console_buffer(context2d, console_buffer);

        // Requesting animation frame
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

    // Adding on click event listener
    consoleCanvas.addEventListener('click', onClick, false);

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keypress', onKeyPressed, false);
    document.addEventListener('keyup', onKeyUp, false);
})();
