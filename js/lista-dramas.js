// js/lista-dramas.js

// Banco de dados simulado com dramas
const listaDramas = [
    {
        id: 1,
        titulo: "Coração de Vidro",
        genero: "romance",
        episodios: 16,
        imagem: "https://picsum.photos/seed/drama1/300/450",
        descricao: "História de amor entre dois jovens que superam barreiras sociais."
    },
    {
        id: 2,
        titulo: "Sombras do Passado",
        genero: "suspense",
        episodios: 20,
        imagem: "https://picsum.photos/seed/drama2/300/450",
        descricao: "Um detetive investiga um caso que envolve seu próprio passado."
    },
    {
        id: 3,
        titulo: "Guerra dos Clãs",
        genero: "acao",
        episodios: 18,
        imagem: "https://picsum.photos/seed/drama3/300/450",
        descricao: "Dois clãs rivais brigam pelo controle de um reino misterioso."
    },
    {
        id: 4,
        titulo: "Risos e Aventuras",
        genero: "comedia",
        episodios: 12,
        imagem: "https://picsum.photos/seed/drama4/300/450",
        descricao: "Um grupo de amigos vive situações hilárias em sua cidade."
    },
    {
        id: 5,
        titulo: "Amor Proibido",
        genero: "romance",
        episodios: 24,
        imagem: "https://picsum.photos/seed/drama5/300/450",
        descricao: "Amor entre filhos de famílias rivais em um pequeno vilarejo."
    },
    {
        id: 6,
        titulo: "Segredos Ocultos",
        genero: "suspense",
        episodios: 15,
        imagem: "https://picsum.photos/seed/drama6/300/450",
        descricao: "Uma pequena cidade guarda segredos que podem destruir todos."
    }
];

// Pega elementos da página
const listaDramasDiv = document.getElementById('listaDramas');
const pontosUsuarioSpan = document.getElementById('pontosUsuario');
const mensagemDiv = document.getElementById('mensagem');
const botoesFiltro = document.querySelectorAll('.btn-filtro');

// Função para mostrar mensagens
function mostrarMensagem(texto) {
    mensagemDiv.textContent = texto;
    mensagemDiv.style.display = 'block';
    
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 5000);
}

// Função para carregar pontos do usuário
function carregarPontosUsuario() {
    const pontos = localStorage.getItem('pontosUsuario') || '0';
    pontosUsuarioSpan.textContent = `${pontos} pontos`;
}

// Função para renderizar lista de dramas
function renderizarDramas(dramas) {
    listaDramasDiv.innerHTML = ''; // Limpa lista atual

    if (dramas.length === 0) {
        listaDramasDiv.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #666;">Nenhum drama encontrado para este gênero!</p>';
        return;
    }

    // Cria um card para cada drama
    dramas.forEach(drama => {
        const card = document.createElement('div');
        card.className = 'card-drama';
        card.innerHTML = `
            <img src="${drama.imagem}" alt="${drama.titulo}">
            <div class="info-drama">
                <h3>${drama.titulo}</h3>
                <p class="genero">${drama.genero.charAt(0).toUpperCase() + drama.genero.slice(1)}</p>
                <p class="episodios">${drama.episodios} episódios</p>
            </div>
        `;

        // Ação ao clicar no drama
        card.addEventListener('click', () => {
            iniciarVisualizacaoDrama(drama.id);
        });

        listaDramasDiv.appendChild(card);
    });
}

// Função para filtrar dramas por gênero
function filtrarDramas(genero) {
    // Atualiza estilo dos botões de filtro
    botoesFiltro.forEach(btn => {
        btn.classList.remove('ativo');
        if (btn.textContent.toLowerCase().includes(genero) || genero === 'todos') {
            if (genero === 'todos' && btn.textContent.includes('Todos')) btn.classList.add('ativo');
            else if (btn.textContent.toLowerCase().includes(genero)) btn.classList.add('ativo');
        }
    });

    // Filtra os dramas
    const dramasFiltrados = genero === 'todos' 
        ? listaDramas 
        : listaDramas.filter(drama => drama.genero === genero);

    // Renderiza lista filtrada
    renderizarDramas(dramasFiltrados);
}

// Função para iniciar visualização e contar pontos
function iniciarVisualizacaoDrama(dramaId) {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    if (!usuarioLogado) {
        mostrarMensagem('Faça login para assistir dramas e ganhar pontos!');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }

    // Simula início de visualização
    mostrarMensagem('Iniciando drama... Você ganhará pontos ao assistir!');

    // Simula tempo de visualização (10 minutos para ganhar 50 pontos)
    setTimeout(() => {
        const pontosAtuais = parseInt(localStorage.getItem('pontosUsuario') || '0');
        const novosPontos = pontosAtuais + 50;

        localStorage.setItem('pontosUsuario', novosPontos.toString());
        carregarPontosUsuario();
        mostrarMensagem(`Parabéns! Você assistiu 10 minutos e ganhou 50 pontos! Total: ${novosPontos} pontos`);

        // Redireciona para a tela de visualização (que criaremos depois)
        window.location.href = `visualizar-drama.html?id=${dramaId}`;
    }, 2000); // Simula 2 segundos (no futuro, substitua por tempo real)
}

// Carrega dados ao abrir a página
window.onload = () => {
    carregarPontosUsuario();
    renderizarDramas(listaDramas);
};
