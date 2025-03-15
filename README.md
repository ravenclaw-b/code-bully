# Code Bully - VS Code Extension

This extension provides snarky, sarcastic comments about your code. When you're feeling brave enough for some brutal feedback, Code Bully will happily point out the flaws in your code.

## Features

- **Roast My Code**: Get hilariously mean feedback about your selected code or the entire file
- **Automatic Roasting**: Your code gets roasted whenever you run or debug it
- **Works with Code Runner**: Also roasts your code when using the popular Code Runner extension
- Simple API that connects to OpenAI to generate roasts

## Requirements

- Valid API key in the `.env` file for OpenAI/Gemini API

## How to Use

1. Manual Roasting:
   - Open a code file or select some code
   - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac)
   - Type "Roast My Code" and select the command

2. Automatic Roasting:
   - Simply run or debug your code (press F5 or use the Run menu)
   - Or use Code Runner extension to run your code
   - The extension will automatically roast your active file

3. Brace yourself for some harsh (but funny) criticism!

## Extension Settings

No specific settings yet.

## Known Issues

- Requires internet connection
- API key must be valid
- Large amounts of code may be truncated due to API token limits

## Testing

Run tests with:
```
npm test
```

## Release Notes

### 0.1.0

Initial release of Code Bully:
- Hello World command
- Roast My Code command
- Automatic roasting when running code
- AI-powered code roasting

---

## Working with the Code

- Run `npm install` to install dependencies
- Make sure `.env` file contains a valid API key
- Press `F5` to start debugging in a new VS Code window

**Enjoy being insulted by your IDE!**
