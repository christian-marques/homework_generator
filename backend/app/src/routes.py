from flask import Blueprint, request, jsonify, abort, url_for, send_file
import os
from .word import generate_file
from .db import students, subjects

word_bp = Blueprint('word', __name__)

@word_bp.route("/submit", methods=['POST'])
def submit():
    # Obtém os dados do formulário
    student_name = request.form.get('nome')
    class_name = request.form.get('disciplina')
    theme = request.form.get('tema')
    message = request.form.get('enunciado')

    ################################################################################
    # Caminhos dos arquivos
    ################################################################################
    # --> RENDER
    base_dir = "/tmp"
    # --> LOCAL
    # base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

    template_path = os.path.join(base_dir, 'files', 'template.docx')
    output_path = os.path.join(base_dir, 'files', 'output')
    ################################################################################

    # Gera o arquivo Word
    output_filepath, download_name = generate_file(template_path, output_path, [student_name, class_name, theme], message)

    print(f"Out: '{output_filepath}' | nome {download_name}")

    # Verifica se o arquivo foi gerado corretamente
    if not os.path.exists(output_filepath):
        return jsonify({"error": "Arquivo não encontrado"}), 404

    # Define o nome dinâmico do arquivo e gera uma URL para download
    # download_name = f'{student_name}_{class_name}_{theme}.docx'
    download_url = url_for('word.download_file', filename=download_name, _external=True)

    # Retorna o nome e a URL do arquivo como JSON
    return jsonify({"filename": download_name, "url": download_url})

@word_bp.route("/download/<filename>", methods=['GET'])
def download_file(filename):
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    file_path = os.path.join(base_dir, 'files', 'output', filename)

    # Verifica se o arquivo existe
    if not os.path.exists(file_path):
        return abort(404, description="Arquivo não encontrado")

    return send_file(file_path, as_attachment=True, download_name=filename)

# Endpoint para retornar os dados de alunos e disciplinas
@word_bp.route("/data", methods=['GET'])
def get_data():
    return jsonify({"students": students, "subjects": subjects})