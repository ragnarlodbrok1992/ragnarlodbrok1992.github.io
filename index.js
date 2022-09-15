import * as helper from "./canvas-console/helper-functions.js";
import * as canvasConsole from "./canvas-console/canvas-console.js";

// Global variables
const main_content_file = './content/main.txt';

async function get_string_from_file(file) {
    const x = fetch(file)
                .then((response) => {
                    return response.text();
                }).then((string) => {
                    return string;
                });
    return x;
}

async function set_prompt(prompt) {
    return new Promise((resolve) => {
        canvasConsole.set_prompt(prompt);
    });
}

// async function write_string(context, string) {
    
// }

// Sort of main of javascript file
(async () => {
    // Main
    var consoleCanvas = document.getElementById('console-canvas');
    var context2d = consoleCanvas.getContext('2d');

    console.log("Before setting prompt");
    await set_prompt("main");

    console.log("After setting prompt");

    const data = await get_string_from_file(main_content_file);

    console.log("Before writing string");
    canvasConsole.write_string(context2d, data);

    console.log("After writing string");

})();