// api/generate.js
// Endpoint serverless de Vercel. Usa Groq (gratis) en vez de Claude/Gemini.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt" });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Falta configurar GROQ_API_KEY en las variables de entorno" });
  }

  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorBody = await groqResponse.text();
      console.error("Error de Groq:", errorBody);
      return res.status(groqResponse.status).json({ error: "Error llamando a Groq" });
    }

    const data = await groqResponse.json();
    const textoGenerado = data?.choices?.[0]?.message?.content || "";

    return res.status(200).json({
      content: [{ type: "text", text: textoGenerado }],
    });
  } catch (err) {
    console.error("Error en /api/generate:", err);
    return res.status(500).json({ error: "Error interno generando la marca" });
  }
}