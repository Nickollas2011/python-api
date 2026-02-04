import os
import sys
import subprocess
import importlib.util

def check_step(name, condition, error_msg):
    if condition:
        print(f"✅ {name}: Sucesso!")
        return True
    else:
        print(f"❌ {name}: Falhou! -> {error_msg}")
        return False

def run_diagnostic():
    print("--- INICIANDO DIAGNÓSTICO DO AMBIENTE ---\n")
    
    # 1. Verificar se existe a pasta venv
    venv_exists = os.path.exists('venv')
    check_step("Pasta venv", venv_exists, "A pasta 'venv' não foi encontrada. Rode: python -m venv venv")

    # 2. Verificar se o venv está ATIVO
    # No Windows, o venv ativo define o sys.prefix diferente do sys.base_prefix
    is_venv_active = sys.prefix != sys.base_prefix
    check_step("Venv ativo", is_venv_active, "O ambiente virtual não está ativo. No Windows use: venv\\Scripts\\activate")

    # 3. Verificar se existe o api.py (ajustado de app.py para api.py conforme seu plano)
    api_exists = os.path.exists('api.py')
    check_step("Arquivo api.py", api_exists, "Arquivo 'api.py' não encontrado na pasta raiz.")

    # 4. Verificar bibliotecas instaladas
    libs = ['flask', 'flask_sqlalchemy', 'mysql.connector']
    all_libs_ok = True
    
    for lib in libs:
        spec = importlib.util.find_spec(lib.replace('.', '_') if '.' in lib else lib)
        if lib == 'mysql.connector': # Caso especial para o nome do import
            try:
                import mysql.connector
            except ImportError:
                all_libs_ok = False
                check_step(f"Biblioteca {lib}", False, f"Instale com: pip install mysql-connector-python")
                continue
        
        if spec is None:
            all_libs_ok = False
            check_step(f"Biblioteca {lib}", False, f"Instale com: pip install {lib}")
        else:
            check_step(f"Biblioteca {lib}", True, "")

    print("\n--- RESULTADO FINAL ---")
    
    # Validação Geral
    if venv_exists and is_venv_active and api_exists and all_libs_ok:
        print("🚀 Tudo pronto! Iniciando a API...\n")
        try:
            # Executa o api.py
            subprocess.run(["python", "api.py"], check=True)
        except KeyboardInterrupt:
            print("\nAPI encerrada pelo usuário.")
    else:
        print("⚠️  Corrija os erros acima antes de tentar rodar a API.")

if __name__ == "__main__":
run_diagnostic()