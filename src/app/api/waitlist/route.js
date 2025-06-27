import { supabaseAdmin } from '../../lib/supabase'

export async function POST(request) {
  try {
    const { email, firstName, provider } = await request.json()

    // Validate required fields
    if (!email || !firstName) {
      return Response.json(
        { error: 'Email and first name are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new emails
      console.error('Error checking existing email:', checkError)
      return Response.json(
        { error: 'Database error occurred' },
        { status: 500 }
      )
    }

    if (existingUser) {
      return Response.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 } // Conflict status code
      )
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
      return Response.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      )
    }

    return Response.json({
      success: true,
      message: 'Successfully joined waitlist'
    })

  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
