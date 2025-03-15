# Code Bully - VS Code Extension

This extension provides snarky, sarcastic comments about your code. When you're feeling brave enough for some brutal feedback, Code Bully will happily point out the flaws in your code.

## Features

- **Problem Generator**: At the start, the extension gives you a simple coding problem to solve.
- **Roast My Code**: Get hilariously mean feedback about your selected code or the entire file.
- **Automatic Roasting**: Your code gets roasted every 30 seconds.
- **Bug Injection**: After roasting, the extension introduces two random bugs into your code.
- **Text-to-Speech**: The roast is read aloud for maximum impact.

## Requirements

- Valid API key in the `.env` file for OpenAI/Gemini API.

## How to Use

1. **Problem Generator**:
   - When the extension starts, it will display a simple coding problem in the output channel.
   - Use this problem as a challenge to improve your coding skills.

2. **Manual Roasting**:
   - Open a code file or select some code.
   - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
   - Type "Roast My Code" and select the command.

3. **Automatic Roasting**:
   - The extension will roast your active file every 30 seconds.

4. **Bug Injection**:
   - After each roast, two random bugs will be introduced into your code.

5. **Text-to-Speech**:
   - The roast will be read aloud using your system's default voice.

6. **Brace yourself for some harsh (but funny) criticism!**

## Extension Settings

No specific settings yet.

## Known Issues

- Requires internet connection.
- API key must be valid.
- Large amounts of code may be truncated due to API token limits.

## Testing

Run tests with:
```
npm test
```

## Release Notes

### 0.1.0

Initial release of Code Bully:
- Problem generator.
- Hello World command.
- Roast My Code command.
- Automatic roasting every 30 seconds.
- AI-powered code roasting.
- Bug injection after roasting.
- Text-to-speech for roasts.

---

## Working with the Code

- Run `npm install` to install dependencies.
- Make sure `.env` file contains a valid API key.
- Press `F5` to start debugging in a new VS Code window.

**Enjoy being insulted by your IDE!**
