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
    print("\n--- INICIANDO DIAGNÓSTICO DO AMBIENTE ---\n")
    
    # 1. Verificar se existe a pasta venv
    venv_exists = os.path.exists('venv')
    check_step("Pasta venv", venv_exists, "A pasta 'venv' não foi encontrada. Rode: python -m venv venv")

    # 2. Verificar se o venv está ATIVO
    is_venv_active = sys.prefix != sys.base_prefix
    check_step("Venv ativo", is_venv_active, "O ambiente virtual não está ativo. No Windows use: venv\\Scripts\\activate")

    # 3. Verificar se existe o api.py
    api_exists = os.path.exists('api.py')
    check_step("Arquivo api.py", api_exists, "Arquivo 'api.py' não encontrado na pasta raiz.")

    # 4. Verificar bibliotecas instaladas
    libs = ['flask', 'flask_sqlalchemy', 'mysql.connector']
    all_libs_ok = True
    
    for lib in libs:
        # Tenta encontrar o módulo sem importá-lo de fato para não travar
        spec = importlib.util.find_spec(lib)
        if spec is None:
            all_libs_ok = False
            check_step(f"Biblioteca {lib}", False, f"Instale com: pip install {lib if lib != 'mysql.connector' else 'mysql-connector-python'}")
        else:
            check_step(f"Biblioteca {lib}", True, "")

    print("\n--- RESULTADO FINAL ---")
    
    # Validação Geral
    if venv_exists and is_venv_active and api_exists and all_libs_ok:
        print("🚀 Tudo pronto! Iniciando a API...\n")
        try:
            # Executa o api.py e mantém o log no terminal
            subprocess.run(["python", "api.py"], check=True)
        except KeyboardInterrupt:
            print("\nAPI encerrada pelo usuário.")
        except Exception as e:
            print(f"❌ Erro ao rodar a API: {e}")
    else:
        print("⚠️  Corrija os erros acima antes de tentar rodar a API.")

# O erro estava aqui: o que vem dentro do 'if' precisa de recuo (espaço/tab)
if __name__ == "__main__":
    run_diagnostic()