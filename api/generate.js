// api/generate.js
// Endpoint serverless de Vercel. Usa Gemini (gratis) en vez de Claude.
// Devuelve la respuesta en el mismo formato que usaba Claude para que
// App.jsx no necesite ningún cambio.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Falta configurar GEMINI_API_KEY en las variables de entorno" });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Error de Gemini:", errorBody);
      return res.status(geminiResponse.status).json({ error: "Error llamando a Gemini" });
    }

    const data = await geminiResponse.json();

    // Extraemos el texto que generó Gemini
    const textoGenerado =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

    // Lo devolvemos con la MISMA forma que usaba Claude,
    // para que App.jsx (que espera data.content) no necesite cambios.
    return res.status(200).json({
      content: [
        {
          type: "text",
          text: textoGenerado,
        },
      ],
    });
  } catch (err) {
    console.error("Error en /api/generate:", err);
    return res.status(500).json({ error: "Error interno generando la marca" });
  }
}