import fetch from 'node-fetch';

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const sendMessage = async (req, res) => {
  try {
    const { userMessage, conversationHistory = [] } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    
    if (!GROQ_API_KEY) {
      console.error("GROQ_API_KEY not found in environment variables");
      return res.status(500).json({ error: "API configuration error" });
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: "You are ThinkAuto AI, a helpful and intelligent IT helpdesk assistant for ThinkAuto company. You help employees with technical issues, software problems, hardware troubleshooting, network connectivity, access requests, and general IT queries. Be concise, professional, and helpful. Keep responses under 200 words. If you can't solve an issue directly, suggest creating a support ticket."
          },
          ...conversationHistory,
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", response.status, errorData);
      return res.status(response.status).json({ 
        error: errorData.error?.message || "Failed to get AI response" 
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    res.json({ 
      response: aiResponse,
      usage: data.usage 
    });

  } catch (error) {
    console.error("Chat controller error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
