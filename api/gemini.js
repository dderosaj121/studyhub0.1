// api/gemini.js (VERSIÓN DE PRUEBA SIMPLIFICADA)
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Falta la clave API en las variables de entorno de Vercel." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Usamos un prompt fijo y simple para la prueba
    const promptDePrueba = "Hola, di 'funciona'"; 
    
    const result = await model.generateContent(promptDePrueba);
    const response = await result.response;
    const text = response.text();

    // Si llega aquí, todo ha ido bien.
    res.status(200).json({ result: `La IA respondió: ${text}` });

  } catch (error) {
    console.error("ERROR REAL EN EL SERVIDOR:", error);
    res.status(500).json({ error: 'La función de la IA falló en el servidor.', details: error.message });
  }
}