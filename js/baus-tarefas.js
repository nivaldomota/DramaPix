// js/baus-tarefas.js

// Pega elementos da página
const pontosAtualSpan = document.getElementById('pontosAtual');
const mensagemDiv = document.getElementById('mensagem');
const btnAbrirComum = document.getElementById('btnAbrirComum');
const listaTarefasDiv = document.getElementById('listaTarefas');
const tabsTarefa = document.querySelectorAll('.tab-tarefa');

// Banco de dados simulado de tarefas
const todasTarefas = {
    diarias: [
        {
            id: 1,
            titulo: "Fazer Check-in Diário",
            descricao: "Acesse o app e confirme sua presença",
            recompensa: "+10 pontos",
            concluida: true
        },
        {
            id: 2,
            titulo: "Assistir 1 Drama",
            descricao: "Assista pelo menos 10 minutos de um drama",
            recompensa: "+50 pontos",
            concluida: true
        },
        {
            id: 3,
            titulo: "Ver 1 Anúncio Recompensado",
            descricao: "Assista a um anúncio completo",
            recompensa: "+30 pontos",
            concluida: true
        },
        {
            id: 4,
            titulo: "Compartilhar o App",
            descricao: "Publique sobre o DramaPix em alguma rede",
            recompensa: "+40 pontos",
            concluida: false
        }
    ],
    semanais: [
        {
            id: 5,
            titulo: "Assistir 5 Dramas",
            descricao: "Complete 5 sessões de 10 minutos",
            recompensa: "+200 pontos",
            concluida: false
        },
        {
            id: 6,
            titulo: "Convidar 1 Amigo",
            descricao: "Envie seu código de convite para alguém",
            recompensa: "+150 pontos",
            concluida: false
        },
        {
            id: 7,
            titulo: "Fazer Check-in por 3 Dias",
            descricao: "Mantenha a sequência de check-ins",
            recompensa: "+80 pontos",
            concluida: true
        }
    ],
    especiais: [
        {
            id: 8,
            titulo: "Participar de Evento",
            descricao: "Jogue o evento semanal do DramaPix",
            recompensa: "+300 pontos + Baú Especial",
            concluida: false
        },
        {
            id: 9,
            titulo: "Ser Membro por 30 Dias",
            descricao: "Mantenha sua conta ativa por 1 mês",
            recompensa: "+500 pontos",
            concluida: false
        }
    ]
};

// Função para carregar pontos do usuário
function carregarPontos() {
    const pontos = localStorage.getItem('pontosUsuario') || '0';
    pontosAtualSpan.textContent = `${pontos} pontos`;
}

// Função para mostrar mensagem de recompensa
function mostrarMensagem(texto) {
    mensagemDiv.textContent = texto;
    mensagemDiv.style.display = 'block';
    
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 4000);
}

// Função para abrir baú comum
function abrirBauComum() {
    // Gera recompensa aleatória entre 50 e 100 pontos
    const recompensa = Math.floor(Math.random() * 51) + 50;
    const pontosAtuais = parseInt(localStorage.getItem('pontosUsuario') || '0');
    const novosPontos = pontosAtuais + recompensa;

    // Atualiza pontos
    localStorage.setItem('pontosUsuario', novosPontos.toString());
    carregarPontos();

    // Mostra mensagem
    mostrarMensagem(`Parabéns! Você abriu o Baú Comum e ganhou ${recompensa} pontos! Total: ${novosPontos} pontos`);

    // Desativa o botão e atualiza o card
    btnAbrirComum.disabled = true;
    btnAbrirComum.textContent = "Baú Aberto!";
}

// Função para mostrar tarefas por categoria
function mostrarTarefas(categoria) {
    // Atualiza estilo das tabs
    tabsTarefa.forEach(tab => {
        tab.classList.remove('ativo');
        if (tab.textContent.toLowerCase() === categoria) tab.classList.add('ativo');
    });

    // Limpa lista atual
    listaTarefasDiv.innerHTML = '';

    // Carrega tarefas da categoria selecionada
    todasTarefas[categoria].forEach(tarefa => {
        const item = document.createElement('div');
        item.className = 'item-tarefa';

        // Define classe do botão
        const btnClasse = tarefa.concluida ? 'btn-concluir concluido' : 'btn-concluir';
        const btnTexto = tarefa.concluida ? 'Concluída' : 'Concluir';

        item.innerHTML = `
            <div class="info-tarefa">
                <h4>${tarefa.titulo}</h4>
                <p>${tarefa.descricao}</p>
            </div>
            <div>
                <p class="recompensa-tarefa">${tarefa.recompensa}</p>
                <button class="${btnClasse}" data-id="${tarefa.id}" ${tarefa.concluida ? 'disabled' : ''}>${btnTexto}</button>
            </div>
        `;

        listaTarefasDiv.appendChild(item);
    });

    // Adiciona ação aos botões de concluir
    document.querySelectorAll('.btn-concluir:not(.concluido)').forEach(btn => {
        btn.addEventListener('click', concluirTarefa);
    });
}

// Função para concluir tarefa e ganhar pontos
function concluirTarefa(e) {
    const tarefaId = parseInt(e.target.getAttribute('data-id'));
    let tarefaConcluida;

    // Encontra a tarefa em todas as categorias
    for (const categoria in todasTarefas) {
        const tarefa = todasTarefas[categoria].find(t => t.id === tarefaId);
        if (tarefa) {
            tarefaConcluida = tarefa;
            tarefa.concluida = true;
            break;
        }
    }

    // Extrai pontos da recompensa
    const pontosGanho = parseInt(tarefaConcluida.recompensa.replace('+', '').replace(' pontos', '').replace(' + Baú Especial', ''));
    const pontosAtuais = parseInt(localStorage.getItem('pontosUsuario') || '0');
    const novosPontos = pontosAtuais + pontosGanho;

    // Atualiza pontos
    localStorage.setItem('pontosUsuario', novosPontos.toString());
    carregarPontos();

    // Mostra mensagem
    mostrarMensagem(`Tarefa concluída! Você ganhou ${pontosGanho} pontos! Total: ${novosPontos} pontos`);

    // Atualiza a lista de tarefas
    const categoriaAtiva = document.querySelector('.tab-tarefa.ativo').textContent.toLowerCase();
    mostrarTarefas(categoriaAtiva);
}

// Adiciona ação ao botão de abrir baú
btnAbrirComum.addEventListener('click', abrirBauComum);

// Carrega dados ao abrir a página
window.onload = () => {
    // Verifica se usuário está logado
    if (!localStorage.getItem('usuarioLogado')) {
        window.location.href = 'login.html';
        return;
    }

    carregarPontos();
    mostrarTarefas('diarias');
};
