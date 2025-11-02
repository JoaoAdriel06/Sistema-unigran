document.addEventListener("DOMContentLoaded", () => {
  // Cor de destaque: 1 (Verde: Matrícula Grátis/Padrão), 2 (Amarelo: Regras Especiais/Desconto Fixo), 3 (Vermelho: Exclusivo)
  const courses = [
    // Cor 3: Cursos Exclusivos
    {
      name: "Odontologia",
      duration: 10,
      formacao: "Bacharel/ integral",
      investimento_integral: "R$ 3.280,00",
      desconto_pontualidade: "R$ 3.018,00",
      desconto_especial: "-",
      color: 3,
    },

    // Cor 2: Cursos com Regras/Descontos Especiais
    {
      name: "Nutrição",
      duration: 8,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.655,00",
      desconto_pontualidade: "R$ 1.523,00",
      desconto_especial: "50% - R$ 828,00",
      color: 2,
    },
    {
      name: "Gastronomia",
      duration: 4,
      formacao: "Tecnólogo/ noturno",
      investimento_integral: "R$ 1.655,00",
      desconto_pontualidade: "R$ 1.523,00",
      desconto_especial: "40% - R$ 993,00",
      color: 2,
    },
    {
      name: "Administração",
      duration: 8,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.126,00",
      desconto_pontualidade: "R$ 1.036,00",
      desconto_especial: "30% - R$ 788,00",
      color: 2,
    },
    {
      name: "Ciências Contábeis",
      duration: 8,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.126,00",
      desconto_pontualidade: "R$ 1.036,00",
      desconto_especial: "30% - R$ 788,00",
      color: 2,
    },

    // Cor 1: Demais Cursos (Matrícula Grátis/Padrão)
    {
      name: "Medicina Veterinária",
      duration: 10,
      formacao: "Bacharel/ integral",
      investimento_integral: "R$ 2.368,00",
      desconto_pontualidade: "R$ 2.179,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Arquitetura",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.655,00",
      desconto_pontualidade: "R$ 1.523,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Biomedicina",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.655,00",
      desconto_pontualidade: "R$ 1.523,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Enfermagem",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.655,00",
      desconto_pontualidade: "R$ 1.523,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Farmácia",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.655,00",
      desconto_pontualidade: "R$ 1.523,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Fisioterapia",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.655,00",
      desconto_pontualidade: "R$ 1.523,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Engenharia Civil",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.655,00",
      desconto_pontualidade: "R$ 1.523,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Agronomia",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.562,00",
      desconto_pontualidade: "R$ 1.437,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Psicologia",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.554,00",
      desconto_pontualidade: "R$ 1.430,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Direito",
      duration: 10,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.435,00",
      desconto_pontualidade: "R$ 1.320,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Engenharia de Software",
      duration: 8,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.309,00",
      desconto_pontualidade: "R$ 1.204,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Educação Física",
      duration: 8,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 1.006,00",
      desconto_pontualidade: "R$ 926,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Radiologia",
      duration: 6,
      formacao: "Tecnólogo/ noturno",
      investimento_integral: "R$ 907,00",
      desconto_pontualidade: "R$ 834,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Estética e Cosmética",
      duration: 4,
      formacao: "Tecnólogo/ noturno",
      investimento_integral: "R$ 907,00",
      desconto_pontualidade: "R$ 834,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Produção Agrícola",
      duration: 6,
      formacao: "Tecnólogo/ noturno",
      investimento_integral: "R$ 907,00",
      desconto_pontualidade: "R$ 834,00",
      desconto_especial: "-",
      color: 1,
    },
    {
      name: "Publicidade e Propaganda",
      duration: 8,
      formacao: "Bacharel/ noturno",
      investimento_integral: "R$ 907,00",
      desconto_pontualidade: "R$ 834,00",
      desconto_especial: "-",
      color: 1,
    },
  ];

  // 2. Elementos DOM
  const tableBody = document.getElementById("course-table-body");
  const searchInput = document.getElementById("course-search");

  // 3. Função de Renderização da Tabela
  function renderTable(data) {
    tableBody.innerHTML = ""; // Limpa o conteúdo atual
    // Mudança: Colspan ajustado de 4 para 6 para corresponder às colunas da tabela
    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-color-secondary);">Nenhum curso encontrado com o termo de busca.</td></tr>`;
      return;
    }

    data.forEach((course) => {
      const row = document.createElement("tr");
      // Aplica a classe de cor baseada no campo 'color'
      row.classList.add(`table-row-color-${course.color}`);

      row.innerHTML = `
                <td><b>${course.name}</b></td>
                <td>${course.duration}</td>
                <td>${course.formacao}</td>
                <td>${course.investimento_integral}</td>
                <td>${course.desconto_pontualidade}</td>
                <td>${course.desconto_especial}</td> `;
      tableBody.appendChild(row);
    });
  }

  // 4. Lógica de Busca (Filtro)
  function filterTable() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredCourses = courses.filter((course) =>
      // Filtra apenas pelo nome do curso
      course.name.toLowerCase().includes(searchTerm)
    );

    renderTable(filteredCourses);
  }

  // 5. Inicialização e Event Listeners

  // Renderiza a tabela inicial
  renderTable(courses);

  // Adiciona o ouvinte para a barra de busca
  searchInput.addEventListener("keyup", filterTable);

  // Lógica de Cópia (Reutilizada e Adaptada)
  function copyToClipboard(text, button) {
    if (!navigator.clipboard) {
      alert("Recurso de cópia indisponível no seu navegador.");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        const originalText = button.innerHTML;
        button.classList.add("copied");
        button.innerHTML = '<i class="fas fa-check"></i> Copiado!';

        setTimeout(() => {
          button.classList.remove("copied");
          button.innerHTML = originalText;
        }, 1500);
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
        alert("Falha ao copiar o texto. Tente novamente.");
      });
  }

  // Ouvinte de eventos para botões de cópia de desconto
  document.querySelectorAll(".copy-discount").forEach((button) => {
    button.addEventListener("click", () => {
      const textToCopy = button.dataset.text;
      copyToClipboard(textToCopy, button);
    });
  });
});
