// js/cadastro.js

// Pega o formulário e a área de mensagem
const formCadastro = document.getElementById('formCadastro');
const mensagemDiv = document.getElementById('mensagem');

// Função para mostrar mensagens na tela
function mostrarMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.style.display = 'block';
    
    // Esconde a mensagem após 5 segundos
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 5000);
}

// Função para validar o formulário
function validarFormulario(nome, email, senha, confirmarSenha, aceitaTermos) {
    // Verifica se o nome tem pelo menos 3 caracteres
    if (nome.length < 3) {
        mostrarMensagem('Nome precisa ter pelo menos 3 caracteres!', 'erro');
        return false;
    }

    // Verifica se o email tem formato válido
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(email)) {
        mostrarMensagem('Email inválido!', 'erro');
        return false;
    }

    // Verifica se a senha tem pelo menos 6 caracteres
    if (senha.length < 6) {
        mostrarMensagem('Senha precisa ter pelo menos 6 caracteres!', 'erro');
        return false;
    }

    // Verifica se as senhas batem
    if (senha !== confirmarSenha) {
        mostrarMensagem('Senhas não conferem!', 'erro');
        return false;
    }

    // Verifica se aceitou os termos
    if (!aceitaTermos) {
        mostrarMensagem('Você precisa aceitar os termos de uso!', 'erro');
        return false;
    }

    return true;
}

// Ação quando o formulário for enviado
formCadastro.addEventListener('submit', (e) => {
    // Impede que a página recarregue
    e.preventDefault();

    // Pega os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const codigoConvite = document.getElementById('codigoConvite').value;
    const aceitaTermos = document.getElementById('aceitaTermos').checked;

    // Valida os dados
    if (validarFormulario(nome, email, senha, confirmarSenha, aceitaTermos)) {
        // Simula o cadastro (depois vamos conectar ao banco)
        console.log('Dados do cadastro:', { nome, email, codigoConvite });

        // Salva o usuário no armazenamento local (para teste)
        localStorage.setItem('usuarioLogado', nome);
        localStorage.setItem('usuarioEmail', email);

        // Mostra mensagem de sucesso e redireciona para o bônus inicial
        mostrarMensagem('Cadastro feito com sucesso! Você ganhou 100 pontos de bônus!', 'sucesso');
        setTimeout(() => {
            window.location.href = 'bonus-inicial.html';
        }, 3000);
    }
});
