document.getElementById('form-exercicio').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Primeiro faz a requisição para gerar o arquivo e obter a URL de download
    fetch('http://localhost:5000/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        console.log(">>> '", data, "'")

        // Extrai o nome e a URL do arquivo do JSON retornado
        const { filename, url } = data;

        // Realiza a segunda requisição para baixar o arquivo
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar gerar o documento.');
    });
});
