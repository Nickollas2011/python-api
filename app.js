// ============================================
// VARIÁVEIS DE ESTADO
// ============================================
let editandoId = null;

// ============================================
// 1. RENDERIZAÇÃO (READ)
// ============================================
function renderizarCards() {
    const container = document.getElementById('grid-container');
    const busca = document.getElementById('campoBusca').value.toLowerCase().trim();
    const soFavoritos = document.getElementById('filtroFav').checked;
    const mensagemVazia = document.getElementById('mensagemVazia');
    
    container.innerHTML = '';

    // Filtrar comandos
    let filtrados = comandos.filter(item => {
        // Filtro de busca
        const matchBusca = !busca || 
            item.title.toLowerCase().includes(busca) ||
            item.code.toLowerCase().includes(busca) ||
            item.cat.toLowerCase().includes(busca) ||
            item.desc.toLowerCase().includes(busca);
        
        // Filtro de favoritos
        const matchFav = !soFavoritos || item.favorito;
        
        return matchBusca && matchFav;
    });

    // Ordenar: favoritos primeiro
    filtrados.sort((a, b) => b.favorito - a.favorito);

    // Atualizar contador
    document.getElementById('contadorResultados').textContent = 
        busca || soFavoritos ? `${filtrados.length} resultado${filtrados.length !== 1 ? 's' : ''}` : `${comandos.length} total`;

    // Mostrar mensagem vazia
    if (filtrados.length === 0) {
        mensagemVazia.classList.remove('hidden');
        return;
    } else {
        mensagemVazia.classList.add('hidden');
    }

    // Renderizar cards
    filtrados.forEach(item => {
        const colors = {
            cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-500",
            emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-500",
            yellow: "text-yellow-400 bg-yellow-400/10 border-yellow-500",
            red: "text-red-400 bg-red-400/10 border-red-500",
            purple: "text-purple-400 bg-purple-400/10 border-purple-500",
            blue: "text-blue-400 bg-blue-400/10 border-blue-500",
            gray: "text-gray-400 bg-gray-400/10 border-gray-500"
        };
        
        const theme = colors[item.color] || colors.gray;
        const [txtColor, bgColor, borderColor] = theme.split(" ");
        
        const starClass = item.favorito ? "text-yellow-400 fill-yellow-400" : "text-slate-600 hover:text-yellow-400";

        const html = `
        <div class="card-anim relative bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-500 shadow-lg group flex flex-col h-full">
            
            <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold uppercase tracking-wider ${bgColor} ${txtColor} px-2 py-1 rounded">
                    ${item.cat}
                </span>
                
                <div class="flex items-center gap-1">
                    <button onclick="toggleFavorito(${item.id})" class="transition-colors duration-200 p-1.5 rounded-lg hover:bg-slate-700" title="${item.favorito ? 'Remover favorito' : 'Adicionar favorito'}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${starClass}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="${item.favorito ? 'currentColor' : 'none'}">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </button>
                    
                    <button onclick="editarComando(${item.id})" class="text-slate-500 hover:text-cyan-400 p-1.5 rounded-lg hover:bg-slate-700" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    
                    <button onclick="deletarComando(${item.id})" class="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-700" title="Excluir">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="relative mb-3">
                <code class="block bg-[#0b1120] ${txtColor.replace('400', '300')} p-3 rounded-lg text-sm border-l-4 ${borderColor.replace('text-', 'border-')} shadow-inner font-mono break-all cursor-pointer hover:brightness-110 transition-all" onclick="copiarComando('${item.code.replace(/'/g, "\\'")}')" title="Clique para copiar">
                    ${item.code}
                </code>
            </div>

            <h3 class="text-lg font-bold text-white mb-1">${item.title}</h3>
            <p class="text-slate-400 text-sm leading-relaxed flex-grow">${item.desc}</p>
        </div>
        `;
        container.innerHTML += html;
    });
}

// ============================================
// 2. MODAL & CRUD
// ============================================
function abrirModal(id = null) {
    const overlay = document.getElementById('modal-overlay');
    const titulo = document.getElementById('modalTitulo');
    
    overlay.classList.remove('hidden-modal');
    overlay.classList.add('visible-modal');
    
    if (id) {
        // Modo Edição
        const item = comandos.find(c => c.id === id);
        if (!item) return;
        
        editandoId = id;
        titulo.textContent = "Editar Comando";
        document.getElementById('inpCat').value = item.cat;
        document.getElementById('inpTitle').value = item.title;
        document.getElementById('inpCode').value = item.code;
        document.getElementById('inpDesc').value = item.desc;
        document.getElementById('inpColor').value = item.color;
    } else {
        // Modo Criação
        editandoId = null;
        titulo.textContent = "Adicionar Novo Comando";
        limparFormulario();
    }
    
    document.getElementById('inpCat').focus();
}

function fecharModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('visible-modal');
    overlay.classList.add('hidden-modal');
    limparFormulario();
    editandoId = null;
}

function limparFormulario() {
    document.getElementById('inpCat').value = '';
    document.getElementById('inpTitle').value = '';
    document.getElementById('inpCode').value = '';
    document.getElementById('inpDesc').value = '';
    document.getElementById('inpColor').value = 'cyan';
}

function salvarComando() {
    const cat = document.getElementById('inpCat').value.trim() || "Geral";
    const title = document.getElementById('inpTitle').value.trim();
    const code = document.getElementById('inpCode').value.trim();
    const desc = document.getElementById('inpDesc').value.trim();
    const color = document.getElementById('inpColor').value;

    if (!title || !code) {
        alert("Título e Comando são obrigatórios!");
        return;
    }

    if (editandoId) {
        // UPDATE
        const index = comandos.findIndex(c => c.id === editandoId);
        if (index !== -1) {
            comandos[index] = { 
                ...comandos[index], 
                cat, title, code, desc, color 
            };
        }
    } else {
        // CREATE
        const novoItem = {
            id: Date.now(),
            cat,
            color,
            code,
            title,
            desc: desc || "Sem descrição.",
            favorito: false
        };
        comandos.unshift(novoItem);
    }

    fecharModal();
    renderizarCards();
}

function deletarComando(id) {
    const item = comandos.find(c => c.id === id);
    if (!item) return;
    
    if (confirm(`Tem certeza que deseja excluir "${item.title}"?`)) {
        comandos = comandos.filter(c => c.id !== id);
        renderizarCards();
    }
}

// ============================================
// 3. UTILITÁRIOS
// ============================================
function toggleFavorito(id) {
    const index = comandos.findIndex(c => c.id === id);
    if (index !== -1) {
        comandos[index].favorito = !comandos[index].favorito;
        renderizarCards();
    }
}

function editarComando(id) {
    abrirModal(id);
}

function limparFiltros() {
    document.getElementById('campoBusca').value = '';
    document.getElementById('filtroFav').checked = false;
    renderizarCards();
}

function copiarComando(code) {
    navigator.clipboard.writeText(code).then(() => {
        const original = event.target.textContent;
        event.target.textContent = "✓ Copiado!";
        event.target.classList.add('text-emerald-400');
        setTimeout(() => {
            event.target.textContent = original;
            event.target.classList.remove('text-emerald-400');
        }, 1000);
    });
}

// ============================================
// 4. INICIALIZAÇÃO E EVENTOS
// ============================================

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") fecharModal();
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        document.getElementById('campoBusca').focus();
    }
});

// Inicializar App
// (Garante que o DOM carregou antes de renderizar)
document.addEventListener('DOMContentLoaded', () => {
    renderizarCards();
});