require("dotenv").config();
const Groq = require("groq-sdk");

const AICall = async (prompt) => {
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
  });

  return chatCompletion;
};

module.exports = AICall;
