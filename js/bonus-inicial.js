// js/bonus-inicial.js

// Pega elementos da página
const nomeUsuarioSpan = document.getElementById('nomeUsuario');
const bonusCadastroSpan = document.getElementById('bonusCadastro');
const mensagemDiv = document.getElementById('mensagem');

// Função para mostrar mensagem de bônus recebido
function mostrarMensagemBonus(texto) {
    mensagemDiv.textContent = texto;
    mensagemDiv.style.display = 'block';
    
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 6000);
}

// Função para carregar dados do usuário e aplicar bônus inicial
function carregarDadosUsuario() {
    // Pega nome do usuário do localStorage
    const nomeUsuario = localStorage.getItem('usuarioLogado');
    
    if (nomeUsuario) {
        // Mostra nome do usuário
        nomeUsuarioSpan.textContent = nomeUsuario;

        // Verifica se o bônus de cadastro já foi aplicado
        const bonusAplicado = localStorage.getItem('bonusCadastroAplicado');
        
        if (!bonusAplicado) {
            // Aplica 100 pontos de bônus de cadastro
            const pontosAtuais = parseInt(localStorage.getItem('pontosUsuario') || '0');
            const novosPontos = pontosAtuais + 100;
            
            // Salva novos pontos no localStorage
            localStorage.setItem('pontosUsuario', novosPontos.toString());
            localStorage.setItem('bonusCadastroAplicado', 'true');
            
            // Atualiza a tela
            bonusCadastroSpan.textContent = `${novosPontos} pontos (100 bonus adicionados!)`;
            mostrarMensagemBonus(`Parabéns! Você recebeu 100 pontos de bônus de cadastro! Total: ${novosPontos} pontos`);
        } else {
            // Mostra pontos já existentes
            const pontosAtuais = localStorage.getItem('pontosUsuario') || '0';
            bonusCadastroSpan.textContent = `${pontosAtuais} pontos`;
        }
    } else {
        // Se não houver usuário logado, redireciona para login
        window.location.href = 'login.html';
    }
}

// Carrega dados quando a página abrir
window.onload = carregarDadosUsuario;
