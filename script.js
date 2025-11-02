// --- sistema unigran-20251018T011656Z-1-001/sistema unigran/pages/home/script.js (Lógica Simplificada) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica de Busca (Placeholder)
    function handleSearch(inputElement) {
        const query = inputElement.value.trim();
        if (query) {
            // Placeholder: A busca final será integrada com o módulo Uni IA.
            alert(`Iniciando busca por: "${query}". (Funcionalidade de busca completa migrará para o módulo Uni AI).`);
            inputElement.value = '';
        }
    }

    // Listener para a barra de pesquisa
    const searchInputCompact = document.getElementById('global-search-compact');
    if (searchInputCompact) {
        searchInputCompact.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(e.target);
                e.preventDefault();
            }
        });
    }
    
    // 2. Lógica de Ativação do Link (Visual)
    document.querySelectorAll('.main-tab-item').forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove a classe 'active' de todos os links
            document.querySelectorAll('.main-tab-item').forEach(l => l.classList.remove('active'));
            // Adiciona a classe 'active' no link clicado
            e.currentTarget.classList.add('active');
        });
    });

});