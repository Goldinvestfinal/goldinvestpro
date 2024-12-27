import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    console.log('Fetching gold price from API...')
    const response = await fetch('https://www.goldapi.io/api/XAU/EUR', {
      headers: {
        'x-access-token': Deno.env.get('GOLDAPI_KEY') || '',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Gold API error:', response.status, response.statusText)
      throw new Error(`Gold API responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received gold price data:', data)

    // Transform the data to match our needs
    const goldData = {
      price: data.price,
      timestamp: Math.floor(Date.now() / 1000),
      currency: 'EUR'
    }

    return new Response(
      JSON.stringify(goldData),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching gold price:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})