exports.handler = async function(event, context) {
    if(event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }

    const { question } = JSON.parse(event.body)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 300,
            system: "Tu es FLOW, assistant IA trafic de Douala. Tu connais Akwa, Bonanjo, Deido, Ndokotti, Bessengue, Logbassa, Bonapriso, Makepe. Reponds en francais, max 3 phrases courtes et pratiques.",
            messages: [{ role: 'user', content: question }]
        })
    })

    const data = await response.json()

    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ reponse: data.content[0].text })
    }
}