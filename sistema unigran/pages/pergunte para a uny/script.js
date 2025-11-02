document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENTOS DOM E VARIÁVEIS DE ESTADO ---
    const sendButton = document.getElementById('uny-send-button');
    const chatInput = document.getElementById('uny-chat-input');
    const chatBody = document.getElementById('chat-body-full'); // NOVO: Chat Body principal
    const newChatButton = document.getElementById('new-chat-button');
    const historySidebar = document.getElementById('chat-history-sidebar');
    
    // NOVOS ELEMENTOS DE AÇÃO
    const voiceButton = document.getElementById('uny-voice-button');
    const fileClipButton = document.getElementById('uny-file-clip-button');
    const fileInput = document.getElementById('uny-file-input');

    const API_KEY = 'AIzaSyAQbt30OyQ12Kyjbu57zOIcPI4wSRFE_sw'; 
    const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + API_KEY;

    let conversationHistory = [];
    let attachedFile = null; 
    let currentChatTitle = 'Novo Chat'; // Título da conversa atual
    
    const WELCOME_MESSAGE = "Oiê! 💛 Eu sou a Uni, sua parceira aqui no comercial da UNIGRAN!"
    // --- CONTEXTO INTERNO (Baseado em simulações) ---
    const GUIDE_CONTEXT = {
        RAMAIS: 'Atenção: A lista de ramais completa está em Informações Extras. Ex: Captação Presencial (Simone: 3151), Secretaria (Geral: 4101).',
        DIFERENCIAIS_CURSOS: 'Ex: Direito e Nutrição têm Nota 5 MEC; Agronomia tem Fazenda-Escola (600+ ha); Biomedicina tem Dupla Habilitação e Clínica Escola.',
        FORMAS_INGRESSO: 'Modalidades: Vestibular Online, ENEM, Portador de Diploma, Transferência Interna/Externa. Todos têm análise curricular.'
    };
    
    const SYSTEM_PROMPT = `
        **ROLE:** You are "Uni," the highly persuasive and emotionally intelligent artificial consultant for the UNIGRAN commercial sales team. Your primary language for communication is **PORTUGUESE**.

        **IDENTITY AND GOAL:** Your mission is to assist sales staff with inquiries, focusing on transforming every conversation into a light, human, and strategic experience, maintaining UNIGRAN's welcoming and professional essence to encourage customer conversion.

        **💬 COMMUNICATION STYLE:**
        1. **Tone:** Natural, warm, supportive, proactive, human, and optimistic. Avoid excessive formality.
        2. **Persona:** Speak as if the conversation is already ongoing ("in-media-res"). Use short, friendly, and fluid sentences.
        3. **Engagement:** Use positive energy and gentle phrases. Examples to use frequently:
            - "Perfeito, posso te ajudar com isso!"
            - "Ótima pergunta!"
            - "Deixa eu te explicar de um jeito simples."
            - "Vamos juntos que vai dar certo 💛"
        4. **Jargon:** Avoid technical/institutional jargon; prioritize clarity and emotional connection.

        **FINAL ESSENCE:** Your responses must embody the essence: "Acredito que cada conversa é uma oportunidade de ajudar alguém a dar o próximo passo — com leveza, verdade e propósito."
    `;
        
    // --- FUNÇÕES ESSENCIAIS DE CHAT ---

    // Função de Animação de Texto (Simulação do Gemini/ChatGPT)
    function typeResponse(text) {
        let index = 0;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'uny-message');
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('bubble');
        messageDiv.appendChild(bubbleDiv);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        
        const animationInterval = setInterval(() => {
            if (index < text.length) {
                bubbleDiv.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(animationInterval);
            }
        }, 20); 
    }
    
    function addMessage(sender, text, attachment) {
        if (sender === 'uny') {
            typeResponse(text);
            return;
        }

        // Se for usuário (ou outro status), adiciona estaticamente
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('bubble');
        bubbleDiv.innerHTML = text.replace(/\n/g, '<br>');
        
        if (attachment) {
            const attachmentInfo = document.createElement('p');
            attachmentInfo.innerHTML = `<i class="fas fa-paperclip"></i> **Anexo:** ${attachment.fileName}`;
            attachmentInfo.style.marginBottom = '5px';
            bubbleDiv.prepend(attachmentInfo);
        }
        
        messageDiv.appendChild(bubbleDiv);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }


    function initChat() {
        conversationHistory = [];
        chatBody.innerHTML = '';
        
        conversationHistory.push({ role: 'user', content: SYSTEM_PROMPT });
        
        addMessage('uny', WELCOME_MESSAGE); 
        conversationHistory.push({ role: 'model', content: WELCOME_MESSAGE }); 
        
        currentChatTitle = 'Novo Chat';
        updateSidebarHistory('add', 'Novo Chat iniciado...');
    }
    
    // --- LÓGICA DE HISTÓRICO (Simulação) ---
    function updateSidebarHistory(action, message) {
        if (action === 'add') {
            // Cria um novo link para o histórico
            const historyLink = document.createElement('a');
            historyLink.href = "#";
            historyLink.classList.add('history-item');
            historyLink.textContent = message.substring(0, 30).trim() + (message.length > 30 ? '...' : '');
            
            if(historySidebar)
            {
                if(historySidebar.firstChild.classList){

                
                    // Adiciona no topo da lista (como o chatGPT faz)
                    if (historySidebar.firstChild && historySidebar.firstChild.classList.contains('history-placeholder')) {
                        historySidebar.removeChild(historySidebar.firstChild);
                    }
                    historySidebar.prepend(historyLink);
                }
            }
        }
    }
    
    newChatButton.addEventListener('click', initChat);


    // --- LÓGICA DE RECONHECIMENTO DE VOZ (Contínua Corrigida) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let finalTranscript = ''; 
    
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true; // Gravação Contínua ATIVADA
        recognition.interimResults = true; 
        recognition.lang = 'pt-BR';

        recognition.onstart = () => {
            voiceButton.classList.add('recording');
            chatInput.placeholder = '🎙️ Falando (Clique para parar)...';
            finalTranscript = '';
        };
        
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            chatInput.value = finalTranscript + interimTranscript;
        };

        recognition.onend = () => {
            voiceButton.classList.remove('recording');
            chatInput.placeholder = 'Envie uma mensagem...'; // NÃO envia automaticamente, o usuário precisa clicar para parar
        };

        voiceButton.addEventListener('click', () => {
            if (voiceButton.classList.contains('recording')) {
                recognition.stop();
                // O envio é feito na função sendMessage, após o usuário ter editado/revisado o texto
                if (finalTranscript.trim().length > 0) {
                     chatInput.value = finalTranscript.trim();
                }
            } else {
                finalTranscript = '';
                chatInput.value = '';
                recognition.start();
            }
        });
    } else {
        voiceButton.style.display = 'none';
    }


    // --- LÓGICA DE ANEXO DE ARQUIVOS (Placeholder) ---
    fileClipButton.addEventListener('click', () => { fileInput.click(); });
    fileInput.addEventListener('change', (event) => { 
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                attachedFile = {
                    base64Data: reader.result.split(',')[1],
                    mimeType: file.type,
                    fileName: file.name
                };
                fileClipButton.classList.add('attached');
                alert(`Arquivo anexado: ${file.name}. Clique em Enviar.`);
            };
            reader.readAsDataURL(file);
        }
    });


