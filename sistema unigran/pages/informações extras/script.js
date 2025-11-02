document.addEventListener("DOMContentLoaded", () => {
  // 1. Dados dos Ramais (ATUALIZADOS CONFORME O ARQUIVO CSV)
  const ramaisData = [
    // CAPTAÇÃO PRESENCIAL
    {
      departamento: "CAPTAÇÃO PRESENCIAL",
      items: [
        { cargo: "Dir. de Captação", nome: "Simone", ramal: "3151" },
        { cargo: "Gestor de Captação", nome: "João Adriel", ramal: "3102" },
        { cargo: "Consultora de Captação", nome: "Kauany", ramal: "3159" },
        { cargo: "Consultora de Captação", nome: "Marcela", ramal: "3160" },
        { cargo: "Consultora de Captação", nome: "Laís", ramal: "3150" },
      ],
    },
    // SECRETARIA
    {
      departamento: "SECRETARIA",
      items: [
        { cargo: "Secretaria/Núc. Apoio Acad.", nome: "Geral", ramal: "4101" },
        { cargo: "Secretaria- Arquivo/Doc.", nome: "Daniele Santos", ramal: "4286" },
        { cargo: "Secretaria Bolsas Est.", nome: "Geral", ramal: "4108" },
        { cargo: "Secretaria Documentos", nome: "Geisa/Hiliê", ramal: "4299" },
        { cargo: "Secretaria - Provas", nome: "Robson Lezainski", ramal: "4125" },
      ],
    },
    // TESOURARIA
    {
      departamento: "TESOURARIA",
      items: [
        { cargo: "Tesouraria", nome: "Tania Gargantini", ramal: "4257" },
        { cargo: "Tesouraria Atendimento", nome: "Geral", ramal: "4182/4135" },
        { cargo: "Tesouraria Cobrança", nome: "Geral", ramal: "4181" },
        { cargo: "Tesouraria FIES", nome: "Geral", ramal: "4273" },
      ],
    },
    // DI / SISTEMA
    {
      departamento: "DI / SISTEMA",
      items: [
        { cargo: "DI -Diretor", nome: "Adriano Câmara", ramal: "4115" },
        { cargo: "DI- Suporte/ Manutenção", nome: "Ronei/Marcio", ramal: "4131" },
      ],
    },
    // MARKETING
    {
      departamento: "MARKETING",
      items: [
        { cargo: "Marketing", nome: "Josiane Lopes", ramal: "4187" },
        { cargo: "Marketing Criação", nome: "Nilton Raiol", ramal: "3125" },
        { cargo: "Marketing Planejamento", nome: "Milena Cardinal", ramal: "4210" },
      ],
    },
    // COLÉGIO UNIGRAN
    {
      departamento: "COLÉGIO UNIGRAN",
      items: [
        { cargo: "Colégio Unigran Unid I - Sec.", nome: "Gislaine Esquivel", ramal: "4105" },
        { cargo: "Colégio Unigran Unid II", nome: "Rivanya Ramos", ramal: "4294" },
      ],
    },
    // DEPARTAMENTOS GERAIS
    {
      departamento: "DEPARTAMENTOS GERAIS",
      items: [
        { cargo: "Almoxarifado", nome: "Thais Aline", ramal: "4221" },
        { cargo: "FIES/PROUNI/MS Supera", nome: "Tana Alves", ramal: "4108/4287" },
        { cargo: "Pós Graduação - Secretárias", nome: "Karina/Amanda", ramal: "4114" },
      ],
    },
    // NÚCLEOS
    {
      departamento: "NÚCLEOS",
      items: [
        { cargo: "Apoio Cantão - Agro e TPA", nome: "Daiane", ramal: "3137" },
        { cargo: "Estética", nome: "Geral", ramal: "4201" },
        { cargo: "Estética Coord. Clínica", nome: "Claudia Beloni", ramal: "4123" },
        { cargo: "Fisioterapia", nome: "Geral", ramal: "4163" },
        { cargo: "Fisioterapia Coord Clíin.", nome: "João Vitor", ramal: "4213" },
        { cargo: "Jurídico", nome: "Geral", ramal: "3423\n/5522" },
        { cargo: "NTU", nome: "Elson/Eduardo", ramal: "4175" },
        { cargo: "Nutrição", nome: "Talita Muniz", ramal: "4194" },
        { cargo: "Nutrição", nome: "Geral", ramal: "4214" },
        { cargo: "Odontologia", nome: "Geral", ramal: "4233" },
        { cargo: "Odonto Coord. Clín.", nome: "Letícia Reis", ramal: "4226" },
        { cargo: "Polo Unid. III", nome: "Geral", ramal: "4150" },
        { cargo: "Psicologia", nome: "Geral", ramal: "4268" },
        { cargo: "Hosp. Vet. Coord. Clínica", nome: "Alex Matos", ramal: "4112" },
        { cargo: "Hosp. Veterinário", nome: "Recepção", ramal: "4199" },
      ],
    },
    // DEPARTAMENTOS EAD
    {
      departamento: "DEPARTAMENTOS EAD",
      items: [
        { cargo: "Financeiro EAD", nome: "Andréia Felix", ramal: "4296" },
        { cargo: "Financeiro EAD Geral", nome: "Edneia", ramal: "4126" },
        { cargo: "Secretaria EAD", nome: "Geral", ramal: "4142/4239" },
        { cargo: "Operações Comerciais", nome: "Geral", ramal: "4249" },
      ],
    },
    // DEP. PESSOAL
    {
      departamento: "DEP. PESSOAL",
      items: [
        { cargo: "Dep. Pessoal", nome: "Talita Inoue", ramal: "4149" },
        { cargo: "Dep. Pessoal – Recepção", nome: "Raquel Vargas", ramal: "4146" },
        { cargo: "Dep. Pessoal – Secretária", nome: "Caroline Silva", ramal: "4168" },
      ],
    },
  ];

  const container = document.getElementById("ramais-list-container");
  const searchInput = document.getElementById("ramal-search");

  // 2. Função de Renderização dos Ramais
  function renderRamais(filteredData) {
    container.innerHTML = ""; // Limpa o conteúdo
    const dataToRender = filteredData || ramaisData; // Usa dados filtrados ou todos os dados

    let totalRamaisCount = 0; // Contador para verificar se há resultados

    dataToRender.forEach((dept) => {
      // Se o departamento não tiver itens para renderizar (após filtro), pular
      if (dept.items.length === 0) return;

      // Título do Departamento
      const title = document.createElement("h3");
      title.classList.add("ramal-section-title");
      title.textContent = dept.departamento;
      container.appendChild(title);

      // Grid de Ramais
      const grid = document.createElement("div");
      grid.classList.add("ramal-grid");

      dept.items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("ramal-card");
        card.dataset.ramal = item.ramal;

        card.innerHTML = `
                <div class="ramal-card-role">${item.cargo}</div>
                <div class="ramal-card-name">${item.nome}</div>
                <div class="ramal-card-number">${item.ramal}</div>
            `;
        grid.appendChild(card);
        totalRamaisCount++;
      });

      container.appendChild(grid);
    });

    // Se não houver ramais, mostra uma mensagem
    if (totalRamaisCount === 0) {
      container.innerHTML =
        '<p style="text-align: center; color: var(--text-color-secondary); padding: 2rem;">Nenhum ramal encontrado. Tente um termo de busca diferente.</p>';
    }
  }

  // 3. Função de Filtro (Simplificada)
  function filterRamais() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (!searchTerm) {
      renderRamais(ramaisData); // Se vazio, mostra tudo
      return;
    }

    const filteredData = ramaisData
      .map((dept) => {
        // Filtra os itens (ramais) dentro de cada departamento
        const filteredItems = dept.items.filter((item) => {
          const name = item.nome.toLowerCase();
          const cargo = item.cargo.toLowerCase();
          const ramal = item.ramal.toLowerCase();
          const departamento = dept.departamento.toLowerCase(); // Adiciona busca por departamento

          // Verifica se o termo está no nome, cargo, ramal ou departamento
          return (
            name.includes(searchTerm) ||
            cargo.includes(searchTerm) ||
            ramal.includes(searchTerm) ||
            departamento.includes(searchTerm)
          );
        });

        // Retorna um novo objeto de departamento apenas com os itens filtrados
        return {
          departamento: dept.departamento,
          items: filteredItems,
        };
      })
      // Remove departamentos que não têm mais itens após a filtragem
      .filter((dept) => dept.items.length > 0);

    renderRamais(filteredData);
  }

  // 4. Lógica de Cópia
  function copyToClipboard(text, card) {
    if (!navigator.clipboard) {
      alert("Recurso de cópia indisponível no seu navegador.");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Feedback visual (ramal fica verde por um momento)
        card.classList.add("copied");

        setTimeout(() => {
          card.classList.remove("copied");
        }, 1500);
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
        alert("Falha ao copiar o ramal. Tente novamente.");
      });
  }

  // 5. Inicialização e Event Listeners
  renderRamais(ramaisData); // Renderiza todos os ramais ao iniciar

  // Adiciona o ouvinte de clique para a cópia no clipboard
  container.addEventListener("click", (event) => {
    const card = event.target.closest(".ramal-card");
    if (card) {
      const ramal = card.dataset.ramal;
      if (ramal) {
        copyToClipboard(ramal, card);
      }
    }
  });

  // Adiciona o ouvinte de evento para a barra de busca
  searchInput.addEventListener("keyup", filterRamais);
});