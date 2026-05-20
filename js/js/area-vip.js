// js/area-vip.js

// Pega elementos da página
const statusVipSpan = document.getElementById('statusVip');
const btnAssinar = document.getElementById('btnAssinar');
const mensagemDiv = document.getElementById('mensagem');

// Função para carregar status VIP do usuário
function carregarStatusVip() {
    const statusVip = localStorage.getItem('statusVip') || 'Plano Gratuito';
    
    // Atualiza status na tela
    statusVipSpan.textContent = statusVip;

    // Se já for VIP, desativa o botão de assinar
    if (statusVip !== 'Plano Gratuito') {
        btnAssinar.textContent = `Você é ${statusVip}!`;
        btnAssinar.classList.add('ativo');
        btnAssinar.disabled = true;
    }
}

// Função para mostrar mensagem de confirmação
function mostrarMensagem(texto) {
    mensagemDiv.textContent = texto;
    mensagemDiv.style.display = 'block';
    
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 5000);
}

// Função para selecionar e ativar plano VIP
function selecionarPlano(tipoPlano) {
    let nomePlano, mensagem;

    switch(tipoPlano) {
        case 'mensal':
            nomePlano = 'VIP Mensal';
            mensagem = 'Parabéns! Você assinou o Plano VIP Mensal e já pode aproveitar todos os benefícios!';
            break;
        case 'trimestral':
            nomePlano = 'VIP Trimestral';
            mensagem = 'Parabéns! Você assinou o Plano VIP Trimestral e já pode aproveitar todos os benefícios!';
            break;
        case 'anual':
            nomePlano = 'VIP Anual';
            mensagem = 'Parabéns! Você assinou o Plano VIP Anual e já pode aproveitar todos os benefícios!';
            break;
        default:
            return;
    }

    // Simula assinatura e salva status no localStorage
    localStorage.setItem('statusVip', nomePlano);
    
    // Atualiza tela
    carregarStatusVip();
    mostrarMensagem(mensagem);

    // Simula aumento de pontos bônus para VIP
    const pontosAtuais = parseInt(localStorage.getItem('pontosUsuario') || '0');
    const pontosBonus = tipoPlano === 'anual' ? 500 : tipoPlano === 'trimestral' ? 300 : 100;
    const novosPontos = pontosAtuais + pontosBonus;

    localStorage.setItem('pontosUsuario', novosPontos.toString());
    mostrarMensagem(`Você também ganhou ${pontosBonus} pontos de bônus VIP! Total: ${novosPontos} pontos`);
}

// Carrega dados ao abrir a página
window.onload = () => {
    // Verifica se usuário está logado
    if (!localStorage.getItem('usuarioLogado')) {
        window.location.href = 'login.html';
        return;
    }

    carregarStatusVip();
};
