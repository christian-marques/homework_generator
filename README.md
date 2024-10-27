# homework_generator
Gera uma atividade dado um template passado anteriormente e um banco de dado de alunos. A ideia é inserir qual aluno se deseja fazer a atividade, a disciplina e o texto do assunto.


## Organização dos arquivos com descrição

### homework_generator/
- **backend/**: Código e lógica do backend da aplicação
  - `main.py`: Ponto de entrada principal para iniciar o servidor
  - `requirements.txt`: Dependências do projeto backend
  - **db/**: Diretório para arquivos relacionados ao banco de dados
  - **files/**: Diretório para armazenamento e modelos de arquivos
    - `template.docx`: Modelo do Word usado para geração de documentos
  - **app/**: Código da aplicação backend
    - `__init__.py`: Inicialização do aplicativo Flask
    - **src/**: Módulos principais da aplicação
      - `db.py`: Conexão e operações com o banco de dados
      - `routes.py`: Definição das rotas/endpoints da API
      - `word.py`: Lógica para manipulação e geração de arquivos Word

- **frontend/**: Código e recursos estáticos do frontend
  - `package.json`: Dependências e metadados do projeto frontend
  - **public/**: Arquivos públicos e ponto de entrada do frontend
    - `favicon.ico`: Ícone do site
    - `index.html`: Página inicial e ponto de montagem do app
    - `styles.css`: Estilos principais do app
    - **src/**: Scripts e componentes do frontend
      - `api_service.js`: Serviço para comunicação com o backend e APIs externas
      - `app.js`: Script principal que inicializa o app e configura a lógica geral
      - **pages/**: Páginas individuais da aplicação
        - `home.js`: Página inicial com o formulário de geração de Word/PDF
        - `login.js`: Página de login
        - `student_registration.js`: Página de cadastro de alunos
        - `subject_registration.js`: Página de cadastro de disciplinas
        - `template_registration.js`: Página de cadastro de templates Word
