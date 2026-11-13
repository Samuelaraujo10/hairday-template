# ✂️ Hair Day — Sistema de Agendamento para Barbearia

O **Hair Day** é uma aplicação web desenvolvida para gerenciar o agendamento de atendimentos em uma barbearia. O sistema permite selecionar uma data, visualizar apenas os horários disponíveis em tempo real, cadastrar o atendimento de um cliente e cancelar agendamentos existentes, dividindo a agenda nos períodos da **Manhã**, **Tarde** e **Noite**.

---

## ✨ Funcionalidades

- **Validação Inteligente de Datas e Horários:**
  - Define automaticamente a data atual ao abrir a página e bloqueia datas passadas no calendário.
  - Desabilita automaticamente horários que já passaram no dia de hoje ou que já possuem cliente agendado.
- **Criação de Agendamentos:**
  - Seleção visual de horário disponível (`.hour-selected`) e validação de campos obrigatórios.
  - Persistência dos agendamentos em uma API REST simulada com **JSON Server**.
- **Listagem por Períodos do Dia:**
  - Organização automática dos atendimentos em **Manhã** (`09h–12h`), **Tarde** (`13h–18h`) e **Noite** (`19h–21h`).
- **Cancelamento de Agendamentos:**
  - Exclusão de agendamentos com confirmação em modal personalizado e liberação imediata do horário na grade.
- **Notificações Personalizadas (Toasts & Modal):**
  - Alertas flutuantes animados para feedbacks de sucesso, atenção e erro, seguindo a identidade visual escura e dourada do projeto.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **HTML5 & CSS3:** Estruturação semântica, CSS Grid, Flexbox e animações (`@keyframes`).
- **JavaScript (ES6+):** Módulos ES (`import`/`export`), `async/await`, `fetch` API, manipulação da DOM e delegação de eventos.
- **[Day.js](https://day.js.org/):** Manipulação, formatação e comparação de datas e horários (`isBefore`, `isSame`, `add`, `format`).
- **[JSON Server](https://github.com/typicode/json-server):** Simulação de uma API REST (`GET`, `POST`, `DELETE`) utilizando o arquivo `server.json` como banco de dados.
- **[Webpack](https://webpack.js.org/) & [Babel](https://babeljs.io/):** Empacotamento dos módulos JS/CSS/Assets, servidor de desenvolvimento com *Live Reload* e transpilação do código para compatibilidade entre navegadores.

---

## 📂 Estrutura de Pastas e Arquivos (Guia de Estudo)

```text
hairday-template/
├── index.html                        # Estrutura base da interface (Formulário + Agenda)
├── server.json                       # Banco de dados em JSON consumido pelo json-server
├── webpack.config.js                 # Configuração do empacotador Webpack e Babel
├── package.json                      # Dependências e scripts do projeto
└── src/
    ├── main.js                       # Ponto de entrada: importa CSS, Day.js e módulos JS
    ├── libs/
    │   └── dayjs.js                  # Configura o idioma pt-br no Day.js
    ├── services/                     # Camada de comunicação com a API (fetch)
    │   ├── api-config.js             # Guarda a URL base da API (http://localhost:3333)
    │   ├── schedule-fetch-by-day.js  # [GET] Busca agendamentos e filtra pelo dia escolhido
    │   ├── schedule-new.js           # [POST] Salva um novo agendamento na API
    │   └── schedule-cancel.js        # [DELETE] Remove um agendamento pelo ID
    ├── modules/                      # Regras de negócio e manipulação da DOM
    │   ├── page-load.js              # Dispara o carregamento inicial quando o DOM fica pronto
    │   ├── form/
    │   │   ├── submit.js             # Valida e envia o formulário de novo agendamento
    │   │   ├── hours-load.js         # Calcula e renderiza horários livres/ocupados na tela
    │   │   ├── hours-click.js        # Gerencia o clique de seleção em um horário disponível
    │   │   └── date-change.js        # Recarrega a agenda quando o usuário muda a data
    │   └── schedules/
    │       ├── load.js               # Orquestra a busca na API e a atualização da tela
    │       ├── show.js               # Renderiza os agendamentos nas listas Manhã/Tarde/Noite
    │       └── cancel.js             # Captura o clique no ícone "X" e cancela o agendamento
    ├── utils/
    │   ├── opening-hours.js          # Array com os horários de funcionamento (09:00 às 21:00)
    │   └── notify.js                 # Sistema de notificações Toast e Modal de confirmação
    └── styles/                       # Estilização modularizada
        ├── global.css                # Reset, fontes, barra de rolagem e layout em Grid
        ├── form.css                  # Estilos do formulário e botões de horários
        ├── schedule.css              # Estilos da listagem de agendamentos por turno
        └── toast.css                 # Estilos dos Toasts e do Modal de confirmação
```

---

## 🔄 Fluxo da Aplicação (Para Memorizar)

1. **Carregamento Inicial (`page-load.js` -> `schedules/load.js`):**
   - Assim que a página abre (`DOMContentLoaded`), a função `schedulesDay()` é chamada.
2. **Busca de Dados (`schedule-fetch-by-day.js`):**
   - Lê a data que está no `<input id="date">` e busca na API (`GET /schedules`) todos os agendamentos daquele dia específico.
3. **Exibição na Tela (`schedules/show.js` e `form/hours-load.js`):**
   - `schedulesShow()` desenha os clientes agendados nas seções **Manhã**, **Tarde** e **Noite**.
   - `hoursLoad()` cruza a lista de horários (`openingHours`) com os horários já ocupados e com a hora atual do relógio, liberando apenas os horários futuros e vagos.
4. **Interação do Usuário:**
   - **Trocar a data (`date-change.js`):** Chama `schedulesDay()` novamente para atualizar tudo para o novo dia.
   - **Agendar (`submit.js` -> `schedule-new.js`):** Faz um `POST /schedules` e depois chama `schedulesDay()` para atualizar a tela na hora.
   - **Cancelar (`cancel.js` -> `schedule-cancel.js`):** Abre o modal de confirmação, faz um `DELETE /schedules/:id` e chama `schedulesDay()` para liberar o horário.

---

## 🚀 Como Executar o Projeto

### 1. Instalar as dependências
```bash
npm install
```

### 2. Iniciar o servidor da API (JSON Server)
Em um terminal, execute:
```bash
npm run server
```
> A API ficará rodando em `http://localhost:3333`.

### 3. Iniciar o servidor de desenvolvimento (Webpack Dev Server)
Em outro terminal, execute:
```bash
npm run dev
```
> A aplicação abrirá automaticamente em `http://localhost:3000`.

### 4. Gerar a versão de build (opcional)
```bash
npm run build
```
> Os arquivos otimizados serão gerados na pasta `dist/`.

