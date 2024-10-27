// Geração do arquivo em word
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

// Preenchimento dos campos de lista suspensa com a requisição no BD
document.addEventListener('DOMContentLoaded', function () {

    // Faz a requisição para o backend para obter os dados
    fetch('http://localhost:5000/data')
        .then(response => {
            return response.json();
        })
        .then(data => {
            const { students, subjects } = data;

            // Preenche a lista de nomes
            const nomeSelect = document.getElementById('nome');
            students.forEach(student => {
                const option = document.createElement('option');
                option.value = student;
                option.textContent = student;
                nomeSelect.appendChild(option);
            });

            // Preenche a lista de disciplinas
            const disciplinaSelect = document.getElementById('disciplina');
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                disciplinaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});