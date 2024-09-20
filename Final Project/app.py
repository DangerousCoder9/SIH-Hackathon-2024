from flask import Flask, render_template, request
import joblib
import pandas as pd
import numpy as np

# Load the saved model and transformers
model = joblib.load('linear_regression_model.pkl')
poly = joblib.load('polynomial_features.pkl')
scaler = joblib.load('scaler.pkl')

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', prediction=None)

@app.route('/predict', methods=['POST'])
def predict():
    buyers = int(request.form['buyers'])
    transactions = int(request.form['transactions'])
    input_data = pd.DataFrame({
        'Buyers': [buyers],
        'Transactions': [transactions]
    })
    input_data_poly = poly.transform(input_data)
    input_data_scaled = scaler.transform(input_data_poly)
    prediction_log = model.predict(input_data_scaled)[0]
    prediction = np.expm1(prediction_log)
    return render_template('index.html', prediction=prediction)


if __name__ == '__main__':
    app.run(debug=True)
