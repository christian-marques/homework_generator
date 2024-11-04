from flask import Flask
from flask_cors import CORS
from .src.routes import word_bp

def create_app():
    app = Flask(__name__)

    # Permitir CORS para o domínio específico do Vercel
    CORS(app, resources={r"/*": {"origins": ["https://homework-generator-azure.vercel.app"]}}, supports_credentials=True)

    # Registra o blueprint para os endpoints
    app.register_blueprint(word_bp)

    return app
