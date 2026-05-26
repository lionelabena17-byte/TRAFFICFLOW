let supabase = null

window.addEventListener('DOMContentLoaded', () => {
    if(window.supabase) {
        supabase = window.supabase.createClient(
            'https://ctntssmflnwfbqykpxau.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bnRzc21mbG53ZmJxeWtweFhhdSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzExOTUyNDAwLCJleHAiOjE5NDcyODI0MDB9.fake'
        )
    }
})

async function signup(email, password, nom) {
    if(!supabase) return { error: { message: 'Erreur connexion' } }
    return await supabase.auth.signUp({ email, password, options: { data: { nom } } })
}

async function login(email, password) {
    if(!supabase) return { error: { message: 'Erreur connexion' } }
    return await supabase.auth.signInWithPassword({ email, password })
}

async function logout() {
    if(supabase) await supabase.auth.signOut()
    window.location.href = 'connexion.html'
}

async function getCurrentUser() {
    if(!supabase) return null
    const { data } = await supabase.auth.getUser()
    return data.user
}

function protectRoute() {
    if(!supabase) return
    supabase.auth.getUser().then(({ data }) => {
        if(!data.user) window.location.href = 'connexion.html'
    })
}