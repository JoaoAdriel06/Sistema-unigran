document.addEventListener("DOMContentLoaded", () => {
  
  // =========================================================
  // 1. LÓGICA DA ABA "DESCONTOS E REGRAS" (CARDS)
  // =========================================================
  
  const descontosData = [
    {
      id: "convenios",
      title: "1️⃣ Convênios com Empresas",
      content: `
        🔥 <strong>Desconto:</strong> 25% a 30%<br>
        ✔️ <strong>Válido para:</strong> Cursos presenciais e pós presenciais<br>
        ❌ <strong>Exceto:</strong> Odontologia<br>
        📌 <strong>Regras adicionais:</strong><br>
        – Benefício aplicado diretamente na matrícula e mensalidades conforme convênio cadastrado (Consultar documento de convênios)
      `,
      searchTerms: "convenio empresa 25% 30% odontologia",
    },
    {
      id: "gastro-familia",
      title: "2️⃣ Curso de Gastronomia (Funcionários e Familiares)",
      content: `
        🔥 <strong>Desconto:</strong> 60%<br>
        ✔️ <strong>Válido para:</strong> Funcionários, filhos e cônjuges<br>
        📌 <strong>Outros familiares:</strong> Análise individual pela Tesouraria
      `,
      searchTerms: "gastronomia 60% funcionario familia filhos conjuge",
    },
    {
      id: "egresso",
      title: "3️⃣ Aluno Egresso UNIGRAN",
      content: `
        🎓 <strong>Presencial e Polos 1 e 3 do EAD Dourados</strong><br>
        🔥 <strong>Desconto:</strong> 50% na matrícula e mensalidade<br>
        ✔️ <strong>Válido para:</strong> Todos os cursos, <strong>exceto</strong> Gastronomia e Odontologia<br>
        🏫 <strong>Inclui:</strong> Formados no Presencial e polos 1 (polo modelo) & 3 (Polo do Centro) de Dourados.<br>
        📌 <strong>Regras adicionais:</strong><br>
        – Ed. Física (Licenciatura ↔ Bacharelado): desconto continua em 50%. Válido para todos os polos EAD/SEMI e presencial.<br>
        – Alunos cursando mais de um curso presencial → 50% aplicado ao curso de <strong>maior valor</strong> (exceto Odonto).
      `,
      searchTerms: "egresso 50% ex-aluno polos 1 3 dourados gastronomia odontologia educação física",
    },
    {
      id: "simultanea",
      title: "4️⃣ Graduação simultânea EAD/Semi e Presencial",
      content: `
        ✔️ <strong>Aluno EAD/Semi indo para Presencial:</strong><br>
        → 50% (exceto Odontologia)<br>
        → Válido somente em Dourados (Polos 1 e 3)<br>
        <br>
        ✔️ <strong>Aluno Presencial indo para EAD/Semi:</strong><br>
        → 30%<br>
        → Orientar a procurar a Tesouraria EAD<br>
        → Não informar desconto ao aluno diretamente
      `,
      searchTerms: "simultanea ead presencial 50% 30% polos 1 3",
    },
    {
      id: "transferencia-capital",
      title: "5️⃣ Transferência / Egresso – UNIGRAN Capital → Dourados",
      content: `
        🔥 <strong>Desconto:</strong> 50% para Egressos que vem da capital.<br>
        ✔️ <strong>Válido para:</strong> Formados na UNIGRAN Capital que ingressam em nova graduação<br>
        ❌ <strong>Exceto:</strong> Odontologia<br>
        <br>
        📌 <strong>Regra de Transferência:</strong><br>
        – Alunos transferidos da Capital mantêm o mesmo desconto que tinham lá, exceto:<br>
        • Planos governamentais<br>
        • Convênios que Dourados não participa
      `,
      searchTerms: "transferencia egresso capital dourados 50%",
    },
    {
      id: "estagiario",
      title: "6️⃣ Estagiários da UNIGRAN",
      content: `
        🧩 <strong>Estagiários UNIGRAN – Regras Específicas</strong><br>
        ✔️ <strong>Auxílio transporte:</strong> Estagiário <strong>não tem direito</strong> a desconto de ônibus<br>
        ✔️ <strong>Cobertura:</strong> Estágio cobre adaptações, mas <strong>não cobre DP</strong>
      `,
      searchTerms: "estagiario dp adaptação transporte onibus",
    },
    {
      id: "tecnico-enfermagem",
      title: "7️⃣ Curso Técnico → Enfermagem",
      content: `
        🏥 <strong>Alunos com Curso Técnico em ENFERMAGEM</strong><br>
        🔥 <strong>Desconto:</strong> 50%<br>
        ✔️ <strong>Válido para:</strong> Calouros com certificado de Curso Técnico em Enfermagem<br>
        ➡️ <strong>Aplicação:</strong> Desconto aplicado desde a matrícula e por todo o curso
      `,
      searchTerms: "tecnico enfermagem 50% calouro certificado",
    },
    {
      id: "enem",
      title: "8️⃣ ENEM – Descontos 2026",
      content: `
        🔥 <strong>Matrícula – Cursos em Geral:</strong><br>
        Média 450 a 799 → <strong>30%</strong> na matrícula<br>
        Média 800 a 1000 → <strong>50%</strong> na matrícula<br>
        <br>
        🔥 <strong>Matrícula – Odontologia (Regra Exclusiva):</strong><br>
        Média 500 a 1000 → <strong>35%</strong> na matrícula<br>
        <br>
        📌 <strong>Mensalidades via ENEM:</strong><br>
        – Possibilidade de <strong>25%</strong> de desconto<br>
        – Válido <strong>somente se</strong> o aluno não possuir outro desconto<br>
        – Não se aplica a: FIES e MS Supera<br>
        – Cada caso deve ser analisado individualmente<br>
        → Encaminhar para Simone ou João<br>
        <br>
        📌 <strong>Cálculo da média do ENEM:</strong><br>
        MÉDIA = soma das 5 notas ÷ 5
      `,
      searchTerms: "enem 2026 30% 50% 35% 25% matricula mensalidade odontologia",
    },
    {
      id: "fixos",
      title: "9️⃣ Descontos especiais",
      content: `

        ✨ <strong>Cursos com até 50% na matrícula:</strong><br>
        – Educação Física<br>
        – Arquitetura<br>
        – Fisioterapia<br>
        – Produção Agrícola<br>
        <br>
        🎯 <strong>Cursos com desconto fixo (curso todo):</strong><br>
        – Nutrição → <strong>50%</strong><br>
        – Gastronomia → <strong>40%</strong><br>
        – Administração → <strong>30%</strong><br>
        – Ciências Contábeis → <strong>30%</strong><br>
        – Design de Interiores → <strong>50%</strong><br>
        – Radiologia → <strong>50%</strong>
      `,
      searchTerms: "fixo 50% 40% 30% design radiologia nutrição gastronomia administração ciências contábeis",
    },
    {
      id: "indigena",
      title: "🔟 Aluno Indígena",
      content: `
        🏛️ <strong>Desconto:</strong> 50% na matrícula e mensalidade<br>
        ✅ <strong>Válido para:</strong> Todos os cursos, <strong>exceto Odontologia</strong>
      `,
      searchTerms: "indigena 50% odontologia",
    },
  ];

  // Elementos da Busca de Cards
  const cardContainer = document.getElementById("discount-card-container");
  const searchInputCards = document.getElementById("discount-search");
  const noResultsMessage = document.getElementById("no-results-message");

  /**
   * Renderiza os cards de desconto
   */
  function renderCards(data) {
    if (!cardContainer) return; 
    
    cardContainer.innerHTML = "";
    if (data.length === 0 && noResultsMessage) {
      noResultsMessage.style.display = "block";
    } else if (noResultsMessage) {
      noResultsMessage.style.display = "none";
    }

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("discount-card");
      card.dataset.searchTerms = item.searchTerms;

      card.innerHTML = `
        <h3>${item.title}</h3>
        <div class="discount-card-content">
          ${item.content}
        </div>
      `;
      cardContainer.appendChild(card);
    });
  }

  /**
   * Filtra os cards com base no input de busca
   */
  function filterCards() {
    const searchTerm = searchInputCards.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderCards(descontosData); 
        return;
    }

    const filteredData = descontosData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        item.searchTerms.toLowerCase().includes(searchTerm)
    );
    
    renderCards(filteredData);
  }


  // =========================================================
  // 2. LÓGICA DAS ABAS "TABELAS" (NOVO)
  // =========================================================

  /**
   * Função Genérica para Filtrar Tabelas
   * @param {string} inputId - O ID do input de busca (ex: 'matricula-search')
   * @param {string} sectionId - O ID da seção que contém a tabela (ex: 'tabela-2025-content')
   */
  function setupTableSearch(inputId, sectionId) {
    const inputElement = document.getElementById(inputId);
    const sectionElement = document.getElementById(sectionId);

    // Proteção: se não achar o input ou a tabela, não faz nada (evita erros)
    if (!inputElement || !sectionElement) return;

    // Encontra as linhas (tr) dentro do corpo da tabela (tbody) nessa seção
    const tableRows = sectionElement.querySelectorAll("tbody tr");

    // Adiciona o evento de digitação
    inputElement.addEventListener("keyup", () => {
        const term = inputElement.value.toLowerCase().trim();

        tableRows.forEach(row => {
            // Pega todo o texto da linha (Curso, Valor, Desconto...)
            const rowText = row.textContent.toLowerCase();

            // Se o termo estiver no texto, mostra a linha. Se não, esconde.
            if (rowText.includes(term)) {
                row.style.display = ""; // Mostra (padrão do navegador)
            } else {
                row.style.display = "none"; // Esconde
            }
        });
    });
  }

  // =========================================================
  // 3. LÓGICA DE NAVEGAÇÃO POR ABAS (MANTIDO)
  // =========================================================
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.dataset.tab;

      // 1. Remove 'active' de todos os links e conteúdos
      tabLinks.forEach(l => l.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      // 2. Adiciona 'active' ao link clicado e ao conteúdo alvo
      link.classList.add("active");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.add("active");
      }
    });
  });

  // =========================================================
  // 4. INICIALIZAÇÃO
  // =========================================================
  
  // Inicializa Busca de Cards (Aba 1)
  if (cardContainer && searchInputCards) {
    renderCards(descontosData); 
    searchInputCards.addEventListener("keyup", filterCards);
  }

  // Inicializa Busca de Tabelas (Aba 2 e 3) - AQUI ESTÁ A MÁGICA NOVA
  setupTableSearch("matricula-search", "tabela-2025-content");
  setupTableSearch("mensalidade-search", "tabela-2026-content");
});