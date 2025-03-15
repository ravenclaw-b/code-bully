const OpenAI = require("openai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, '.env') }); // Load environment variables from .env file

const apiKey = process.env.API_KEY; // Load API key from .env

/**
 * Roasts the user's code using OpenAI
 * @param {string} code - The code to roast
 * @returns {Promise<string>} - A promise that resolves to the roast message
 */
async function roastUserCode(code) {
    // Check if API key is available
    if (!apiKey) {
        console.error("API key not found. Please add API_KEY to your .env file");
        return "I couldn't roast your code because my API key is missing. Add an API key to the .env file so I can properly insult your code.";
    }
    
    const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });
    
    try {
        // Limit code size to avoid API token limits
        const truncatedCode = code.length > 3000 ? code.substring(0, 3000) + "..." : code;
        
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: "You are a code assistant that roasts the user's code with brutal, no-holds-barred sarcasm. When you see mistakes, call out shoddy variable names, poor logic, and messy formatting with short, savage insults. Don’t sugarcoat anything—make the user feel exactly how terrible their code is. Avoid any pet names like 'honey' or 'sweety.' Be blunt, concise, and make every word count. Don't EVER repeat the user's code. Don't say 'you call this?'" },
                {
                    role: "user",
                    content: `This is the user's code: ${truncatedCode}`,
                },
            ],
        });
        
        const roastMessage = response.choices[0].message.content;
        console.log(roastMessage);
        return stripFormatting(roastMessage);
    } catch (error) {
        console.error("Error roasting code:", error);
        return `I couldn't roast your code. It's so bad even AI refuses to look at it. (Error: ${error.message})`;
    }
}

function stripFormatting(text) {
    return text.replace(/[\*\_]{1,2}|\[\^.*?\]\(.*?\)|\n/g, '').trim();
}

module.exports = { roastUserCode };