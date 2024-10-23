const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

// Cria um objeto com nomes de alunos como chave e notas como valor
let students_school_year = {
    "Anderson Mello": 9,
    "Andrey Mello": 7,
    "João Miguel": 2,
    "Kauê Pereira": 5,
    "Manuela Ornellas": 6,
    "Nicolly Pires": 6,
    "Rodrigo Júnior Azevedo": 2,
    "Wesley Ornellas": 8
};

function get_date(){
    // Cria um objeto com a data atual
    let current_date = new Date();

    // Obtém o dia, mês e ano
    let day = String(current_date.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda se o número for menor que 10
    let month = String(current_date.getMonth() + 1).padStart(2, '0'); // O mês começa de 0 (janeiro), por isso adicionamos 1
    let year = current_date.getFullYear(); // Obtém o ano completo (ex: 2024)

    // Formata a data no formato dd/mm/aaaa
    return `${day}/${month}/${year}`;
};

// Função para gerar o arquivo Word
function generate_file(_template_path, _output_path, _header_info, _message) {

    // Carregar o arquivo .docx como um template
    const content = fs.readFileSync(path.resolve(__dirname, _template_path), 'binary');
    
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);

    // Divida a mensagem pelas quebras de linha e crie uma estrutura de parágrafos
    const _formatted_message = _message.split('\n').map(line => ({
        text: line
    }));

    // Substituir as tags no template por valores dinâmicos
    doc.setData({
        name: _header_info[0],
        year: students_school_year[_header_info[0]],
        class: _header_info[1],
        date: get_date(),
        theme: _header_info[2].toUpperCase(),
        statement: _formatted_message // Aqui o array de linhas para o template Word
    });

    try {
        // Renderizar o documento com os dados
        doc.render();
    } catch (error) {
        console.error('Erro ao renderizar o documento', error);
    }

    // Gerar o arquivo .docx modificado
    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Salvar o arquivo
    fs.writeFileSync(path.resolve(__dirname, _output_path), buffer);
}

// Exporta a função
module.exports = generate_file;
