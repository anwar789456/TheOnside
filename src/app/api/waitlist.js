import { supabaseAdmin } from '../lib/supabase'


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, firstName, provider } = req.body

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email and first name are required' })
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing email:', checkError)
      return res.status(500).json({ error: 'Database error occurred' })
    }

    if (existingUser) {
      return res.status(409).json({ error: 'This email is already on the waitlist' })
    }

    // Insert new user
    const { data, error: insertError } = await supabaseAdmin
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          first_name: firstName,
          provider: provider,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (insertError) {
      console.error('Error inserting user:', insertError)
      return res.status(500).json({ error: 'Failed to join waitlist' })
    }

    res.status(200).json({
      success: true,
      message: 'Successfully joined waitlist'
    })

  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}