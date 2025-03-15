// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { roastUserCode } = require('./roast');

// Output channel for displaying roasts
let roastChannel;

/**
 * Introduces random bugs into the code.
 * @param {string} code - The original code.
 * @returns {string} - The code with bugs introduced.
 */
function introduceBugs(code) {
    const bugTypes = [
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
    ];

    for (let i = 0; i < 3; i++) {
        const randomBug = bugTypes[Math.floor(Math.random() * bugTypes.length)];
        code = randomBug(code);
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
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Create output channel for roasts
    roastChannel = vscode.window.createOutputChannel("Code Bully");

    // Function to roast the active editor's content and schedule bug introduction
    const roastActiveEditor = async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const text = editor.document.getText();
        if (!text) return;

        try {
            const roastMessage = await roastUserCode(text);
            roastChannel.clear();
            roastChannel.appendLine(roastMessage);
            roastChannel.show(true);

            // Schedule bug introduction 5 seconds after the roast
            setTimeout(() => {
                introduceBugsToEditor();
            }, 5000);
        } catch (error) {
            console.error(error);
        }
    };

    // Delay the first roast by 1 minute
    setTimeout(() => {
        roastActiveEditor();
    }, 60000);

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "code-bully" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('code-bully.helloWorld', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Code Bully!');
    });

    // Register the roast code command
    const roastDisposable = vscode.commands.registerCommand('code-bully.roastCode', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No code found to roast. Open a file first!');
            return;
        }

        // Get the selected text or the entire document
        const selection = editor.selection;
        const text = selection.isEmpty 
            ? editor.document.getText() 
            : editor.document.getText(selection);
        
        if (!text) {
            vscode.window.showErrorMessage('No code to roast. Select some code or make sure your file has content.');
            return;
        }

        // Show loading message
        vscode.window.setStatusBarMessage('Roasting your code...', 2000);
        
        try {
            // Call the roast function
            const roastMessage = await roastUserCode(text);
            
            // Display the roast in the output channel
            roastChannel.clear();
            roastChannel.appendLine(roastMessage);
            
            // Show the roast channel automatically - force focus to make sure user sees it
            roastChannel.show(true);
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage('Failed to roast your code: ' + error.message);
        }
    });

    // Trigger a roast when a file is opened
    const fileOpenDisposable = vscode.workspace.onDidOpenTextDocument(() => {
        roastActiveEditor();
    });

    // Trigger a roast when the active editor changes
    const activeEditorChangeDisposable = vscode.window.onDidChangeActiveTextEditor(() => {
        roastActiveEditor();
    });

    // Trigger a roast every 30 seconds
    const interval = setInterval(roastActiveEditor, 30000);

    // Register command to show roast panel
    const showRoastDisposable = vscode.commands.registerCommand('code-bully.showRoast', function () {
        if (roastChannel) {
            roastChannel.show(true);
        }
    });

    context.subscriptions.push(
        disposable, 
        roastDisposable, 
        fileOpenDisposable, 
        activeEditorChangeDisposable, 
        showRoastDisposable, 
        roastChannel
    );

    // Clear the interval when the extension is deactivated
    context.subscriptions.push({ dispose: () => clearInterval(interval) });
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
}