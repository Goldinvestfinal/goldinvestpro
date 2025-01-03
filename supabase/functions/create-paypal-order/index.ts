import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    // Get auth user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Get request body
    const { productId, amount } = await req.json()

    console.log('Creating PayPal order for:', { productId, amount, userId: user.id })

    // Get PayPal access token
    const auth = btoa(`${Deno.env.get('PAYPAL_CLIENT_ID')}:${Deno.env.get('PAYPAL_CLIENT_SECRET')}`)
    const tokenResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    const { access_token } = await tokenResponse.json()

    if (!access_token) {
      console.error('Failed to get PayPal access token')
      throw new Error('Failed to get PayPal access token')
    }

    // Create PayPal order
    const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount.toString(),
          },
          description: `Order for product ${productId}`,
        }],
        application_context: {
          return_url: `${req.headers.get('origin')}/shop`,
          cancel_url: `${req.headers.get('origin')}/shop`,
        },
      }),
    })

    const orderData = await orderResponse.json()
    console.log('PayPal order created:', orderData)

    if (!orderData.links || !Array.isArray(orderData.links)) {
      console.error('Invalid PayPal order response:', orderData)
      throw new Error('Invalid PayPal order response')
    }

    // Find the approval URL
    const approvalLink = orderData.links.find((link: any) => link.rel === 'approve')
    if (!approvalLink || !approvalLink.href) {
      console.error('No approval URL found in PayPal response:', orderData)
      throw new Error('No PayPal approval URL found')
    }

    return new Response(
      JSON.stringify({ orderUrl: approvalLink.href }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error creating PayPal order:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})