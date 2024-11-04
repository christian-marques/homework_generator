from flask import Flask
from flask_cors import CORS
from .src.routes import word_bp

def create_app():
    app = Flask(__name__)

    # Habilitar o CORS para permitir o domínio do Vercel
    CORS(app, resources={r"/*": {"origins": ["https://homework-generator-azure.vercel.app"]}})

    # Registra o blueprint para os endpoints de geração de Word
    app.register_blueprint(word_bp)

    return app