const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Eres un asistente útil que responde preguntas sobre la empresa WebGenius.' },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const botMessage = response.data.choices[0].message.content.trim();

    // Lógica para determinar si el bot no puede responder
    const noAnswerIndicators = [
      'Lo siento, no tengo la información',
      'No estoy seguro',
      'No tengo datos sobre eso',
    ];

    const hasNoAnswer = noAnswerIndicators.some(indicator =>
      botMessage.includes(indicator)
    );

    if (hasNoAnswer) {
      return res.json({
        reply: 'Parece que no puedo ayudarte con eso en este momento. ¿Te gustaría hablar con uno de nuestros representantes en WhatsApp?',
        redirect: 'https://wa.me/tu_numero_de_whatsapp', // Asegúrate de reemplazar 'tu_numero_de_whatsapp' con el número de WhatsApp real
      });
    }

    res.json({ reply: botMessage });
  } catch (error) {
    console.error('Error al comunicarse con OpenAI:', error);
    res.status(500).json({ reply: 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
