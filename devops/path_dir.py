import os

def save_directory_structure_to_file(root_dir, files_to_include, output_file, exclude_dirs, include_dirs):
    with open(output_file, "w") as f:
        for root, dirs, files in os.walk(root_dir):
            # Filtra as pastas que devem ser excluídas
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            # Caminha pelas pastas e arquivos relevantes
            relevant_files = [file for file in files if file in files_to_include]
            relevant_dirs = [d for d in dirs if os.path.join(root, d) in include_dirs]
            
            # Exibe a pasta atual se ela tiver arquivos ou pastas relevantes ou estiver na lista include_dirs
            if relevant_files or relevant_dirs or any(os.path.join(root, d) for d in dirs):
                depth = root.replace(root_dir, "").count(os.sep)
                indent = "    " * depth
                f.write(f"{indent}{os.path.basename(root)}/\n")
                
                # Exibe os arquivos relevantes
                for file in relevant_files:
                    f.write(f"{indent}    {file}\n")
                
                # Exibe pastas relevantes mesmo que estejam vazias
                for directory in relevant_dirs:
                    f.write(f"{indent}    {directory}/\n")

        # Inclui pastas vazias ou que não foram listadas durante a caminhada
        for root, dirs, _ in os.walk(root_dir):
            for dir_name in dirs:
                dir_path = os.path.join(root, dir_name)
                if dir_path not in exclude_dirs and dir_path in include_dirs and not os.listdir(dir_path):
                    # Calcula a profundidade para formatar a indentação
                    depth = dir_path.replace(root_dir, "").count(os.sep)
                    indent = "    " * depth
                    f.write(f"{indent}{os.path.basename(dir_path)}/\n")

# Defina o diretório raiz do seu projeto
root_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Defina os arquivos específicos que você deseja mostrar
arquivos_especificos = [
    "__init__.py", "db.py", "routes.py", "word.py", "main.py",
    "requirements.txt", "favicon.ico", "index.html", "app.js", "styles.css", 
    "package.json", "home.js", "login.js", "student_registration.js", "subject_registration.js", "template_registration.js",
    "api_service.js", "template.docx"
]

# Defina as pastas que você deseja excluir
pastas_excluir = ["node_modules", "__pycache__", ".git", "env", "venv"]

# Defina as pastas que você deseja incluir, mesmo que estejam vazias, em qualquer lugar da estrutura
pastas_incluir = [
    os.path.join(root, "db") for root, dirs, _ in os.walk(root_directory) for d in dirs if d == "db"
] + [
    os.path.join(root, "files") for root, dirs, _ in os.walk(root_directory) for d in dirs if d == "files"
]

# Caminho para o arquivo de saída
output_file = os.path.join(os.path.dirname(__file__), "path_dir.txt")

save_directory_structure_to_file(root_directory, arquivos_especificos, output_file, pastas_excluir, pastas_incluir)