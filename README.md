## sempre atualizar e salvar o projeto no git
> ### 1. Adicionar todos os arquivos novos ou modificados para area de stage( area de transferência ).
```
git add .
```

> ### 2. Commit --> dar um nome para sua modificação atualização pegando data e hora
```
git commit -m "titulo para lembrar oque foi feito"
```

> ### 3. Push --> Envia para sua nuvem salva de fato no Repositório.
```
git push
```

* observação power shell
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

### 4. rodar o projeto 
* > abrar o terminal e rode o test.py
```
python test.py
```

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