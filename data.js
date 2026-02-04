// Banco de dados inicial
// Esta variável "comandos" será acessada globalmente pelo app.js

const dbInicial = [
    { id: 5,  cat: "Gestão",  color: "yellow", code: "tasklist",            title: "Listar Processos", desc: "Exibe todos os processos rodando no sistema.", favorito: false },
    { id: 8,  cat: "Energia", color: "purple", code: "shutdown /r /t 0",    title: "Reiniciar Agora", desc: "Reinicia o computador imediatamente.", favorito: false },
    { id: 10, cat: "Util",    color: "gray",   code: "cls",                 title: "Limpar Tela", desc: "Limpa a poluição visual do terminal.", favorito: false },
    { id: 11, cat: "Rede",    color: "cyan",   code: "tracert google.com",  title: "Rastrear Rota", desc: "Mostra o caminho percorrido até o destino.", favorito: false },
];

// Inicializa a variável global que será usada no app
// Se quiser adicionar persistência no futuro (localStorage), a lógica começaria aqui.
let comandos = [...dbInicial];