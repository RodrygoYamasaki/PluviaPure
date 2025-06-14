from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
 
app = Flask(__name__)
CORS(app)
 
# Carregar o modelo salvo
modelo = joblib.load('../modelo_treinado.pkl')
 
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  
    try:
        # Criar dataframe para o modelo
        df = pd.DataFrame([data])
 
        # Fazer a predição
        pred = modelo.predict(df)[0]
 
        # Retornar o resultado como JSON
        return jsonify({'Quantidade de água captada em Litros': pred})
 
    except Exception as e:
        return jsonify({'error': str(e)}), 400
 
 
if __name__ == '__main__':
    app.run(debug=True)