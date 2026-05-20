// js/login.js

// Pega elementos da página
const formLogin = document.getElementById('formLogin');
const mensagemDiv = document.getElementById('mensagem');
const btnMostrarSenha = document.getElementById('btnMostrarSenha');
const campoSenha = document.getElementById('senha');

// Função para mostrar mensagens
function mostrarMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.style.display = 'block';

    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 5000);
}

// Função para mostrar/ocultar senha
btnMostrarSenha.addEventListener('click', () => {
    const tipoAtual = campoSenha.type;
    campoSenha.type = tipoAtual === 'password' ? 'text' : 'password';
    btnMostrarSenha.textContent = tipoAtual === 'password' ? '🙈' : '👁️';
});

// Função para validar dados de login
function validarLogin(email, senha) {
    // Valida formato de email
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(email)) {
        mostrarMensagem('Email inválido!', 'erro');
        return false;
    }

    // Valida se senha não está vazia (depois podemos adicionar mais regras)
    if (senha.length < 1) {
        mostrarMensagem('Digite sua senha!', 'erro');
        return false;
    }

    return true;
}

// Ação ao enviar o formulário
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    // Pega valores dos campos
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Valida dados
    if (validarLogin(email, senha)) {
        // Simulação de login (depois conectaremos ao banco)
        console.log('Tentativa de login:', { email });

        // Verifica se o usuário já está cadastrado (usando dados do localStorage do cadastro)
        const usuarioCadastradoEmail = localStorage.getItem('usuarioEmail');
        const usuarioCadastradoNome = localStorage.getItem('usuarioLogado');

        if (usuarioCadastradoEmail === email) {
            // Login bem-sucedido
            mostrarMensagem(`Bem-vindo de volta, ${usuarioCadastradoNome}! 🎬`, 'sucesso');
            setTimeout(() => {
                // Redireciona para a página inicial (menu principal)
                window.location.href = 'index.html';
            }, 2000);
        } else {
            // Usuário não encontrado
            mostrarMensagem('Email ou senha incorretos!', 'erro');
        }
    }
});

// Ação para login com redes sociais (simulado)
document.querySelectorAll('.btn-redes').forEach(btn => {
    btn.addEventListener('click', () => {
        const rede = btn.textContent.trim();
        mostrarMensagem(`Redirecionando para login com ${rede}...`, 'sucesso');
        // Depois conectaremos com as APIs das redes (Google, GitHub, etc.)
    });
});
