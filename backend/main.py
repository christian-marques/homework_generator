import os
from app import create_app

app = create_app()

if __name__ == '__main__':
    # Obter a porta a partir da variável de ambiente 'PORT', com fallback para a porta 4000
    port = int(os.environ.get('PORT', 4000))
    app.run(host='0.0.0.0', port=port, debug=True)
