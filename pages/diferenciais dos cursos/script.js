document.addEventListener("DOMContentLoaded", () => {
  // 1. Dados Originais dos 24 Cursos (com ícones trocados por emojis)
  const cursosData = [
    {
      name: "ADMINISTRAÇÃO",
      info: "Duração: 8 Semestres | Grau: Bacharelado",
      icon: "🧑‍💼",
      diferenciais: [
        "UniJúnior (Empresa Júnior): Experiência prática em consultoria empresarial real desde a graduação.",
        "Laboratório de Simulações Empresariais de Última Geração: Ambiente realista para tomada de decisões gerenciais.",
        "Nota 4 no Enade: Reconhecimento de qualidade pelo MEC.",
        "Corpo Docente Qualificado: Professores com prática ativa no mercado, trazendo experiências reais para a sala de aula.",
        "Eventos Acadêmicos Atuais: Workshops, palestras e visitas técnicas frequentes com profissionais renomados.",
        "Estrutura Física Ampla: Mais de 80 mil m² com salas e laboratórios modernos.",
        "Práticas para Ideias Inovadoras: Estímulo ao empreendedorismo e inovação através de projetos práticos.",
      ],
      tags: ["UniJúnior (Empresa Júnior)", "Laboratório de Simulações", "Nota 4 MEC"],
    },
    {
      name: "AGRONOMIA",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "🚜",
      diferenciais: [
        "Formação Generalista no Agronegócio: Capacidade de atuar em todas as etapas, do planejamento à comercialização.",
        "Complexo Laboratorial Cantão do Bosque: Laboratórios especializados de fitopatologia, entomologia, solos e sementes para prática intensiva.",
        "Fazenda-Escola: Mais de 600 hectares para prática desde o início do curso, com culturas diversificadas e criações animais.",
        "Práticas Acadêmicas: AgroTec e Dia de Campo para aplicação do conhecimento em situações reais com parceiros do setor.",
        "Nota 4 MEC: Reconhecimento de qualidade e excelência.",
        "Parcerias com Empresas: Estágios e networking com empresas líderes do setor agrícola.",
        "Corpo Docente Qualificado: Mestres e doutores com experiência acadêmica e prática no agronegócio.",
      ],
      tags: ["Fazenda-Escola (600+ ha)", "Complexo Laboratorial", "Nota 4 MEC"],
    },
    {
      name: "ARQUITETURA E URBANISMO",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "📐",
      diferenciais: [
        "Laboratórios de Informática e Realidade Virtual: Ferramentas tecnológicas avançadas para desenvolvimento de projetos 3D e simulações imersivas.",
        "Laboratório de Conforto, Ateliês e Maquetaria: Espaços completos para desenvolvimento de projetos arquitetônicos com infraestrutura profissional.",
        "Projetos de Extensão: Casa do Estudante e Unigran Decor para prática real com clientes e execução de obras.",
        "Nota 4 MEC: Reconhecimento de qualidade.",
        "Corpo Docente com Experiência de Mercado: Professores arquitetos atuantes em escritórios e obras.",
        "Estrutura Física Ampla: Mais de 80 mil m² com salas e laboratórios especializados.",
      ],
      tags: ["Realidade Virtual e 3D", "Projetos de Extensão Real", "Nota 4 MEC"],
    },
    {
      name: "BIOMEDICINA",
      info: "Duração: 8 Semestres | Grau: Bacharelado",
      icon: "🔬",
      diferenciais: [
        "Nota 5 MEC: Excelência reconhecida nacionalmente, máxima avaliação de qualidade.",
        "Laboratório Escola de Análises Clínicas: Prática real com atendimento supervisionado à comunidade desde o início do curso.",
        "Clínica de Biomedicina Estética: Dupla habilitação para ampliar atuação profissional em mercado crescente.",
        "Laboratórios Avançados: Bioquímica, hematologia, microbiologia, imunologia e parasitologia com equipamentos modernos.",
        "Opção de Dupla Habilitação: Análises clínicas e estética, diferencial competitivo no mercado.",
        "Corpo Docente Qualificado: Mestres e doutores experientes com atuação em pesquisa e mercado.",
        "Estrutura Física Ampla: Mais de 80 mil m² com laboratórios especializados.",
      ],
      tags: ["Nota 5 MEC (Máxima)", "Dupla Habilitação", "Laboratório Escola"],
    },
    {
      name: "CIÊNCIAS CONTÁBEIS",
      info: "Duração: 8 Semestres | Grau: Bacharelado",
      icon: "🧮",
      diferenciais: [
        "Laboratório Especializado: Software específico para estágio e prática contábil com sistemas utilizados pelo mercado.",
        "Projeto de Extensão 'Declare Certo': Auxílio à comunidade no Imposto de Renda, proporcionando prática real.",
        "Nota 4 MEC: Reconhecimento de qualidade.",
        "Corpo Docente Qualificado: Professores com prática de mercado em contabilidade, auditoria e pericia.",
        "Estrutura Ampla: Mais de 80 mil m² com salas e laboratórios equipados.",
      ],
      tags: ["Projeto 'Declare Certo'", "Laboratório Especializado", "Nota 4 MEC"],
    },
    {
      name: "DESIGN DE INTERIORES",
      info: "Duração: 4 Semestres | Grau: Tecnólogo",
      icon: "🎨",
      diferenciais: [
        "Formação com Tecnologias e Ferramentas Modernas: Desenvolvimento de competências para utilização eficiente na produção de projetos de interiores.",
        "Projetos de Interiores Completos: Elaboração de projetos equacionando fatores estéticos, simbólicos, ergonômicos e técnicos.",
        "Atuação Versátil: Empresas de design e decoração, construtoras, galerias de arte ou atuação autônoma.",
        "Domínio de Representação Gráfica: Plantas, cortes, perspectivas, projetos de ocupação e mobiliário.",
        "Eventos Acadêmicos: Temas da atualidade conectando estudantes ao mercado.",
        "Corpo Docente Experiente: Professores conectados com o mercado de design e decoração.",
      ],
      tags: ["Projetos de Interiores Completos", "Tecnologias Modernas", "Domínio Gráfico"],
    },
    {
      name: "DIREITO",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "⚖️",
      diferenciais: [
        "Nota 5 MEC: Máxima avaliação de qualidade, reconhecimento de excelência.",
        "Mais de 45 Anos de Tradição: Curso pioneiro e consolidado na região, com histórico de sucesso.",
        "Núcleo de Prática e Assistência Jurídica (NPJ): Atuação real supervisionada atendendo a comunidade.",
        "Corpo Docente Qualificado: Professores com prática ativa no mercado jurídico (advogados, juízes, promotores).",
        "Egressos de Destaque: Ex-alunos bem-sucedidos ocupando posições de liderança no mercado.",
        "Formação Humanista e Integral: Preparação crítica e ética para atuação responsável.",
        "Estrutura Ampla e Moderna: Mais de 80 mil m² com salas, biblioteca e NPJ.",
        "Amplo Acervo Físico e Digital: Biblioteca completa para pesquisa jurídica com milhares de títulos.",
      ],
      tags: ["Nota 5 MEC (Máxima)", "45+ Anos de Tradição", "Núcleo de Prática Jurídica (NPJ)"],
    },
    {
      name: "EDUCAÇÃO FÍSICA - BACHARELADO",
      info: "Duração: 8 Semestres | Grau: Bacharelado",
      icon: "🏋️‍♀️",
      diferenciais: [
        "Complexo Esportivo de Mais de 8 Mil m²: Quadras poliesportivas, campos de futebol, piscina semiolímpica, academia moderna e sala de dança.",
        "Estrutura Olímpica: Instalações de alto nível para prática esportiva profissional.",
        "Laboratórios Práticos: Anatomia e fisiologia do exercício para estudos aplicados.",
        "Prática Oligran: Movimento universitário de socialização e vivência esportiva integrando alunos.",
        "Atuação Profissional Ampla: Academias, clubes, turismo esportivo e área médica.",
        "Corpo Docente Qualificado: Professores com experiência prática em diferentes modalidades.",
      ],
      tags: ["Complexo Esportivo 8 Mil m²", "Estrutura Olímpica", "Prática Oligran"],
    },
    {
      name: "EDUCAÇÃO FÍSICA - LICENCIATURA",
      info: "Duração: 8 Semestres | Grau: Licenciatura",
      icon: "🏫",
      diferenciais: [
        "Nota 4 MEC: Reconhecimento de qualidade e excelência acadêmica.",
        "Complexo Esportivo de Mais de 8 Mil m²: Quadras cobertas, campos, estúdio de pilates, piscina semiolímpica, academia moderna e sala de dança.",
        "Laboratórios Práticos: Anatomia e fisiologia para formação completa em dinâmica do corpo humano.",
        "Prática Oligran: Movimento universitário de socialização através de competições desportivas.",
        "Estrutura Olímpica de Ponta: Instalações de alto nível para formação de educadores.",
        "Formação para Docência: Capacitação para atuar no ensino infantil, fundamental, médio e superior.",
      ],
      tags: ["Formação para Docência", "Complexo Esportivo 8 Mil m²", "Nota 4 MEC"],
    },
    {
      name: "ENFERMAGEM",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "🩺",
      diferenciais: [
        "Alta Avaliação MEC (Nota 4): Curso referência no Mato Grosso do Sul.",
        "Laboratórios Práticos Completos: Semiologia, Semiotécnica, UTI e Centro Cirúrgico para simulações realistas.",
        "Consultório de Enfermagem: Atendimento real supervisionado à comunidade.",
        "Laboratórios de Saúde da Mulher e Criança: Especialização desde a graduação em áreas críticas.",
        "Simuladores Modernos: Tecnologia avançada para prática realista com manequins de alta fidelidade.",
        "Ampla Variedade de Estágios Supervisionados: Hospitais, clínicas e instituições parceiras em diversas especialidades.",
        "Corpo Docente Qualificado: Mestres, doutores e profissionais atuantes no mercado.",
      ],
      tags: ["Consultório de Enfermagem", "Laboratórios UTI/C.Cirúrgico", "Nota 4 MEC"],
    },
    {
      name: "ENGENHARIA CIVIL",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "🏗️",
      diferenciais: [
        "Laboratórios Especializados: Materiais de construção, solos, hidráulica e estruturas com equipamentos modernos.",
        "Prática em Construção Real: Convênio CREA-MS e empresas parceiras para vivência em obras.",
        "Projeto Integrador: Desenvolvimento contínuo e aplicado ao longo de todo o curso.",
        "Salas Temáticas: CAD, BIM e topografia com softwares profissionais.",
        "Nota 4 MEC: Reconhecimento de qualidade.",
        "Corpo Docente com Prática Profissional: Professores engenheiros conectados ao mercado.",
      ],
      tags: ["Prática em Construção Real", "Salas BIM/CAD/Topografia", "Nota 4 MEC"],
    },
    {
      name: "ENGENHARIA DE SOFTWARE",
      info: "Duração: 8 Semestres | Grau: Bacharelado",
      icon: "💻",
      diferenciais: [
        "Formação Completa: Do planejamento à manutenção de software, abrangendo todo o ciclo de vida.",
        "Matriz Curricular em Tecnologias Disruptivas: Preparação para o futuro do mercado com IA, cloud computing e DevOps.",
        "Grade Moderna: Engenharia de requisitos, arquitetura de software, bancos de dados, segurança da informação e metodologias ágeis.",
        "Aprendizado Prático: Projetos reais durante a graduação com desenvolvimento de portfólio profissional.",
        "Laboratórios de Informática e Inovação: Ferramentas e softwares atuais do mercado.",
        "Práticas Avançadas: Hackathon, desafios de inovação e empresa júnior.",
        "Mercado de Trabalho Diversificado: Desenvolvimento, arquitetura, análise de sistemas e gestão de TI.",
      ],
      tags: ["Tecnologias Disruptivas (IA/DevOps)", "Projetos Reais e Portfólio", "Práticas Avançadas"],
    },
    {
      name: "ENGENHARIA MECÂNICA",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "⚙️",
      diferenciais: [
        "Nota 4 MEC: Reconhecimento de qualidade e excelência.",
        "Laboratórios de Alta Tecnologia: Todas as áreas do conhecimento de Engenharia Mecânica com equipamentos modernos.",
        "Formação Completa: Projetar, desenvolver e inspecionar fabricação de maquinários e sistemas mecânicos.",
        "Estrutura Completa: Equipamentos essenciais para vivência prática profissional desde o início do curso.",
        "Corpo Docente Qualificado: Maioria mestres e doutores com prática de mercado.",
        "Grade Curricular Interdisciplinar: Física, termodinâmica, mecânica de fluidos, transmissão de calor e resistência dos materiais.",
        "Atuação Ampla: Indústrias automobilística, aeronáutica, naval, petroquímica, metalúrgica e energética.",
      ],
      tags: ["Laboratórios de Alta Tecnologia", "Formação Completa", "Nota 4 MEC"],
    },
    {
      name: "ESTÉTICA E COSMÉTICA",
      info: "Duração: 4 Semestres | Grau: Tecnólogo",
      icon: "✨",
      diferenciais: [
        "Clínica-Escola Moderna: Atendimento real supervisionado desde o início do curso.",
        "Laboratórios de Cosmetologia: Práticas corporais e faciais com equipamentos profissionais.",
        "Parcerias com Marcas e Profissionais: Conexão direta com o mercado de estética.",
        "Alto Índice de Empregabilidade: Mercado aquecido na região com demanda crescente.",
        "Corpo Docente Especialista: Professores com experiência prática e acadêmica em estética avançada.",
      ],
      tags: ["Clínica-Escola Moderna", "Laboratórios de Cosmetologia", "Alto Índice de Empregabilidade"],
    },
    {
      name: "FARMÁCIA",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "💊",
      diferenciais: [
        "Alta Avaliação MEC (Nota 5): Reconhecimento nacional de excelência, máxima avaliação.",
        "Farmácia Escola: Manipulação de medicamentos alopáticos, fitoterápicos e homeopáticos com atendimento real.",
        "Laboratórios Instrumentais Completos: Análises clínicas, química farmacêutica e farmacotécnica.",
        "Parceria com Centro de Especialidades Farmacêuticas: Prática profissional real em dispensação.",
        "Simulação Prática: Atendimentos farmacêuticos supervisionados com casos reais.",
        "Corpo Docente Experiente: Mestres e doutores com prática de mercado em farmácias e hospitais.",
      ],
      tags: ["Nota 5 MEC (Máxima)", "Farmácia Escola (Manipulação)", "Laboratórios Instrumentais"],
    },
    {
      name: "FISIOTERAPIA",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "🏃‍♀️",
      diferenciais: [
        "Clínica Escola de 2.200 m²: Atendimento real conveniado ao SUS com grande volume de pacientes.",
        "Formação Completa: Ortopedia, neurologia, pediatria, cardiorrespiratória, dermatofuncional e mais.",
        "Laboratórios Especializados: Biomecânica, eletrotermofototerapia e cinesioterapia com equipamentos modernos.",
        "Estágios Supervisionados: UTIs, hospitais e atendimentos complexos em diferentes especialidades.",
        "Convênios para Estágio: Hospitais, clínicas, APAE e instituições de reabilitação.",
        "Corpo Docente Qualificado: Mestres e doutores com atuação em projetos específicos de pesquisa.",
      ],
      tags: ["Clínica Escola (2.200 m²)", "Convênios com SUS/APAE", "Laboratórios Especializados"],
    },
    {
      name: "GASTRONOMIA",
      info: "Duração: 4 Semestres | Grau: Tecnólogo",
      icon: "🍳",
      diferenciais: [
        "Cozinha Laboratório Ampla e Moderna: Prática desde o primeiro semestre com equipamentos profissionais.",
        "Práticas em Eventos Reais: Festivais, feiras gastronômicas e banquetes para clientes reais.",
        "Parcerias com Chefs e Restaurantes Renomados: Conexão direta com mercado regional e nacional.",
        "Prática Empreendedora: Desenvolvimento de negócios gastronômicos e food trucks.",
        "Corpo Docente Especializado: Aulas com profissionais reconhecidos e premiados do mercado.",
      ],
      tags: ["Cozinha Laboratório Moderna", "Práticas em Eventos Reais", "Prática Empreendedora (Food Trucks)"],
    },
    {
      name: "MEDICINA VETERINÁRIA",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "🐾",
      diferenciais: [
        "Fazenda Escola Integrada: Prática em ambiente real com criações de bovinos, equinos e pequenos animais.",
        "Clínica Veterinária: Atendimento supervisionado à comunidade em clínica médica e cirúrgica.",
        "Laboratórios Variados: Reprodução animal, microbiologia veterinária e diagnóstico por imagem.",
        "Estágio em Hospitais, Clínicas e Campo: Experiência completa em diferentes áreas de atuação.",
        "Corpo Docente Especializado: Professores veterinários com prática ativa em clínicas e campo.",
      ],
      tags: ["Fazenda Escola Integrada", "Clínica Veterinária", "Laboratórios Variados"],
    },
    {
      name: "NUTRIÇÃO",
      info: "Duração: 8 Semestres | Grau: Bacharelado",
      icon: "🍎",
      diferenciais: [
        "Alta Avaliação MEC (Nota 5): Um dos melhores cursos do estado e do país, reconhecimento máximo.",
        "Clínica de Nutrição: Atendimento real a diversos públicos (gestantes, atletas, idosos, crianças).",
        "Laboratório de Análises de Alimentos: Prática completa em bromatologia e análise nutricional.",
        "Estágio Supervisionado: Instituições públicas e privadas (hospitais, escolas, unidades de saúde).",
        "Corpo Docente Experiente: Mestres e doutores comprometidos com formação de qualidade.",
      ],
      tags: ["Nota 5 MEC (Máxima)", "Clínica de Nutrição", "Laboratório de Análises de Alimentos"],
    },
    {
      name: "ODONTOLOGIA",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "🦷",
      diferenciais: [
        "Clínica Odontológica Moderna e Completa: Atendimento real desde cedo com equipamentos de ponta.",
        "Laboratórios Especializados: Anatomia dental, materiais dentários e prótese.",
        "Estágio em Unidades Básicas de Saúde: Atendimento à comunidade no SUS.",
        "Eventos Práticos: Semana Odontológica e campanhas de prevenção e saúde bucal.",
        "Corpo Docente com Titulação: Professores qualificados com especialização, mestrado e doutorado.",
      ],
      tags: ["Clínica Odontológica Moderna", "Estágio em UBS (SUS)", "Laboratórios Especializados"],
    },
    {
      name: "PRODUÇÃO AGRÍCOLA",
      info: "Duração: 6 Semestres | Grau: Tecnólogo",
      icon: "🌾",
      diferenciais: [
        "Formação Prática e Direcionada: Foco em gestão e otimização agrícola para rápida inserção no mercado.",
        "Laboratórios e Fazenda-Escola: Fitopatologia, entomologia, solos e sementes em 600+ hectares.",
        "Projetos de Extensão: AgroTec e Dia de Campo com empresas parceiras.",
        "Parcerias com Grandes Empresas do Setor: Networking e oportunidades de estágio.",
        "Corpo Docente Experiente: Vivência prática e acadêmica no agronegócio.",
      ],
      tags: ["Fazenda-Escola (600+ ha)", "Formação Prática Direcionada", "Projetos de Extensão (AgroTec)"],
    },
    {
      name: "PSICOLOGIA",
      info: "Duração: 10 Semestres | Grau: Bacharelado",
      icon: "🧠",
      diferenciais: [
        "Clínica-Escola: Estágios supervisionados com atendimento gratuito à comunidade em diversas abordagens.",
        "Formação Generalista e Crítica: Psicologia clínica, organizacional, escolar, hospitalar e social.",
        "Laboratórios Especializados: Neurociências, psicoterapia e avaliação psicológica com instrumentos validados.",
        "Projetos de Extensão e Iniciação Científica: Pesquisa e ações sociais em comunidades.",
        "Corpo Docente Experiente: Mestrado, doutorado e prática profissional ativa em diferentes áreas.",
      ],
      tags: ["Clínica-Escola (Atendimento Gratuito)", "Laboratórios Neurociências/Psicoterapia", "Formação Generalista"],
    },
    {
      name: "PUBLICIDADE E PROPAGANDA",
      info: "Duração: 8 Semestres | Grau: Bacharelado",
      icon: "📢",
      diferenciais: [
        "Agência Experimental: Prática real com campanhas e clientes desde o início do curso.",
        "Ênfase em Publicidade Digital e Marketing de Conteúdo: Preparação para mercado atual com foco em redes sociais.",
        "Laboratórios e Estúdios Equipados: Fotografia, vídeo, design gráfico, rádio e podcast profissionais.",
        "Eventos Práticos: Semanas temáticas e campanhas reais para empresas da região.",
        "Corpo Docente Experiente: Prática ativa no mercado de comunicação em agências e veículos.",
        "Amplo Mercado de Trabalho: Agências de publicidade, marketing digital, assessoria de imprensa e consultoria.",
      ],
      tags: ["Agência Experimental", "Ênfase Digital/Marketing Conteúdo", "Laboratórios e Estúdios Equipados"],
    },
    {
      name: "RADIOLOGIA",
      info: "Duração: 6 Semestres | Grau: Tecnólogo",
      icon: "☢️",
      diferenciais: [
        "Parcerias com Clínicas, Hospitais e Centros de Imagem: Estágio garantido em instituições renomadas.",
        "Laboratórios Equipados: Simulações reais com equipamentos profissionais de radiologia.",
        "Estágio Supervisionado com Prática Real: Experiência direta no mercado de diagnóstico por imagem.",
        "Treinamento em Equipamentos Avançados: Tomografia computadorizada, ressonância magnética, mamografia.",
        "Corpo Docente Especializado: Professores com atuação ativa no mercado de radiologia.",
      ],
      tags: ["Parcerias com Hospitais/Clínicas", "Treinamento em Equipamentos Avançados", "Laboratórios Equipados"],
    },
  ];

  // 2. Elementos DOM
  const container = document.getElementById("course-list-container");
  const searchInput = document.getElementById("course-search");
  const noResultsMessage = document.getElementById("no-results-message");

  // 3. Funções de Renderização
  
  /**
   * Determina a classe da tag com base no conteúdo (priorizando MEC/ENADE).
   */
  function getTagClass(text) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("nota 5 mec") || lowerText.includes("nota 5")) {
        return "mec"; // Verde
    }
    if (lowerText.includes("nota 4 mec") || lowerText.includes("nota 4")) {
        return "mec"; // Verde
    }
    if (lowerText.includes("laboratório") || lowerText.includes("clínica") || lowerText.includes("fazenda-escola") || lowerText.includes("infraestrutura") || lowerText.includes("npj")) {
        return "secundary"; // Azul para prática/infra
    }
    return "primary"; // Amarelo para demais destaques
  }
  
  /**
   * Renderiza os cards de curso no container.
   */
  function renderCards(data) {
    container.innerHTML = ""; // Limpa o container
    
    if (data.length === 0) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
    
    // Emojis numéricos para a lista
    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];
    
    data.forEach(curso => {
        // Renderiza as tags (3 primeiros diferenciais)
        const tagsHtml = curso.tags.map(tag => {
            const tagClass = getTagClass(tag);
            return `<div class="tag-item ${tagClass}">${tag}</div>`;
        }).join('');
        
        // Renderiza a lista completa de diferenciais com emojis
        const diferenciaisListHtml = curso.diferenciais.map((d, index) => `
            <li>
                <span class="list-emoji">${emojis[index] || '🔹'}</span>
                <span class="list-text">${d}</span>
            </li>
        `).join('');
        
        // Cria os termos de busca para o filtro
        const searchTerms = `${curso.name.toLowerCase()} ${curso.info.toLowerCase()} ${curso.diferenciais.join(' ').toLowerCase()}`;

        const cardHtml = `
            <div class="curso-card" data-search-terms="${searchTerms}">
                <div>
                    <div class="course-header">
                        <span class="curso-icon">${curso.icon}</span>
                        <div class="course-info">
                            <h3>${curso.name}</h3>
                            <p>${curso.info}</p>
                        </div>
                    </div>

                    <div class="diferenciais-tags">
                        ${tagsHtml}
                    </div>
                </div>

                <ul class="diferenciais-list">
                    ${diferenciaisListHtml}
                </ul>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
  }

  // 4. Lógica de Busca (Filtro)
  function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll(".course-card");
    let visibleCount = 0;

    allCards.forEach(card => {
        const cardText = card.dataset.searchTerms;
        if (cardText.includes(searchTerm)) {
            card.style.display = "flex"; // "flex" para manter o layout do card
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });
    
    if (visibleCount === 0) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
  }

  // 5. Inicialização e Event Listeners
  
  renderCards(cursosData); // Renderiza todos os cursos ao iniciar

  // Adiciona o ouvinte de evento para a barra de busca
  searchInput.addEventListener("keyup", filterCourses);
});