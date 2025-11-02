document.addEventListener('DOMContentLoaded', () => {
    // 1. Dados para as listas
    const tarefas = [
        "VESTIBULAR ONLINE - MÊS",
        "ENEM - MÊS",
        "PORTADOR DE DIPLOMA - MÊS",
        "TRANSFERÊNCIA EXTERNA - MÊS",
        "BOLETO AUTOMÁTICO - MÊS",
        "ACOMPANHAR PAGAMENTO - SECRETARIA - MÊS",
        "ATUALIZAR BOLETO - MÊS",
        "AGUARDANDO ATIVAÇÃO - MÊS"
    ];

    const notasAcompanhamento = [
        "DESCONTO DE XX% OFERTADO PARA O CURSO DE XXX.",
        "CANDIDATO PRÉ-MATRICULADO PELO SETOR COMERCIAL - BOLETO COM VENCIMENTO PARA O DIA XX/XX/XXXX NO VALOR XXX,XX",
        "CANDIDATO PRÉ-MATRICULADO PELA SECRETARIA - BOLETO COM VENCIMENTO PARA O DIA XX/XX/XXXX NO VALOR XXX,XX",
        "CANDIDATO PRÉ-MATRICULADO PELO PROCESSO AUTOMÁTICO - BOLETO COM VENCIMENTO PARA O DIA XX/XX/XXXX NO VALOR XXX,XX",
        "BOLETO ATUALIZADO PELO SETOR COMERCIAL COM VENCIMENTO PARA O DIA XX/XX/XXXX NO VALOR XXX,XX",
        "MATRÍCULA EFETUADA PELO SETOR COMERCIAL NO DIA XX/XX/XXXX COM O VALOR DE XXX,XX - AGUARDANDO ANÁLISE DE DOCUMENTOS",
        "MATRÍCULA EFETUADA PELA SECRETARIA NO DIA XX/XX/XXXX COM O VALOR DE XXX,XX - AGUARDANDO ANÁLISE DE DOCUMENTOS",
        "ANÁLISE DE DOCUMENTOS REALIZADA - DE ACORDO COM O SGI O CANDIDATO ESTÁ ATIVO - CONTRATO E REQUERIMENTO LIBERADOS PELA SECRETARIA.",
        "CANDIDATO AGUARDANDO ANÁLISE DE GRADE - ESTAMOS EM CONTATO E REALIZANDO ACOMPANHAMENTO PARA SEGUIR COM A MATRÍCULA"
    ];

    // 2. Elementos DOM
    const tarefasContainer = document.getElementById('tarefas-rdstation');
    const notasAcompanhamentoContainer = document.getElementById('notas-acompanhamento');
    const notasIniciaisContainer = document.getElementById('notas-iniciais');

    // 3. Função para criar o HTML do item de cópia (COM EMOJI)
    function createCopyItemHTML(text) {
        // CORREÇÃO: Substitui o token [BR] por <br> apenas para exibição
        const formattedTextForDisplay = text.replace(/\[BR\]/g, '<br>');
        return `
            <div class="copy-item" data-text="${text}">
                <p class="copy-text">${formattedTextForDisplay}</p>
                <button class="copy-btn">
                    📋 Copiar
                </button>
            </div>
        `;
    }

    // 4. Preencher as listas
    // a) Tarefas
    tarefas.forEach(item => {
        const textWithIcon = `📋 ${item}`;
        tarefasContainer.innerHTML += createCopyItemHTML(textWithIcon);
    });

    // b) Notas de Acompanhamento
    notasAcompanhamento.forEach(item => {
        const textWithIcon = `📈 ${item}`; 
        notasAcompanhamentoContainer.innerHTML += createCopyItemHTML(textWithIcon);
    });

    // 5. Lógica de Cópia (COM EMOJI)
    
    // Função principal de cópia
    function copyToClipboard(text, button) {
        if (!navigator.clipboard) {
            alert("Recurso de cópia indisponível no seu navegador.");
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            // Feedback visual no botão
            const originalText = button.innerHTML;
            button.classList.add('copied');
            button.innerHTML = '✅ Copiado!'; 

            setTimeout(() => {
                button.classList.remove('copied');
                button.innerHTML = originalText;
            }, 1500);
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            alert('Falha ao copiar o texto. Tente novamente.');
        });
    }

    // Ouvinte de eventos para todos os botões de cópia
    document.querySelectorAll('.copy-list').forEach(list => {
        list.addEventListener('click', (event) => {
            const button = event.target.closest('.copy-btn');
            if (!button) return;

            const item = button.closest('.copy-item');
            if (!item) return;

            let textToCopy;
            
            // Lógica para itens simples (data-text)
            if (item.dataset.text) {
                textToCopy = item.dataset.text;
            } 
            // Lógica para o item com SELECT (data-text-base)
            else if (item.dataset.textBase) {
                const select = item.querySelector('.channel-select');
                if (select) {
                    const selectedChannel = select.value;
                    textToCopy = item.dataset.textBase.replace('{canal}', selectedChannel);
                } else {
                    textToCopy = item.dataset.textBase;
                }
            }

            if (textToCopy) {
                let prefix = '';
                if (list.id === 'tarefas-rdstation') {
                    prefix = ''; 
                } else if (list.id === 'notas-acompanhamento') {
                    prefix = ''; 
                } else if (list.id === 'notas-iniciais') {
                    prefix = '📄 '; 
                }
                
                let finalCopyText = textToCopy;
                if (list.id === 'notas-iniciais' && !finalCopyText.startsWith('📄')) {
                    finalCopyText = '📄 ' + finalCopyText;
                }
                
                // --- A CORREÇÃO ESTÁ AQUI ---
                // Substitui o token "[BR]" (que vem do HTML) 
                // pelo caractere de quebra de linha real ("\n")
                const textWithLineBreaks = finalCopyText.replace(/\[BR\]/g, '\n');
                // --- FIM DA CORREÇÃO ---

                copyToClipboard(textWithLineBreaks, button); // Copia o texto corrigido
            }
        });
    });
});