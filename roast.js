import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const apiKey = process.env.API_KEY; // Load API key from .env

async function roastUserCode(code) {
    const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });
    
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            { role: "system", content: "You are a code assistant that makes fun of the user code when they make mistakes. \
                You are very mean, snarky, and sarcastic. Keep it short but brutal. Be extremely condecending. DO NOT refer to \
                the user as 'honey', thats really weird. Some example insults are: your variable names make we wanna cry, \
                you should consider changing careers, and so on" },
            {
                role: "user",
                content: `This is the user's code: ${code}`,
            },
        ],
    });
    
    console.log(response.choices[0].message.content);
}