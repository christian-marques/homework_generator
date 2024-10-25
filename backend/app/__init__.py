from flask import Flask
from app.api.word.routes import word_bp

def create_app():
    app = Flask(__name__)

    # Registra o blueprint para os endpoints de geração de Word
    app.register_blueprint(word_bp)

    return app