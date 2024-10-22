const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
// const toPdf = require('office-to-pdf');

// Dada as informações o template é usado para gerar o output
function generate_file(_template_path, _output_path, _header_info, _message){

    // Carregar o arquivo .docx como um template
    const content = fs.readFileSync(path.resolve(__dirname, _template_path), 'binary');
    
    const zip = new PizZip(content);
    
    const doc = new Docxtemplater(zip);
    
    // Substituir as tags no template por valores dinâmicos
    doc.setData({
        name: _header_info[0],
        year: _header_info[1],
        class: _header_info[2],
        date: _header_info[3],
        text: _message
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