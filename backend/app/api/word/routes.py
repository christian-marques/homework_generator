from flask import Blueprint, request, send_file
from .services import generate_file
import os

word_bp = Blueprint('word', __name__)

# Rota para processar o envio do formulário e gerar o arquivo Word
@word_bp.route('/submit', methods=['POST'])
def submit():
    # Obtém os dados do formulário
    student_name = request.form.get('nome')
    class_name = request.form.get('disciplina')
    theme = request.form.get('tema')
    message = request.form.get('enunciado')

    # Caminhos dos arquivos
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))  # Volta para backend/
    template_path = os.path.join(base_dir, 'files', 'template.docx')  # backend/files/template.docx
    output_path = os.path.join(base_dir, 'files', 'output')  # backend/files/output

    # Gera o arquivo Word
    output_filepath = generate_file(template_path, output_path, [student_name, class_name, theme], message)

    # Envia o arquivo gerado para download
    return send_file(output_filepath, as_attachment=True)