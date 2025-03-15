// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { roastUserCode } = require('./roast');
const say = require('say'); // Import the say package

// Output channel for displaying roasts
let roastChannel;

// Track if a speech is currently active
let isSpeaking = false;

/**
 * Introduces random bugs into the code.
 * @param {string} code - The original code.
 * @returns {string} - The code with bugs introduced.
 */
function introduceBugs(code) {
    const bugTypes = [
        // JavaScript Bugs
        (code) => code.replace(/;/, ''), // Remove a semicolon
        (code) => code.replace(/\(/, '{').replace(/\)/, '}'), // Add extra brackets
        (code) => code.replace(/==/g, '=').replace(/=/, '=='), // Swap == and =
        (code) => code.replace(/,/, '.'), // Swap , and .
        (code) => code.replace(/true/g, 'false').replace(/false/g, 'true'), // Swap booleans
        (code) => code.replace(/\b[a-z]/g, (char) => char.toUpperCase()), // Capitalize things
        (code) => code.replace(/\d+\s*[\+\-\*\/]\s*\d+/g, (match) => `${match} + 1`), // Mess with math
        (code) => code.replace(/!/, ''), // Remove !
        (code) => code.replace(/(\w+)\(([^,]+),([^,]+)\)/, '$1($3,$2)'), // Swap arguments
        (code) => code.replace(/\b0\b/g, '1').replace(/\b1\b/g, '0'), // Swap 0 and 1
        (code) => code.replace(/(\d+)/, (match) => `${parseInt(match) + 1}`), // Add +1 randomly
        (code) => code.replace(/^(\s+)/gm, (match) => match + '    '), // Mess with indents
		(code) => code.replace(/\b(var|let|const)\b/g, (match) => match + ' '), // Append an extra space after var/let/const
        (code) => code.replace(/(\w+)\(/g, '$1 ('), // Insert a space before function call parentheses
        (code) => code.replace(/if\(/g, 'if ('), // Insert a space after if
        (code) => code.replace(/for\(/g, 'for ('), // Insert a space after for
        (code) => code.replace(/while\(/g, 'while ('), // Insert a space after while
        (code) => code.replace(/function\s+(\w+)/g, (match, p1) => 'function ' + p1.toLowerCase()), // Lowercase function names
        (code) => code.replace(/(\w+)\s*=\s*(\w+)/g, '$1 = $2 '), // Append an extra space after assignment
        (code) => code.replace(/(\w+)\.length/g, '$1 .length'), // Insert a space before .length
        (code) => code.replace(/(\w+)\./g, '$1 .'), // Insert a space after variable before dot
        (code) => code.replace(/return/g, 'return '), // Append an extra space after return
        (code) => code.replace(/=>/g, '=> '), // Append extra space after arrow
        (code) => code.replace(/(\w)(\s*)(;)/g, '$1$2 ;'), // Add an extra space before semicolon
        (code) => code.replace(/(\w+)\s*\+\s*(\w+)/g, '$1 + $2'), // Ensure spacing around plus
        (code) => code.replace(/(\w+)\s*\-\s*(\w+)/g, '$1 - $2'), // Ensure spacing around minus
        (code) => code.replace(/(\w+)\s*\*\s*(\w+)/g, '$1 * $2'), // Ensure spacing around multiplication
        (code) => code.replace(/(\w+)\s*\/\s*(\w+)/g, '$1 / $2'), // Ensure spacing around division
        (code) => code.replace(/(\w+)\.(\w+)/g, '$1 . $2'), // Add spaces around dot operator
        (code) => code.replace(/(\s+)$/gm, ''), // Remove trailing whitespace from each line
        (code) => code.replace(/\n+/g, '\n'), // Replace multiple newlines with a single newline
        (code) => code.replace(/\b(\w{4,})\b/g, (match) => match.replace(/e/g, '3')), // Replace 'e' with '3' in words of 4+ letters
    ];
    let appliedBugCount = 0;

    while (appliedBugCount < 2) {
        const randomBug = bugTypes[Math.floor(Math.random() * bugTypes.length)];
        const newCode = randomBug(code);

        // Ensure the bug actually changes the code
        if (newCode !== code) {
            code = newCode;
            appliedBugCount++;
        }
    }

    return code;
}

// Function to introduce bugs into the active editor's content
const introduceBugsToEditor = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const text = document.getText();

    const buggyCode = introduceBugs(text);

    const edit = new vscode.WorkspaceEdit();
    const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
    );

    edit.replace(document.uri, fullRange, buggyCode);
    await vscode.workspace.applyEdit(edit);
};

/**
 * Generates a simple problem for the user to solve.
 * @returns {string} - The problem statement.
 */
function generateProblem() {
    const problems = [
        "Create a function that checks if a number is prime.",
        "Write a function to calculate the factorial of a number.",
        "Create a function that finds the largest number in an array.",
        "Write a function to check if a string is a palindrome.",
        "Create a function that sorts an array of numbers in ascending order.",
        "Write a function to calculate the Fibonacci sequence up to a given number.",
        "Create a function that removes duplicates from an array.",
        "Write a function to find the greatest common divisor (GCD) of two numbers.",
    ];

    return problems[Math.floor(Math.random() * problems.length)];
}

/**
 * Displays a problem to the user in the output channel and returns it.
 * @returns {string} - The problem statement.
 */
function displayProblem() {
    const problem = generateProblem();
    roastChannel.clear();
    roastChannel.appendLine("Here's a problem for you to solve:");
    roastChannel.appendLine(problem);
    roastChannel.show(true);
    return problem;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Create output channel for roasts
    roastChannel = vscode.window.createOutputChannel("Code Bully");

    // Display a problem at the start and store it
    const problem = displayProblem();

    // Function to roast the active editor's content and schedule bug introduction
    const roastActiveEditor = async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const text = editor.document.getText();
        if (!text) return;

        try {
            const roastMessage = await roastUserCode(text, problem); // Pass the problem to the AI
            roastChannel.clear();
            roastChannel.appendLine(roastMessage);
            roastChannel.show(true);

            // Stop any ongoing speech before starting a new one
            if (isSpeaking) {
                say.stop();
            }

            isSpeaking = true;
            say.speak(roastMessage, 'Alex', 1.2, () => {
                isSpeaking = false; // Mark speech as finished
            });

            // Schedule bug introduction 5 seconds after the roast
            setTimeout(() => {
                introduceBugsToEditor();
            }, 5000);
        } catch (error) {
            console.error(error);
        }
    };

    // Trigger a roast and bug introduction every 30 seconds
    const interval = setInterval(roastActiveEditor, 30000);

    context.subscriptions.push(
        { dispose: () => clearInterval(interval) }
    );
}

// This method is called when your extension is deactivated
function deactivate() {
    if (roastChannel) {
        roastChannel.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
