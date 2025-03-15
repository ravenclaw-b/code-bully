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

1. **Clone the Repository**:
   - Clone this repository to your local machine:
     ```
     git clone https://github.com/ravineclaw/code-bully.git
     ```
   - Navigate to the project directory:
     ```
     cd code-bully
     ```

2. **Set Up the Environment**:
   - Create a `.env` file in the root directory and add your OpenAI API key:
     ```
     API_KEY=your_openai_api_key
     ```

3. **Install Dependencies**:
   - Run the following command to install the required dependencies:
     ```
     npm install
     ```

4. **Debug the Extension**:
   - Open the project in VS Code.
   - Press `F5` to start debugging the extension in a new VS Code window.

5. **Features**:
   - **Problem Generator**: When the extension starts, it will display a simple coding problem in the output channel.
   - **Manual Roasting**: Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac), type "Roast My Code," and select the command.
   - **Automatic Roasting**: The extension will roast your active file every 30 seconds.
   - **Bug Injection**: After each roast, two random bugs will be introduced into your code.
   - **Text-to-Speech**: The roast will be read aloud using your system's default voice.

6. **Brace yourself for some harsh (but funny) criticism!**

## Known Issues

- Requires internet connection.
- API key must be valid.
- Large amounts of code may be truncated due to API token limits.

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

- Clone the repository and set up the environment as described above.
- Press `F5` to start debugging in a new VS Code window.

**Enjoy being insulted by your IDE!**
