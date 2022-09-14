import * as helper from "./canvas-console/helper-functions.js";
import * as canvasConsole from "./canvas-console/canvas-console.js";

// Global variables
const main_content_file = './content/main.txt';

// Global functions
async function get_text(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    return myText;
}

// Sort of main of javascript file
(() => {
    // Main
    var consoleCanvas = document.getElementById('console-canvas');
    var context2d = consoleCanvas.getContext('2d');
    canvasConsole.set_prompt("main");


    // Load and write content
    // main_content = loadFile('./content/main.txt').value;
    var main_content = get_text(main_content_file);
    main_content.then(data => {
        // Write data to canvasConsole
        // FIXME(ragnar): This code has races - sometimes prompt is rendered before this test line
        canvasConsole.write_string(context2d, "Test data\n Twoja stara\nNowa Linia\nOstatnia linia");
    });

})();