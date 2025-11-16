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

    // MODIFICADO: Removido "NO VALOR XXX,XX"
    const notasAcompanhamento = [
        "DESCONTO DE XX% OFERTADO PARA O CURSO DE XXX.",
        "CANDIDATO PRÉ-MATRICULADO PELO SETOR COMERCIAL - BOLETO COM VENCIMENTO PARA O DIA XX/XX/XXXX",
        "CANDIDATO PRÉ-MATRICULADO PELA SECRETARIA - BOLETO COM VENCIMENTO PARA O DIA XX/XX/XXXX",
        "CANDIDATO PRÉ-MATRICULADO PELO PROCESSO AUTOMÁTICO - BOLETO COM VENCIMENTO PARA O DIA XX/XX/XXXX",
        "BOLETO ATUALIZADO PELO SETOR COMERCIAL COM VENCIMENTO PARA O DIA XX/XX/XXXX",
        "MATRÍCULA EFETUADA PELO SETOR COMERCIAL NO DIA XX/XX/XXXX - AGUARDANDO ANÁLISE DE DOCUMENTOS",
        "MATRÍCULA EFETUADA PELA SECRETARIA NO DIA XX/XX/XXXX - AGUARDANDO ANÁLISE DE DOCUMENTOS",
        "ANÁLISE DE DOCUMENTOS REALIZADA - DE ACORDO COM O SGI O CANDIDATO ESTÁ ATIVO - CONTRATO E REQUERIMENTO LIBERADOS PELA SECRETARIA.",
        "CANDIDATO AGUARDANDO ANÁLISE DE GRADE - ESTAMOS EM CONTATO E REALIZANDO ACOMPANHAMENTO PARA SEGUIR COM A MATRÍCULA"
    ];

    // 2. Elementos DOM
    const tarefasContainer = document.getElementById('tarefas-rdstation');
    const notasAcompanhamentoContainer = document.getElementById('notas-acompanhamento');
    const notasIniciaisContainer = document.getElementById('notas-iniciais');

    // 3. Função para criar o HTML do item de cópia (COM EMOJI)
    function createCopyItemHTML(text) {
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
    if (tarefasContainer) {
        tarefas.forEach(item => {
            const textWithIcon = `📋 ${item}`;
            tarefasContainer.innerHTML += createCopyItemHTML(textWithIcon);
        });
    }

    // b) Notas de Acompanhamento
    if (notasAcompanhamentoContainer) {
        notasAcompanhamento.forEach(item => {
            const textWithIcon = `📈 ${item}`; 
            notasAcompanhamentoContainer.innerHTML += createCopyItemHTML(textWithIcon);
        });
    }

    // 5. Lógica de Cópia
    
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

    // Formata a data de YYYY-MM-DD para DD/MM/YYYY ou retorna 'XX/XX/XX'
    function formatarData(dataInput) {
        if (dataInput) {
            const [ano, mes, dia] = dataInput.split('-');
            if (dia && mes && ano) {
                return `${dia}/${mes}/${ano}`;
            }
        }
        return 'XX/XX/XX';
    }

    // Ouvinte de eventos para todos os botões de cópia (LÓGICA CORRIGIDA)
    document.querySelectorAll('.copy-list').forEach(list => {
        list.addEventListener('click', (event) => {
            const button = event.target.closest('.copy-btn');
            if (!button) return;

            const item = button.closest('.copy-item');
            if (!item) return;

            let textToCopy = "";
            
            // --- INÍCIO DA LÓGICA CORRIGIDA ---

            // Caso 1: Card "Canal" (Usa IDs *canal)
            if (item.id === 'nota-canal') {
                const dataInput = document.getElementById('data-inscricao-canal').value;
                const formaInput = document.getElementById('forma-ingresso-canal').value;
                const canalInput = document.getElementById('canal-select').value;
                
                const dataFormatada = formatarData(dataInput);

                textToCopy = `INSCRITO DIA ${dataFormatada} [BR]FORMA DE INGRESSO: ${formaInput}[BR]CONTATO INICIADO PELO CANAL: ${canalInput}[BR]AGUARDANDO RESPOSTA`;
            
            // Caso 2: Card "Email Inválido" (Usa IDs *email)
            } else if (item.id === 'nota-email-invalido') {
                const dataInput = document.getElementById('data-inscricao-email').value;
                const formaInput = document.getElementById('forma-ingresso-email').value;
                
                const dataFormatada = formatarData(dataInput);

                textToCopy = `INSCRITO DIA ${dataFormatada}[BR]FORMA DE INGRESSO: ${formaInput}[BR]CONTATO INICIADO PELO E-MAIL (URL INVÁLIDA)[BR]AGUARDANDO RETORNO`;
            
            // Caso 3: Cards simples (Tarefas, Acompanhamento)
            } else if (item.dataset.text) {
                textToCopy = item.dataset.text;
            }
            // --- FIM DA LÓGICA CORRIGIDA ---


            if (textToCopy) {
                let finalCopyText;

                // Remove os emojis (📋, 📈) do texto copiado
                if (list.id === 'tarefas-rdstation' || list.id === 'notas-acompanhamento') {
                    finalCopyText = textToCopy.slice(2).trim(); // Remove o emoji e espaço
                } else if (list.id === 'notas-iniciais' && textToCopy.startsWith('📄')) {
                    finalCopyText = textToCopy.slice(2).trim(); // Remove o emoji e espaço
                } else {
                    finalCopyText = textToCopy;
                }
                
                // Substitui o token [BR] pela quebra de linha real
                const textWithLineBreaks = finalCopyText.replace(/\[BR\]/g, '\n');

                copyToClipboard(textWithLineBreaks, button);
            }
        });
    });
});

