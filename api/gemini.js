import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  // 2. Coger la clave de API de las variables de entorno (el lugar seguro)
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Falta la clave de API de Gemini en las variables de entorno.");
    return res.status(500).json({ error: "Error de configuración del servidor: falta la clave API." });
  }

  // 3. Coger el prompt del usuario desde la petición
  const userPrompt = req.body.prompt;
  if (!userPrompt) {
    return res.status(400).json({ error: 'Falta el "prompt" en el cuerpo de la petición.' });
  }

  try {
    // 4. Inicializar y llamar a la API de Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Usamos el mismo modelo que tenías

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    // 5. Devolver la respuesta de Gemini al navegador
    res.status(200).json({ result: text });

  } catch (error) {
    console.error("Error al llamar a la API de Gemini:", error);
    res.status(500).json({ error: 'Error al generar la respuesta de la IA.' });
  }
}