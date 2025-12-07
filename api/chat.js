export default async function handler(req, res) {
    const { message } = req.body;
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a portfolio AI assistant. Be friendly, helpful and explain things clearly." },
          { role: "user", content: message }
        ]
      })
    });
  
    const data = await response.json();
    const reply = data.choices[0].message.content;
  
    res.status(200).json({ reply });
  }
  