const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Importe a função do arquivo funcoes.js
const generate_file = require('./app');

var student_name = ""
var class_name = ""
var message = ""
var theme = ""

// Middleware para lidar com o corpo do POST
app.use(bodyParser.urlencoded({ extended: false }));

// Serve o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Rota para lidar com o envio do formulário
app.post('/submit', (req, res) => {
    student_name = req.body.nome;
    class_name = req.body.disciplina;
    theme = req.body.tema;
    message = req.body.enunciado;

    // Aqui você pode processar ou salvar os dados
    // console.log(`Nome: ${student_name}`);
    // console.log(`Disciplina: ${class_name}`);
    // console.log(`Enunciado: ${message}`);

    generate_file('../files/template.docx', '../files/output.docx', [student_name, class_name, theme], message);

    // Envia uma resposta ao usuário
    // res.send(`<h1>Dados recebidos com sucesso!</h1><p>Nome do Aluno: ${student_name}</p><p>Disciplina: ${class_name}</p><p>Enunciado: ${message}</p>`);

    const filePath = path.resolve(__dirname, 'public', '../../files/output.docx');

    // Enviar o arquivo para o cliente fazer o download
    res.download(filePath, 'output.docx', (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(500).send('Erro ao enviar o arquivo.');
        }
    });
});

// Inicia o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
