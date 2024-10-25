// Captura o evento de submissão do formulário
document.getElementById('form-exercicio').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const formData = new FormData(this);
    
    // Envia os dados para o backend
    fetch('http://localhost:5000/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.blob(); // Recebe o arquivo como blob
        } else {
            throw new Error('Erro ao gerar o documento.');
        }
    })
    .then(blob => {
        // Cria uma URL temporária para baixar o arquivo gerado
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arquivo_gerado.docx'; // Nome do arquivo para download
        document.body.appendChild(a); // Anexa o link ao corpo
        a.click(); // Simula o clique para baixar o arquivo
        a.remove(); // Remove o link temporário
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar gerar o documento.');
    });
});
