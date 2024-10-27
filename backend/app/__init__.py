from flask import Flask
from flask_cors import CORS
from app.api.word.routes import word_bp

def create_app():
    app = Flask(__name__)

    # Habilitar o CORS para o aplicativo Flask
    CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:8080",
                                             "http://10.242.242.10:8080",
                                             "http://192.168.0.120:8080"]}})

    # Registra o blueprint para os endpoints de geração de Word
    app.register_blueprint(word_bp)

    return app