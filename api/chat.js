module.exports = async function handler(req, res) {
    try {
        const { message } = req.body || {}; // fallback to empty object

        if (!message) {
            return res.status(400).json({ reply: "No message provided." });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a portfolio AI assistant" },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

        res.status(200).json({ reply });
    } catch (error) {
        console.error("Error in /api/chat:", error);
        res.status(500).json({ reply: "Internal server error." });
    }
};