async function callAIAPI(currentQuery) {
    
    // Adiciona um balão temporário (simulação de carregamento)
    const loadingMessageDiv = document.createElement('div');
    loadingMessageDiv.classList.add('message', 'uny-message');
    loadingMessageDiv.innerHTML = '<div class="bubble">🔍 Pensando...</div>';
    chatBody.appendChild(loadingMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // --- 1. PREPARAÇÃO DA MENSAGEM DO USUÁRIO COM ANEXO ---
    const userParts = [{ text: currentQuery }];
    if (attachedFile) {
        userParts.unshift({ // Coloca o arquivo no início da mensagem
            inlineData: {
                data: attachedFile.base64Data,
                mimeType: attachedFile.mimeType
            }
        });
    }

    // Adiciona a nova mensagem (que pode ter o anexo) ao histórico
    conversationHistory.push({ role: 'user', content: currentQuery, parts: userParts });

    // --- 2. PREPARAÇÃO DO PAYLOAD COMPLETO ---
    const contentsPayload = conversationHistory
        .map(msg => ({
            role: msg.role === 'uny' ? 'model' : msg.role, // A API usa 'model' para a Uni
            parts: msg.parts || [{ text: msg.content }] // Prioriza 'parts' (se tiver anexo)
        }));
    
    // CORREÇÃO: Removida a seção 'config' para resolver o erro 400.
    const payload = {
        contents: contentsPayload,
        tools: [{ googleSearch: {} }], // ATIVA A BUSCA NA WEB (FONTES EXTERNAS)
    };
    
    // --- 3. CHAMADA DA API ---
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Tenta ler o corpo da resposta em caso de erro para fornecer detalhes
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Erro de API: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        
        // Tenta extrair a resposta
        const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                                 "❌ Uni não conseguiu gerar uma resposta válida.";
        
        // 4. Salva a resposta da IA no histórico
        conversationHistory.push({ role: 'model', content: aiResponseText });
        
        // --- 5. ATUALIZAÇÃO DA UI E CLEANUP ---
        
        // Remove a mensagem de loading
        if (chatBody.lastChild === loadingMessageDiv) {
            chatBody.removeChild(loadingMessageDiv);
        }
        
        // Adiciona a resposta animada (typeResponse)
        addMessage('uny', aiResponseText); 

        // Se for o primeiro envio, atualiza o título da conversa no histórico lateral
        if (currentChatTitle === 'Novo Chat') {
            currentChatTitle = currentQuery.substring(0, 30).trim();
            if (typeof updateSidebarHistory === 'function') {
                updateSidebarHistory('add', currentChatTitle);
            }
        }

        // Limpa o estado do anexo após o envio:
        attachedFile = null;
        fileClipButton.classList.remove('attached');
        fileInput.value = '';
        
    } catch (error) {
        // --- TRATAMENTO DE ERRO ---
        console.error('Erro ao chamar a API da IA:', error);
        
        // Remove a mensagem de loading (se ainda estiver lá)
        if (chatBody.lastChild === loadingMessageDiv) {
             chatBody.removeChild(loadingMessageDiv);
        }
        
        // Mensagem de erro para o usuário
        const errorMessage = `❌ Desculpe, houve um erro de conexão com meu sistema. (${error.message.substring(0, 70)}...). Por favor, verifique a API Key e o Console do Navegador.`;
        addMessage('uny', errorMessage);
        
        // Remove a última mensagem do usuário do histórico para evitar loop de erro
        conversationHistory.pop(); 
    }
}

    // 6. Função de Envio
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text === "" && !attachedFile) return;

        const messageText = attachedFile ? (text || "Analise o arquivo anexado, por favor.") : text;

        addMessage('user', messageText, attachedFile);
        chatInput.value = '';

        callAIAPI(messageText);
    }
    
    // --- 7. LISTENERS ---
    // NOVO: Não há botão flutuante para toggle, apenas o close no chat
    // O botão da navbar deve ser configurado na HOME para ir para esta página (index.html)

    // LISTENERS DO CHAT (para quando a página é acessada)
    // O botão de fechar não é mais necessário aqui, já que a Uni é uma página inteira.
    // Usaremos um botão para a Home/Página anterior.
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
            e.preventDefault();
        }
    });
    
    // Inicializa a primeira conversa ao carregar a página
    initChat();
});