// js/convite-amigos.js

// Pega elementos da página
const codigoConviteSpan = document.getElementById('codigoConvite');
const btnCopiar = document.getElementById('btnCopiar');
const mensagemDiv = document.getElementById('mensagem');
const btnWhatsapp = document.getElementById('btnWhatsapp');
const listaAmigosDiv = document.getElementById('listaAmigos');
const semAmigosDiv = document.getElementById('semAmigos');

// Dados simulados de amigos convidados
const amigosConvidados = [
    {
        nome: "Maria Silva",
        dataCadastro: "10/05/2024",
        status: "ativo",
        pontosGanho: 200
    },
    {
        nome: "João Pedro",
        dataCadastro: "14/05/2024",
        status: "pendente",
        pontosGanho: 0
    }
];

// Função para carregar código de convite
function carregarCodigoConvite() {
    // Pega código do localStorage ou gera um novo
    let codigoConvite = localStorage.getItem('codigoConvite');
    
    if (!codigoConvite) {
        // Gera código se não existir
        const emailUsuario = localStorage.getItem('usuarioEmail');
        codigoConvite = gerarCodigoConvite(emailUsuario);
        localStorage.setItem('codigoConvite', codigoConvite);
    }

    // Atualiza código na tela
    codigoConviteSpan.textContent = codigoConvite;
}

// Função para gerar código de convite
function gerarCodigoConvite(email) {
    if (!email) return "DRAMA-NOVO-001";
    const parteEmail = email.split('@')[0].toUpperCase();
    const numeros = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    return `DRAMA-${parteEmail.substring(0, 3)}-${numeros}`;
}

// Função para copiar código para área de transferência
function copiarCodigo() {
    const codigo = codigoConviteSpan.textContent;
    navigator.clipboard.writeText(codigo)
        .then(() => {
            // Mostra mensagem de sucesso
            mensagemDiv.style.display = 'block';
            setTimeout(() => {
                mensagemDiv.style.display = 'none';
            }, 3000);
        })
        .catch(err => {
            alert('Erro ao copiar código: ' + err);
        });
}

// Função para compartilhar no WhatsApp
function compartilharWhatsapp() {
    const codigo = codigoConviteSpan.textContent;
    const nomeUsuario = localStorage.getItem('usuarioLogado') || 'um amigo';
    const mensagem = `Oi! Eu uso o DramaPix para assistir dramas e ganhar dinheiro! 🎬\nUse meu código de convite ${codigo} e ganhe 100 pontos de bônus extra!\nLink para cadastro: https://dramapix.com.br/cadastro`;
    
    // Cria link de compartilhamento do WhatsApp
    const linkWhatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsapp, '_blank');
}

// Função para carregar lista de amigos convidados
function carregarListaAmigos() {
    if (amigosConvidados.length === 0) {
        semAmigosDiv.style.display = 'block';
        return;
    }

    semAmigosDiv.style.display = 'none';
    listaAmigosDiv.innerHTML = '';

    // Adiciona cada amigo na lista
    amigosConvidados.forEach(amigo => {
        const item = document.createElement('div');
        item.className = 'amigo-item';
        
        const statusTexto = amigo.status === 'ativo' ? 'Amigo Ativo' : 'Aguardando Primeiro Saque';
        const statusClasse = amigo.status === 'ativo' ? 'status-ativo' : 'status-pendente';
        const pontosTexto = amigo.status === 'ativo' ? `Você ganhou ${amigo.pontosGanho} pontos` : 'Pontos a receber';

        item.innerHTML = `
            <div>
                <p style="font-weight: bold; margin: 0;">${amigo.nome}</p>
                <p style="font-size: 0.9rem; color: #666; margin: 0.3rem 0;">Cadastrado em: ${amigo.dataCadastro}</p>
                <p style="font-size: 0.9rem; color: #6A0DAD; margin: 0;">${pontosTexto}</p>
            </div>
            <span class="amigo-status ${statusClasse}">${statusTexto}</span>
        `;

        listaAmigosDiv.appendChild(item);
    });
}

// Adiciona ações aos botões
btnCopiar.addEventListener('click', copiarCodigo);
btnWhatsapp.addEventListener('click', compartilharWhatsapp);
document.querySelectorAll('.btn-rede').forEach(btn => {
    if (btn !== btnWhatsapp) {
        btn.addEventListener('click', () => {
            const rede = btn.textContent.trim().split(' ')[1];
            alert(`Compartilhamento via ${rede} em breve! Por enquanto, copie o código e compartilhe manualmente 😉`);
        });
    }
});

// Carrega dados ao abrir a página
window.onload = () => {
    // Verifica se usuário está logado
    if (!localStorage.getItem('usuarioLogado')) {
        window.location.href = 'login.html';
        return;
    }

    carregarCodigoConvite();
    carregarListaAmigos();
};
