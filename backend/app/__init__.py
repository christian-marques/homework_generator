from flask import Flask
from flask_cors import CORS
from .src.routes import word_bp

def create_app():
    app = Flask(__name__)

    # Habilitar o CORS para todas as origens
    CORS(app)  # Permitir todas as origens (para testes no Render)

    # Registra o blueprint para os endpoints de geração de Word
    app.register_blueprint(word_bp)

    return app
