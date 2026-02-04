from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# --- Configuração ---
# IMPORTANTE: Troque 'sua_senha_aqui' pela senha do seu MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+connector://root:sua_senha_aqui@localhost/flask_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Modelo ---
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    def to_json(self):
        return {"id": self.id, "nome": self.nome, "email": self.email}

# Criar tabelas
with app.app_context():
    db.create_all()

# --- Rotas ---
@app.route('/usuarios', methods=['GET'])
def obter_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([u.to_json() for u in usuarios])

@app.route('/usuarios', methods=['POST'])
def criar_usuario():
    body = request.get_json()
    try:
        novo_usuario = Usuario(nome=body['nome'], email=body['email'])
        db.session.add(novo_usuario)
        db.session.commit()
        return jsonify(novo_usuario.to_json()), 201
    except Exception as e:
        return jsonify({"erro": "Erro ao criar usuário"}), 400

if __name__ == '__main__':
    app.run(debug=True)