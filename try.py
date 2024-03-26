from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/save_values', methods=['POST'])
def save_values():
    data = request.json
    selected_values = data.get('selectedValues', [])
    
    # Process the selected values (e.g., save them to the database)
    
    return jsonify(message="Values saved successfully")

if __name__ == '__main__':
    app.run(debug=True)
