import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const GOLDAPI_KEY = Deno.env.get('GOLDAPI_KEY')
    if (!GOLDAPI_KEY) {
      console.error('GOLDAPI_KEY is not set')
      throw new Error('GOLDAPI_KEY is not set')
    }

    console.log('Fetching gold price statistics...')
    const response = await fetch('https://www.goldapi.io/api/stat', {
      headers: {
        'x-access-token': GOLDAPI_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`Gold API responded with status: ${response.status}`)
      throw new Error(`Gold API responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Successfully fetched gold price statistics')

    // Transform the data into the expected format
    const transformedData = {
      timestamps: data.timestamps || [],
      prices_eur: data.prices_eur || [],
    }

    return new Response(JSON.stringify(transformedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching gold price statistics:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})