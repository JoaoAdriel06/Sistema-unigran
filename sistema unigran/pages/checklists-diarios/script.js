// Aguarda o DOM ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- SELEÇÃO DOS ELEMENTOS DO DOM ---
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"][name="task"]');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const resetButton = document.getElementById('reset-button');
    // Chave única para salvar os dados no localStorage
    const localStorageKey = 'dailyChecklistProgress';

    /**
     * Atualiza a barra de progresso e o texto com base nos checkboxes marcados.
     */
    function updateProgress() {
        const totalTasks = allCheckboxes.length;
        const completedTasks = document.querySelectorAll('input[type="checkbox"][name="task"]:checked').length;

        // Evita divisão por zero se não houver tarefas na página
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        // Atualiza a largura da barra de progresso
        progressBar.style.width = `${percentage}%`;
        // Atualiza o texto da porcentagem
        progressText.textContent = `${Math.round(percentage)}% Concluído`;

        // Salva o estado atual no localStorage
        saveState();
    }

    /**
     * Salva o estado de cada checkbox (marcado/desmarcado) no localStorage.
     */
    function saveState() {
        const checkboxStates = [];
        allCheckboxes.forEach(checkbox => {
            checkboxStates.push(checkbox.checked); // Salva true ou false
        });
        localStorage.setItem(localStorageKey, JSON.stringify(checkboxStates));
    }

    /**
     * Carrega o estado salvo do localStorage e aplica aos checkboxes na página.
     */
    function loadState() {
        const savedStates = localStorage.getItem(localStorageKey);
        if (savedStates) {
            const checkboxStates = JSON.parse(savedStates);
            allCheckboxes.forEach((checkbox, index) => {
                // Garante que o estado salvo corresponda ao checkbox
                if (checkboxStates[index] !== undefined) {
                    checkbox.checked = checkboxStates[index];
                }
            });
        }
    }

    /**
     * Reseta todos os checkboxes para o estado desmarcado e atualiza o progresso.
     */
    function resetChecklist() {
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        // Atualiza a UI e limpa o localStorage através do saveState()
        updateProgress();
    }

    // --- ATRIBUIÇÃO DE EVENTOS ---

    // Adiciona um ouvinte de evento para cada checkbox
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    // Adiciona um ouvinte de evento para o botão de reset
    resetButton.addEventListener('click', resetChecklist);


    // --- INICIALIZAÇÃO DA PÁGINA ---
    
    // Carrega o estado salvo assim que a página é aberta
    loadState();
    // Calcula e exibe o progresso inicial com base no estado carregado
    updateProgress();

});