document.addEventListener("DOMContentLoaded", () => {
  // 1. DADOS (Sem alteração, o conteúdo já está correto)
  const modalidadesData = [
    {
      id: "vestibular-online",
      title: "VESTIBULAR ONLINE",
      icon: "🌐",
      color: "green", 
      description: "Processo seletivo digital da UNIGRAN.",
      critérios: null,
      passos: [
        { num: 1, title: "Passo 1", content: ["1️⃣ Candidato realiza a inscrição e faz o vestibular online."] },
        { num: 2, title: "Passo 2", content: ["2️⃣ Se aprovado → gerar boleto de matrícula."] },
        { num: 3, title: "Passo 3", content: ["3️⃣ Após pagamento → entregar documentação original na Secretaria Acadêmica."] },
        { num: 4, title: "Passo 4", content: ["4️⃣ Secretaria ativa matrícula no sistema."] }
      ],
      observacoes: null
    },
    {
      id: "enem",
      title: "ENEM",
      icon: "🎓",
      color: "purple", 
      description: "Exame Nacional do Ensino Médio.",
      critérios: [
        "Notas válidas a partir de 2014.",
        "❌ Não pode ter zerado nenhuma área do conhecimento."
      ],
      passos: [
        { num: 1, title: "Passo 1", content: ["1️⃣ Equipe valida as notas do ENEM."] },
        { num: 2, title: "Passo 2", content: ["2️⃣ Se aprovado → gerar boleto de matrícula."] },
        { num: 3, title: "Passo 3", content: ["3️⃣ Aplicar desconto conforme nota (quando aplicável)."] },
        { num: 4, title: "Passo 4", content: ["4️⃣ Na Secretaria → entregar boletim do ENEM + documentos originais."] }
      ],
      observacoes: "Se o candidato já utilizou essa nota em outra inscrição, não pode reutilizar.<br>Pode usar outro ENEM (de outro ano) ou fazer vestibular online."
    },
    {
      id: "portador-diploma",
      title: "PORTADOR DE DIPLOMA",
      icon: "🧑‍🎓",
      color: "brown", 
      description: "Candidato que já concluiu curso na Unigran.",
      critérios: [
        "Situação: candidato já concluiu curso na Unigran e deseja iniciar outro."
      ],
      passos: [
        { num: 1, title: "Passo 1", content: ["1️⃣ Fazer inscrição como Portador de Diploma."] },
        { num: 2, title: "Passo 2", content: ["2️⃣ Consultar se deseja análise de grade.<br>Se sim → solicitar autorização e pegar histórico de conferência na Secretaria.<br>Encaminhar histórico ao coordenador (presencialmente ou por e-mail).<br>Coordenador monta o plano de ensino e retorna à Secretaria."] },
        { num: 3, title: "Passo 3", content: ["3️⃣ Secretaria calcula valores e ativa matrícula conforme aprovação."] },
        { num: 4, title: "Passo 4", content: ["4️⃣ Se o candidato não quiser análise, matrícula é feita normalmente."] }
      ],
      observacoes: "Mesmo sem análise, a forma de ingresso permanece “Portador de Diploma”.<br>O consultor pode intermediar a entrega do histórico ao coordenador.<br>Sempre confirmar se o diploma já está em mãos."
    },
    {
      id: "transferencia-interna",
      title: "TRANSFERÊNCIA INTERNA",
      icon: "🔄",
      color: "blue", 
      description: "Entre cursos da UNIGRAN.",
      critérios: null,
      passos: [
        { num: "➤", title: "➤ Área Afim", content: ["1️⃣ Solicitar autorização do candidato para análise.", "2️⃣ Pedir histórico de conferência do curso atual.", "3️⃣ Levar ao coordenador do novo curso (ou enviar por e-mail).", "4️⃣ Coordenador realiza análise de grade e monta o plano de ensino.", "5️⃣ Secretaria confirma valores e finaliza matrícula.", "6️⃣ Acompanhar via CRM até ativação."] },
        { num: "➤", title: "➤ Área Não Afim", content: ["1️⃣ Solicitar autorização do candidato para análise.", "2️⃣ Pegar histórico de conferência na Secretaria.", "3️⃣ Levar histórico ao coordenador do curso desejado.", "4️⃣ Coordenador realiza a análise e o plano de ensino antes da matrícula.", "5️⃣ Após aprovação → Secretaria calcula valores e conclui matrícula.", "6️⃣ Caso o candidato não queira análise, pode fazer novo vínculo (via vestibular online ou ENEM)."] }
      ],
      observacoes: "Mesmo sem análise, é possível matrícula normal com novo vínculo.<br>A análise feita antes da matrícula evita erros no valor da mensalidade."
    },
    {
      id: "transferencia-externa",
      title: "TRANSFERÊNCIA EXTERNA",
      icon: "📤",
      color: "orange", 
      description: "De outra instituição.",
      critérios: null,
      passos: [
        { num: "➤", title: "➤ Área Afim", content: ["1️⃣ Solicitar autorização e documentos de transferência do candidato.", "2️⃣ Secretaria recebe histórico e encaminha ao coordenador.", "3️⃣ Coordenador realiza análise de grade (equivalência de disciplinas).", "4️⃣ Após aprovação → Secretaria informa valores e finaliza matrícula.", "5️⃣ Acompanhar via CRM até ativação."] },
        { num: "➤", title: "➤ Área Não Afim", content: ["1️⃣ Se não eliminar matérias suficientes → fazer vestibular online.", "2️⃣ Após o vestibular → solicitar análise de grade para possível eliminação de disciplinas.", "3️⃣ Coordenador entrega plano de ensino.", "4️⃣ Secretaria finaliza matrícula conforme análise."] }
      ],
      observacoes: "<strong>Resumo:</strong><br>🔸 Área afim: análise + matrícula Secretaria.<br>🔹 Área não afim: vestibular + análise posterior + matrícula final."
    }
  ];

  // 2. Elementos DOM
  const grid = document.getElementById("formas-ingresso-grid");
  const contentContainer = document.getElementById("modalidade-content");
  const backButtonContainer = document.getElementById("back-button-container");
  const backButton = document.getElementById("back-button");

  // 3. Funções de Renderização

  /**
   * Renderiza os CARDS principais
   */
  function renderCards() {
    grid.innerHTML = ""; // Limpa o grid
    modalidadesData.forEach(data => {
        grid.innerHTML += `
            <a href="#" class="ingresso-card color-${data.color}" data-modalidade="${data.id}">
                <div class="card-icon">${data.icon}</div>
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <div class="card-description">
                </div>
                <span class="card-link">➡️ Clique para ver o passo a passo</span>
            </a>
        `;
    });
  }

  /**
   * Constrói e retorna o HTML do CONTEÚDO DETALHADO de uma modalidade.
   * (*** ESTA FUNÇÃO FOI MODIFICADA ***)
   */
  function buildModalidadeHtml(data) {
    let html = `
      <div class="modalidade-details active" id="details-${data.id}">
          <div class="modalidade-header">
              <h2>${data.icon} ${data.title}</h2>
              <p class="subtitle">${data.description}</p>
          </div>
    `;

    // 1. Seção de Critérios
    if (data.critérios && data.critérios.length > 0) {
      html += `
          <div class="criteria-block">
              <h3>📝 Critérios</h3>
              <ul>
      `;
      data.critérios.forEach((criterio) => {
        html += `<li>${criterio}</li>`;
      });
      html += `
              </ul>
          </div>
      `;
    }
    
    // 2. Seção de Passos (LAYOUT MODIFICADO)
    data.passos.forEach((passo) => {
      const contentHtml = passo.content.join('<br>');
      
      html += `
        <div class="step-item">
            <div class="step-content">
      `;

      // Se o título NÃO for "Passo 1", "Passo 2", etc., nós o mostramos
      // (Isso é para "➤ Área Afim" e "➤ Área Não Afim")
      if (!passo.title.startsWith("Passo")) {
        html += `<h3>${passo.title}</h3>`;
      }
      
      // Adiciona o conteúdo principal (que já tem o emoji 1️⃣, 2️⃣, etc.)
      html += `
                <p>${contentHtml}</p>
            </div>
        </div>
      `;
    });

    // 3. Seção de Observações
    if (data.observacoes) {
        html += `
            <div class="observacoes-block">
                <h3>⚠️ Observações</h3>
                <p>${data.observacoes}</p>
            </div>
        `;
    }

    html += `</div>`;
    return html;
  }

  /**
   * Exibe o conteúdo de uma modalidade específica
   */
  function showModalidade(modalidadeId) {
    const data = modalidadesData.find(m => m.id === modalidadeId);
    if (!data) return;

    contentContainer.style.opacity = 0;
    
    setTimeout(() => {
        contentContainer.innerHTML = buildModalidadeHtml(data);
        backButtonContainer.classList.add("active");
        contentContainer.style.display = 'block';
        contentContainer.offsetWidth; 
        contentContainer.style.opacity = 1;
        contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  /**
   * Retorna à tela inicial
   */
  function hideModalidade() {
    backButtonContainer.classList.remove("active");
    contentContainer.style.opacity = 0;
    setTimeout(() => {
         contentContainer.style.display = 'none';
         contentContainer.innerHTML = '';
         grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500); 
  }

  // 4. Listeners de Evento
  
  grid.addEventListener("click", (event) => {
    event.preventDefault(); 
    const card = event.target.closest(".ingresso-card");
    if (card) {
      const modalidadeId = card.dataset.modalidade;
      const currentActiveId = contentContainer.querySelector('.modalidade-details')?.id?.replace('details-', '');
      
      if (currentActiveId === modalidadeId) {
          hideModalidade();
          return;
      }
      showModalidade(modalidadeId);
    }
  });

  backButton.addEventListener("click", (event) => {
    event.preventDefault();
    hideModalidade();
  });

  // 5. Inicialização
  renderCards(); 

});