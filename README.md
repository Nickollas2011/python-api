## 1. preciso dividir esse código para ficar mais limpo e claro.
1. um para o html,
2. para as funções.
3. guardar os dados

cmd-master/
├── 📄 index.html    ← Interface (HTML puro)
├── 📄 app.js        ← Lógica e funções (CRUD)
├── 📄 data.js       ← Dados dos comandos (array)
└── 📄 README.md     ← Documentação

## Estrutura dos Arquivos

* `index.html`: Contém apenas a estrutura visual (HTML + CSS inline).
* `data.js`: Contém o array de dados inicial (pseudo banco de dados).
* `app.js`: Contém toda a lógica de programação (funções de adicionar, remover, filtrar).

## Como usar

1.  Baixe todos os arquivos para a mesma pasta.
2.  Abra o arquivo `index.html` no seu navegador.
3.  **Nota:** Não é necessário instalar nada (Node, npm, etc). Funciona nativamente.

## API gravar dados online