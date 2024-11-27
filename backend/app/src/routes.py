from flask import Blueprint, request, jsonify, abort, url_for, send_file
import os
import logging
from .word import generate_file
from .db import students, subjects

TEMPLATE_FILE_NAME = 'template.docx'

# Obtém um logger para este módulo
logger = logging.getLogger(__name__)

word_bp = Blueprint('word', __name__)

@word_bp.route("/submit", methods=['POST'])
def submit():
    logger.info("Recebendo dados do formulário...")

    # Obtém os dados do formulário
    student_name = request.form.get('nome')
    class_name = request.form.get('disciplina')
    theme = request.form.get('tema')
    message = request.form.get('enunciado')

    logger.debug(f"Dados recebidos: Nome={student_name}, Disciplina={class_name}, Tema={theme}")

    # Caminhos dos arquivos
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    template_path = os.path.join(base_dir, 'files', TEMPLATE_FILE_NAME)
    output_path = "/tmp"  # Diretório de saída para arquivos gerados no Render

    logger.debug(f"Caminho do template: {template_path}")
    logger.debug(f"Diretório de saída: {output_path}")

    # Gera o arquivo Word
    try:
        output_filepath, download_name = generate_file(template_path, output_path, [student_name, class_name, theme], message)
        logger.info(f"Arquivo gerado com sucesso: {output_filepath}")
    except FileNotFoundError as e:
        logger.error(f"Erro: Template não encontrado. Caminho: {template_path}")
        return jsonify({"error": "Template não encontrado"}), 500
    except Exception as e:
        logger.error(f"Erro ao gerar o arquivo: {str(e)}")
        return jsonify({"error": "Erro ao gerar o arquivo"}), 500

    # Verifica se o arquivo foi gerado corretamente
    if not os.path.exists(output_filepath):
        logger.warning(f"Arquivo não encontrado: {output_filepath}")
        return jsonify({"error": "Arquivo não encontrado"}), 404

    # Gera uma URL para download
    download_url = url_for('word.download_file', filename=download_name, _external=True)
    logger.info(f"URL de download gerada: {download_url}")

    # Retorna o nome e a URL do arquivo como JSON
    response = {
        "filename": download_name,
        "url": download_url
    }
    logger.debug(f"Resposta enviada ao cliente: {response}")
    return jsonify(response)

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

@word_bp.route('/list_tmp', methods=['GET'])
def list_tmp():
    files = os.listdir('/tmp')
    return jsonify(files)