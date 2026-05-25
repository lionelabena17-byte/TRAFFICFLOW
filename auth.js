const supabaseUrl = 'https://ctntssmflnwfbqykpxau.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bnRzc21mbG53ZmJxeWtweFhhdSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzExOTUyNDAwLCJleHAiOjE5NDcyODI0MDB9.fake_key_example'

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

async function signup(email, password, nom) {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nom } } })
    return { data, error }
}

async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
}

async function logout() {
    await supabase.auth.signOut()
    window.location.href = 'connexion.html'
}

async function getCurrentUser() {
    const { data } = await supabase.auth.getUser()
    return data.user
}

function protectRoute() {
    supabase.auth.getUser().then(({ data }) => {
        if(!data.user) window.location.href = 'connexion.html'
    })
}