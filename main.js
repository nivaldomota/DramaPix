// js/main.js
console.log("DramaPix - Menu Principal Carregado!");

// Função para mostrar mensagem de boas-vindas se usuário estiver logado
function verificarUsuarioLogado() {
    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) {
        alert(`Bem-vindo de volta, ${usuario}! 🎬`);
    }
}

// Chama a função quando a página carregar
window.onload = verificarUsuarioLogado;
