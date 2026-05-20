// js/perfil-usuario.js

// Pega elementos da página
const nomeUsuarioSpan = document.getElementById('nomeUsuario');
const emailUsuarioSpan = document.getElementById('emailUsuario');
const dataCadastroSpan = document.getElementById('dataCadastro');
const codigoConviteSpan = document.getElementById('codigoConvite');
const avatarUsuarioDiv = document.getElementById('avatarUsuario');
const pontosTotaisSpan = document.getElementById('pontosTotais');
const btnSacar = document.getElementById('btnSacar');
const btnSair = document.getElementById('btnSair');
const tabelaHistoricoTbody = document.getElementById('tabelaHistorico').querySelector('tbody');
const semDadosDiv = document.getElementById('semDados');

// Dados simulados de histórico
const historicoTransacoes = [
    {
        data: "15/05/2024",
        tipo: "ganho",
        valor: "+50 pontos",
        descricao: "Assistiu 10 minutos de drama"
    },
    {
        data: "14/05/2024",
        tipo: "ganho",
        valor: "+100 pontos",
        descricao: "Bônus de cadastro"
    },
    {
        data: "13/05/2024",
        tipo: "ganho",
        valor: "+10 pontos",
        descricao: "Check-in diário"
    }
];

// Função para carregar dados do usuário
function carregarDadosUsuario() {
    // Pega dados do localStorage
    const nomeUsuario = localStorage.getItem('usuarioLogado');
    const emailUsuario = localStorage.getItem('usuarioEmail');
    const pontosUsuario = localStorage.getItem('pontosUsuario') || '0';
    const dataCadastro = localStorage.getItem('dataCadastro') || formatarData(new Date());

    // Se não houver usuário logado, redireciona para login
    if (!nomeUsuario) {
        window.location.href = 'login.html';
        return;
    }

    // Atualiza dados na tela
    nomeUsuarioSpan.textContent = nomeUsuario;
    emailUsuarioSpan.textContent = emailUsuario;
    dataCadastroSpan.textContent = dataCadastro;
    pontosTotaisSpan.textContent = `${pontosUsuario} pontos`;
    avatarUsuarioDiv.textContent = nomeUsuario.charAt(0).toUpperCase(); // Primeira letra do nome

    // Gera código de convite único (baseado no email)
    const codigoConvite = gerarCodigoConvite(emailUsuario);
    codigoConviteSpan.textContent = codigoConvite;
    localStorage.setItem('codigoConvite', codigoConvite);

    // Salva data de cadastro se não existir
    if (!localStorage.getItem('dataCadastro')) {
        localStorage.setItem('dataCadastro', dataCadastro);
    }
}

// Função para formatar data
function formatarData(data) {
    return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
}

// Função para gerar código de convite
function gerarCodigoConvite(email) {
    const parteEmail = email.split('@')[0].toUpperCase();
    const numeros = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    return `DRAMA-${parteEmail.substring(0, 3)}-${numeros}`;
}

// Função para carregar histórico de transações
function carregarHistorico() {
    if (historicoTransacoes.length === 0) {
        semDadosDiv.style.display = 'block';
        return;
    }

    // Limpa tabela atual
    tabelaHistoricoTbody.innerHTML = '';

    // Adiciona cada transação na tabela
    historicoTransacoes.forEach(transacao => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${transacao.data}</td>
            <td><span class="${transacao.tipo === 'ganho' ? 'tipo-ganho' : 'tipo-saque'}">${transacao.tipo === 'ganho' ? 'Ganho' : 'Saque'}</span></td>
            <td>${transacao.valor}</td>
            <td>${transacao.descricao}</td>
        `;
        tabelaHistoricoTbody.appendChild(linha);
    });
}

// Função para solicitar saque
function solicitarSaque() {
    const pontosUsuario = parseInt(localStorage.getItem('pontosUsuario') || '0');
    const valorMinimoSaque = 100; // Pontos mínimos para sacar

    if (pontosUsuario < valorMinimoSaque) {
        alert(`Você precisa ter pelo menos ${valorMinimoSaque} pontos para solicitar saque!`);
        return;
    }

    if (confirm(`Deseja solicitar saque de ${pontosUsuario} pontos?\nOs pontos serão convertidos em dinheiro e enviados para sua chave PIX/PayPal.`)) {
        alert('Solicitação de saque enviada! Você receberá o pagamento em até 3 dias úteis.');
        
        // Limpa pontos do usuário (simula saque)
        localStorage.setItem('pontosUsuario', '0');
        pontosTotaisSpan.textContent = '0 pontos';

        // Atualiza histórico
        historicoTransacoes.unshift({
            data: formatarData(new Date()),
            tipo: "saque",
            valor: `-${pontosUsuario} pontos`,
            descricao: "Saque solicitado"
        });
        carregarHistorico();
    }
}

// Função para sair da conta
function sairDaConta() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        // Limpa dados do localStorage
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('usuarioEmail');
        localStorage.removeItem('pontosUsuario');
        localStorage.removeItem('bonusCadastroAplicado');
        
        // Redireciona para login
        window.location.href = 'login.html';
    }
}

// Adiciona ações aos botões
btnSacar.addEventListener('click', solicitarSaque);
btnSair.addEventListener('click', sairDaConta);

// Carrega dados ao abrir a página
window.onload = () => {
    carregarDadosUsuario();
    carregarHistorico();
};
