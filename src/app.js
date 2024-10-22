const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

// Carregar o arquivo .docx como um template
const content = fs.readFileSync(path.resolve(__dirname, '../files/template.docx'), 'binary');

const zip = new PizZip(content);

const doc = new Docxtemplater(zip);

// Substituir as tags no template por valores dinâmicos
doc.setData({
    name: 'Christian Marques',
    year: '1º',
    class: 'Matemática',
    date: '21/10/2024',
    text: 'Enunciado 1: Quanto é 1 + 1?'
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
fs.writeFileSync(path.resolve(__dirname, '../files/output.docx'), buffer);