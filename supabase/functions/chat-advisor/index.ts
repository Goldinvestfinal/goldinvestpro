import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the request body
    const { message } = await req.json()

    // Create OpenAI configuration
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    const openai = new OpenAIApi(configuration)

    // Create chat completion
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You are a knowledgeable gold investment advisor. Provide clear, concise advice about gold investments, market trends, and best practices. Keep responses focused on gold-related topics."
        },
        {
          "role": "user",
          "content": message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    // Get the response
    const reply = completion.data.choices[0].message?.content || "I apologize, but I couldn't generate a response. Please try again."

    // Return the response
    return new Response(
      JSON.stringify({ reply }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})