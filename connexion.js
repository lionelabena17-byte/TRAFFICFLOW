const supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY)

function switchTab(tab) {
    document.getElementById('form-connexion').style.display = tab === 'connexion' ? 'block' : 'none'
    document.getElementById('form-inscription').style.display = tab === 'inscription' ? 'block' : 'none'
    document.getElementById('tab-connexion').style.color = tab === 'connexion' ? '#1A0A00' : '#999'
    document.getElementById('tab-connexion').style.borderBottomColor = tab === 'connexion' ? '#C9A96E' : 'transparent'
    document.getElementById('tab-inscription').style.color = tab === 'inscription' ? '#1A0A00' : '#999'
    document.getElementById('tab-inscription').style.borderBottomColor = tab === 'inscription' ? '#C9A96E' : 'transparent'
}

function togglePassword(id) {
    const input = document.getElementById(id)
    input.type = input.type === 'password' ? 'text' : 'password'
}

function checkPasswordStrength(val) {
    const bar = document.getElementById('password-strength-bar')
    const text = document.getElementById('password-strength-text')
    if(val.length === 0) { bar.style.width = '0%'; text.textContent = ''; return }
    if(val.length < 6) { bar.style.width = '25%'; bar.style.background = '#A00000'; text.textContent = 'Faible'; text.style.color = '#A00000'; return }
    if(val.length < 10) { bar.style.width = '60%'; bar.style.background = '#8B6400'; text.textContent = 'Moyen'; text.style.color = '#8B6400'; return }
    bar.style.width = '100%'; bar.style.background = '#1A6640'; text.textContent = 'Fort'; text.style.color = '#1A6640'
}

async function seConnecter() {
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    let valid = true
    document.getElementById('error-login-email').textContent = ''
    document.getElementById('error-login-password').textContent = ''
    if(!email) { document.getElementById('error-login-email').textContent = 'Email requis'; valid = false }
    if(!password) { document.getElementById('error-login-password').textContent = 'Mot de passe requis'; valid = false }
    if(!valid) return

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if(error) {
            document.getElementById('error-login-email').textContent = 'Email ou mot de passe incorrect'
        } else {
            window.location.href = 'dashboard.html'
        }
    } catch(err) {
        document.getElementById('error-login-email').textContent = 'Connexion impossible. Verifiez internet.'
    }
}

async function sInscrire() {
    const nom = document.getElementById('reg-nom').value
    const email = document.getElementById('reg-email').value
    const password = document.getElementById('reg-password').value
    const region = document.getElementById('reg-region').value
    const consent = document.getElementById('consent').checked
    let valid = true
    document.getElementById('error-reg-nom').textContent = ''
    document.getElementById('error-reg-email').textContent = ''
    document.getElementById('error-reg-password').textContent = ''
    if(!nom) { document.getElementById('error-reg-nom').textContent = 'Nom requis'; valid = false }
    if(!email) { document.getElementById('error-reg-email').textContent = 'Email requis'; valid = false }
    if(password.length < 8) { document.getElementById('error-reg-password').textContent = 'Min. 8 caracteres'; valid = false }
    if(!consent) { alert('Veuillez accepter la politique de confidentialite'); valid = false }
    if(!valid) return

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { nom, region } }
        })
        if(error) {
            document.getElementById('error-reg-email').textContent = error.message
        } else {
            alert('Compte cree ! Verifiez votre email pour confirmer.')
            switchTab('connexion')
        }
    } catch(err) {
        document.getElementById('error-reg-email').textContent = 'Inscription impossible. Verifiez internet.'
    }
}

function showPrivacy() {
    document.getElementById('privacy-popup').style.display = 'flex'
}

function closePrivacy() {
    document.getElementById('privacy-popup').style.display = 'none'
}