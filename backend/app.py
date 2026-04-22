from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
client = MongoClient(MONGO_URI)
db = client["testdb"]
collection = db["users"]

# API route
@app.route('/api', methods=['GET'])
def get_data():
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data)

# Form submission
@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.json
        collection.insert_one(data)
        return jsonify({"message": "Data submitted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)