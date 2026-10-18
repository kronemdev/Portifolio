const chatContainer = document.getElementById('chatbot-container');
const openChatBtn = document.getElementById('open-chat');
const closeChatBtn = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat');
const chatMessages = document.getElementById('chat-messages');

openChatBtn.addEventListener('click', () => chatContainer.classList.add('active'));
closeChatBtn.addEventListener('click', () => chatContainer.classList.remove('active'));

const knowledgeBase = {
    "c#": "O Nicolas tem focado bastante em C# e .NET. Ele está desenvolvendo APIs e estudando arquitetura de software com essas tecnologias.",
    "aws": "Ele está explorando AWS e Azure. O foco atual é computação em nuvem para deploy de aplicações .NET.",
    "projetos": "Você pode ver os projetos mais recentes dele logo acima, na seção 'Meus Projetos'.",
    "experiencia": "Ele está em formação pelo SENAI e busca sua primeira oportunidade como Desenvolvedor Back-End Júnior.",
    "contato": "Você pode falar com ele pelo LinkedIn (no topo da página) ou pelo email kronemxd@gmail.com.",
    "default": "Interessante! Ainda estou aprendendo sobre isso. Mas você pode perguntar sobre 'C#', 'AWS', 'projetos' ou 'contato'."
};

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    setTimeout(() => {
        const lowerText = text.toLowerCase();
        let response = knowledgeBase.default;

        for (const key in knowledgeBase) {
            if (lowerText.includes(key)) {
                response = knowledgeBase[key];
                break;
            }
        }
        addMessage(response, 'bot');
    }, 600);
}

sendChatBtn.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});