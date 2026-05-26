let supabaseClient = null

if(window.supabase) {
    supabaseClient = window.supabase.createClient(
        'https://ctntssmflnwfbqykpxau.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bnRzc21mbG53ZmJxeWtweFhhdSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzExOTUyNDAwLCJleHAiOjE5NDcyODI0MDB9.fake'
    )
}

async function signup(email, password, nom) {
    if(!supabaseClient) return { error: { message: 'Erreur connexion' } }
    return await supabaseClient.auth.signUp({ email, password, options: { data: { nom } } })
}

async function login(email, password) {
    if(!supabaseClient) return { error: { message: 'Erreur connexion' } }
    return await supabaseClient.auth.signInWithPassword({ email, password })
}

function protectRoute() {
    if(!supabaseClient) return
    supabaseClient.auth.getUser().then(({ data }) => {
        if(!data.user) window.location.href = 'connexion.html'
    })
}