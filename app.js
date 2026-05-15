const SUPABASE_URL = 'https://fqbofwpgbdqlpllxfsfy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Y-GRBXUOylnUJKJGuaBNFg_emwtwKi1';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const status = document.getElementById('authStatus');

  if (!email || !password) {
    status.textContent = 'Preencha e-mail e senha.';
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  status.textContent = error
    ? 'Erro no cadastro: ' + error.message
    : 'Cadastro enviado. Verifique seu e-mail.';
}

async function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const status = document.getElementById('authStatus');

  if (!email || !password) {
    status.textContent = 'Preencha e-mail e senha.';
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  status.textContent = error
    ? 'Erro no login: ' + error.message
    : 'Login realizado com sucesso.';
}
