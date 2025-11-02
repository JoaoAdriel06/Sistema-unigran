// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const moduleGrid = document.getElementById('academy-module-grid');
    const contentWrapper = document.getElementById('module-content-wrapper');
    const backButtonContainer = document.getElementById('back-button-container');
    const backButton = document.getElementById('back-button');
    const moduleSection = document.querySelector('.crm-section'); // A seção que contém o grid

    // ATENÇÃO: modulesData é carregado via <script src="data.js"></script>

    // Emojis para cada módulo (em vez de ícones)
    const moduleEmojis = [
        "👤", // Módulo 1: Guia Presencial
        "🗣️", // Módulo 2: Técnicas e Métodos
        "↪️", // Módulo 3: Contorno de Objeções
        "💰", // Módulo 4: Argumentação de Investimento
        "✨", // Módulo 5: Encantamento
        "🧠", // Módulo 6: Gatilhos Mentais
        "❓"  // Módulo 7: Maiêutica Socrática
    ];

    /**
     * Renderiza os cards dos módulos no grid (Estilo Gioflix)
     */
    function renderModuleCards() {
        if (!window.modulesData || window.modulesData.length === 0) {
            moduleGrid.innerHTML = '<p>Nenhum módulo encontrado em data.js.</p>';
            return;
        }

        let gridHtml = '';
        window.modulesData.forEach((module, index) => {
            // Pega um emoji (ou um emoji padrão se a lista acabar)
            const emoji = moduleEmojis[index] || "📚";
            
            gridHtml += `
                <a href="#" class="module-card" data-module-id="${module.id}">
                    <div class="module-card-thumbnail">
                        ${emoji}
                    </div>
                    <div class="module-card-content">
                        <h3>${module.title}</h3>
                        <p>${module.subtitle}</p>
                        <span class="module-card-link">
                            Abrir Módulo ➡️
                        </span>
                    </div>
                </a>
            `;
        });
        moduleGrid.innerHTML = gridHtml;
    }

    /**
     * Constrói o HTML do conteúdo de um módulo
     */
    function buildModuleContentHtml(module) {
        return `
            <h1>${module.title}</h1>
            <h2>${module.subtitle}</h2>
            <div class="module-content-text">
                ${module.content}
            </div>
        `;
    }

    /**
     * Exibe o conteúdo do módulo selecionado
     */
    function showModuleContent(moduleId) {
        const module = window.modulesData.find(m => m.id === moduleId);
        if (!module) return;

        // Esconde o grid de módulos
        moduleSection.style.display = 'none';

        // Prepara e exibe o conteúdo
        contentWrapper.innerHTML = buildModuleContentHtml(module);
        
        // Ativa o fade-in e o botão "Voltar"
        contentWrapper.classList.add('active');
        backButtonContainer.classList.add('active');

        // Rola a tela para o topo do conteúdo
        contentWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Esconde o conteúdo do módulo e volta para o grid
     */
    function hideModuleContent() {
        // Desativa o conteúdo e o botão "Voltar"
        contentWrapper.classList.remove('active');
        backButtonContainer.classList.remove('active');

        // Mostra o grid de módulos novamente
        moduleSection.style.display = 'block';

        // Rola a tela de volta para o topo do grid
        moduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // --- EVENT LISTENERS ---

    // 1. Clique no Grid de Módulos
    moduleGrid.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o link de navegar
        const card = event.target.closest('.module-card');
        if (card) {
            const moduleId = card.dataset.moduleId;
            showModuleContent(moduleId);
        }
    });

    // 2. Clique no Botão Voltar
    backButton.addEventListener('click', (event) => {
        event.preventDefault();
        hideModuleContent();
    });

    // --- INICIALIZAÇÃO ---
    renderModuleCards();
});