const URL_SERVER = 'https://homework-generator.onrender.com';

// Função para garantir que as URLs estão corretas
const fixUrl = (url) => url.replace(/^http:/, 'https:');

// Geração do arquivo em word
document.getElementById('form-exercicio').addEventListener('submit', function (event) {
    event.preventDefault();

    console.log('Iniciando o envio do formulário.');

    const formData = new FormData(this);

    // Primeiro faz a requisição para gerar o arquivo e obter a URL de download
    fetch(fixUrl(`${URL_SERVER}/submit`), {
        method: 'POST',
        body: formData
    })
        .then(response => {
            console.log('Resposta recebida do backend:', response);
            if (!response.ok) {
                throw new Error(`Erro na geração do arquivo: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos do backend:', data);

            if (data.error) {
                throw new Error(data.error);
            }

            // Realiza a segunda requisição para baixar o arquivo
            return fetch(fixUrl(data.url)).then(response => {
                console.log('Resposta do backend para download:', response);
                if (!response.ok) {
                    throw new Error(`Erro no download do arquivo: ${response.statusText}`);
                }
                return response.blob();
            });
        })
        .then(blob => {
            console.log('Blob do arquivo baixado:', blob);

            // Cria uma URL temporária para o arquivo baixado
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'arquivo_gerado.docx'; // Nome do arquivo para download
            document.body.appendChild(a);
            a.click();
            a.remove();

            console.log('Arquivo baixado com sucesso.');
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao tentar gerar o documento.');
        });
});


// Preenchimento dos campos de lista suspensa com a requisição no BD
document.addEventListener('DOMContentLoaded', function () {

    // Faz a requisição para o backend para obter os dados
    fetch(`${URL_SERVER}/data`)
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