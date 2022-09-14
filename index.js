import * as helper from "./canvas-console/helper-functions.js";
import * as canvasConsole from "./canvas-console/canvas-console.js";

// Global variables
const main_content_file = './content/main.txt';
var main_text;

// Global functions
async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    return myText;
}

// Sort of main of javascript file
(() => {
    // Main
    canvasConsole.setPrompt("main");

    // Load and write content
    // main_content = loadFile('./content/main.txt').value;
    var main_content = getText(main_content_file);
    main_content.then(data => {
        main_text = data;
    });

    // Block execution before all text files are loaded
    // Or wait for promise...

    // Run rest of the code
    console.log(main_text);

    // Checking if everything worked
    // console.log(textResponse);
})();