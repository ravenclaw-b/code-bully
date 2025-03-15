// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { roastUserCode } = require('./roast');

// Output channel for displaying roasts
let roastChannel;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Create output channel for roasts
    roastChannel = vscode.window.createOutputChannel("Code Bully");
    
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
    
    // Register command to show roast panel
    const showRoastDisposable = vscode.commands.registerCommand('code-bully.showRoast', function () {
        if (roastChannel) {
            roastChannel.show(true);
        }
    });

    context.subscriptions.push(
        disposable, 
        roastDisposable, 
        showRoastDisposable, 
        roastChannel
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
}