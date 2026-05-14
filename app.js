let supabase;async function initSupabase() {
  const res = await fetch('/api/config');
  const config = await res.json();  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    document.getElementById('authStatus').textContent = 'Configure o Supabase no Render para ativar login.';
    return;
  }  supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
}async function signUp() {
  if (!supabase) return;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { error } = await supabase.auth.signUp({ email, password });
  document.getElementById('authStatus').textContent = error ? error.message : 'Cadastro enviado. Verifique seu e-mail.';
}async function signIn() {
  if (!supabase) return;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  document.getElementById('authStatus').textContent = error ? error.message : 'Login realizado com sucesso.';
}initSupabase();
