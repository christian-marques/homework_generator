const routes = {
    '/': 'index.html',
    '/sobre': 'sobre.html',
    '/contato': 'contato.html'
};

// Função para carregar uma página com base na rota
function navigateTo(path) {
    const contentDiv = document.getElementById('content');
    const url = routes[path] || routes['/']; // Carrega a página ou a página inicial por padrão

    fetch(url)
        .then(response => response.text())
        .then(html => {
            contentDiv.innerHTML = html; // Atualiza o conteúdo da página
        })
        .catch(err => {
            console.error('Erro ao carregar página:', err);
        });
}

// Listener para links de navegação
document.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        const path = this.getAttribute('href');
        window.history.pushState({}, '', path); // Atualiza a URL no navegador sem recarregar a página
        navigateTo(path); // Carrega o conteúdo da página
    });
});

// Lida com navegação no histórico do navegador
window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname);
});

// Carrega a rota inicial
document.addEventListener('DOMContentLoaded', () => {
    navigateTo(window.location.pathname);
});
