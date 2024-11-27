import os
import logging
from app import create_app

# Configuração global do logger
logging.basicConfig(
    level=logging.DEBUG,  # Nível de log desejado (DEBUG, INFO, WARNING, ERROR)
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Formato
)

app = create_app()

if __name__ == '__main__':
    # Obter a porta a partir da variável de ambiente 'PORT', com fallback para a porta 4000
    port = int(os.environ.get('PORT', 4000))
    app.run(host='0.0.0.0', port=port, debug=True)
